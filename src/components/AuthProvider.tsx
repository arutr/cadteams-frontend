import React from 'react';
import Axios from 'axios';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import store from 'store2';
import { LoginForm, RegistrationForm } from '../api/Auth';
import User from '../api/User';

interface Context {
  isAuthenticated: () => boolean;
  handleSocialLogin: ({ profile, provider, token }, setErrorMessage) => Promise<void>;
  logIn: (values: LoginForm) => Promise<void>;
  logOut: () => Promise<boolean>;
  registerAccount: (values: RegistrationForm) => Promise<void>;
  redirectToApp: () => Promise<boolean>;
}

interface AuthPayload {
  jwt: string;
  user: User;
}

const axios = Axios.create({ baseURL: process.env.API_URL });
const AuthContext = React.createContext<Context>(null);
const redirectUrls = ['/sign-up', '/log-in'];

export default class AuthProvider extends React.Component {
  static isAuthenticated() {
    return !!parseCookies().token;
  }

  static logOut() {
    destroyCookie(null, 'token');
    store.remove('user');
    return Router.push('/');
  }

  static storeAuthPayload(data: AuthPayload) {
    setCookie(null, 'token', data.jwt, {
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
      sameSite: true,
    });
    store.set('user', data.user);
  }

  static redirectToApp() {
    if (AuthProvider.isAuthenticated()) {
      return Router.push('/app');
    }

    return AuthProvider.logOut();
  }

  static handleRouteChange(url: string) {
    if (AuthProvider.isAuthenticated() && redirectUrls.includes(url)) {
      AuthProvider.redirectToApp();
    } else if (!AuthProvider.isAuthenticated() && url.includes('/app')) {
      AuthProvider.logOut();
    }
  }

  static handleSocialLogin({ profile, provider, token }, setErrorMessage) {
    return axios.get(`/auth/${provider}/callback`, {
      params: {
        access_token: token.accessToken,
        email: profile.email,
      },
    })
      .then(({ data }) => {
        AuthProvider.storeAuthPayload(data);
        AuthProvider.redirectToApp();
      })
      .catch(({ response }) => {
        let message = response?.data?.message[0]?.messages[0]?.message;

        if (!message) {
          message = `Unknown error has occurred. Please try again. If the problem persists, please
          get in touch with us.`;
          console.error(response);
        }

        setErrorMessage(message);
      });
  }

  static logIn(values: LoginForm) {
    return axios.post('/auth/local', {
      identifier: values.email,
      password: values.password,
    }).then(({ data }) => AuthProvider.storeAuthPayload(data));
  }

  static async registerAccount(values: RegistrationForm) {
    return axios.post('/auth/local/register', {
      username: values.username,
      email: values.email,
      password: values.password,
      role: values.type,
      newsletter: values.newsletter,
    }).then(({ data }) => AuthProvider.storeAuthPayload(data));
  }

  componentDidMount() {
    AuthProvider.handleRouteChange(Router.pathname);
    Router.events.on('routeChangeStart', AuthProvider.handleRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', AuthProvider.handleRouteChange);
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: AuthProvider.isAuthenticated,
          handleSocialLogin: AuthProvider.handleSocialLogin,
          logIn: AuthProvider.logIn,
          logOut: AuthProvider.logOut,
          registerAccount: AuthProvider.registerAccount,
          redirectToApp: AuthProvider.redirectToApp,
        }}
        {...this.props}
      />
    );
  }
}

export function useAuth() {
  const context = React.useContext<Context>(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
