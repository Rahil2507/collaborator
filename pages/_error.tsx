import { NextPage, GetServerSideProps } from 'next';
import React from 'react';

interface ErrorPageProps {
  statusCode?: number;
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  let errorMessage = 'An error occurred';

  if (statusCode === 404) {
    errorMessage = 'Page not found';
  } else if (statusCode === 500) {
    errorMessage = 'Internal server error';
  }

  return (
    <div>
      <h1>{errorMessage}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ErrorPageProps> = async ({ res }) => {
  try {
    // Simulate an error condition, e.g., throw new Error('Something went wrong');
    // You can replace this with your error handling logic.
    
    // If no error occurred, set the statusCode to 200 (OK)
    const statusCode = 200;

    return { props: { statusCode } };
  } catch (error) {
    const statusCode = res ? res.statusCode : 404;
    return { props: { statusCode } };
  }
};

export default ErrorPage;
