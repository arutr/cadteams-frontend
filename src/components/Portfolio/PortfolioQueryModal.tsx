import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import User from 'src/api/User';
import { PortfolioModal } from 'src/components/Portfolio/index';

export default function PortfolioQueryModal() {
  const {
    pathname,
    push,
    query,
  } = useRouter();
  const [portfolioUser, setPortfolioUser] = useState<User>(null);
  const fetchUser = (id) => (
    Axios
      .get(`/users/individuals/${id}`)
      .then(({ data }) => setPortfolioUser(data))
      .catch(() => {
        alert('An unexpected error has occurred. Please try again later.');
      })
  );
  useEffect(() => {
    const { portfolio } = query;

    if (portfolio && !portfolioUser) {
      fetchUser(portfolio);
    } else if (!portfolio && portfolioUser) {
      setPortfolioUser(null);
    }
  }, [query]);

  if (portfolioUser) {
    return (
      <PortfolioModal
        onClose={() => {
          setPortfolioUser(null);
          const { portfolio, ...newQuery } = query;
          push({ pathname, query: newQuery });
        }}
        user={portfolioUser}
      />
    );
  }

  return null;
}
