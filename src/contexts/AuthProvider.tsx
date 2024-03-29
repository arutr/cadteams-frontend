import React from 'react';
import Axios, { Method } from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { isProduction } from 'src/utils/misc';
import { LoginForm, RegistrationForm } from '../api/Auth';
import User from '../api/User';

interface Context {
  isAuthenticated: () => boolean;
  handleSocialLogin: ({ profile, provider, token }) => Promise<void>;
  logIn: (values: LoginForm) => Promise<void>;
  logOut: () => void;
  registerAccount: (values: RegistrationForm) => Promise<void>;
  redirectToApp: () => void;
  storeAuthPayload: (data) => void;
  updateUser: (update: object, method?: Method, endpoint?: string) => Promise<void>;
  user: User;
}

interface AuthPayload {
  jwt: string;
  user: User;
}

Axios.defaults.baseURL = process.env.API_URL;

const AuthContext = React.createContext<Context>(null);
const redirectUrls = ['/sign-up', '/log-in', '/forgot-password', '/reset-password'];

interface State {
  user: User;
}

export default class AuthProvider extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    const token = Cookies.get('token');

    if (token) {
      AuthProvider.setAuthorizationHeader(token);
    }
  }

  componentDidMount() {
    this.getUser();
    this.handleRouteChange(Router.pathname);
    Router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    return () => Router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  static setAuthorizationHeader(token) {
    Axios.defaults.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  getUser = () => {
    const { user } = this.state;
    const token = Cookies.get('token');

    if (token && !user) {
      Axios
        .get('/users/me')
        .then(({ data }) => this.setState({ user: data }))
        .catch(() => {
          if (isProduction) {
            this.logOut();
          }
        });
    }
  };

  updateUser = (update: object, method: Method = 'put', endpoint: string = '/users/me') => (
    Axios(endpoint, { method, data: update }).then(({ data }) => this.setState({ user: data }))
  );

  isAuthenticated = () => !!Cookies.get('token');

  logOut = () => {
    Cookies.remove('token');
    Axios.defaults.headers = {};
    this.setState({
      user: null,
    }, () => Router.push('/'));
  };

  redirectToApp = () => {
    if (this.isAuthenticated()) {
      Router.push('/app/profile');
    } else {
      this.logOut();
    }
  };

  handleRouteChange = (url: string) => {
    if (this.isAuthenticated() && redirectUrls.includes(url)) {
      this.redirectToApp();
    } else if (!this.isAuthenticated() && url.includes('/app')) {
      this.logOut();
    }
  };

  storeAuthPayload = (data: AuthPayload) => {
    Cookies.set('token', data.jwt, {
      expires: 1,
      secure: true,
      sameSite: 'strict',
    });
    this.setState({
      user: data.user,
    }, () => AuthProvider.setAuthorizationHeader(data.jwt));
  };

  logIn = (values: LoginForm) => (
    Axios
      .post('/auth/local', {
        identifier: values.email,
        password: values.password,
      })
      .then(({ data }) => this.storeAuthPayload(data))
  );

  registerAccount = (values: RegistrationForm) => (
    Axios
      .post('/auth/local/register', {
        email: values.email,
        newsletter: values.newsletter,
        password: values.password,
        type: values.type,
        username: values.username,
      })
      .then(({ data }) => this.storeAuthPayload(data))
  );

  handleSocialLogin = ({ profile, provider, token }) => (
    Axios
      .get(`/auth/${provider}/callback`, {
        params: {
          access_token: token.accessToken,
          email: profile.email,
        },
      })
      .then(({ data }) => this.storeAuthPayload(data))
  );

  render() {
    const { user } = this.state;

    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: this.isAuthenticated,
          handleSocialLogin: this.handleSocialLogin,
          logIn: this.logIn,
          logOut: this.logOut,
          registerAccount: this.registerAccount,
          redirectToApp: this.redirectToApp,
          storeAuthPayload: this.storeAuthPayload,
          updateUser: this.updateUser,
          user,
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
