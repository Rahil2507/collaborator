import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

interface ErrorPageProps {
  statusCode?: number;
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  const router = useRouter();
  let errorMessage = 'An error occurred';

  if (statusCode === 404) {
    errorMessage = 'Page not found';
  } else if (statusCode === 500) {
    errorMessage = 'Internal server error';
  }

  const handleRefresh = () => {
    router.push("/")
  };

  return (
    <div>
      <h1>{errorMessage}</h1>
      <div>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ErrorPageProps> = async ({ res }) => {
  try {
    const statusCode = 200;

    return { props: { statusCode } };
  } catch (error) {
    const statusCode = res ? res.statusCode : 404;
    return { props: { statusCode } };
  }
};

export default ErrorPage;
