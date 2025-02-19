'use client';

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return <p style={{ color: 'red' }}>{message}</p>;
};

export default Error;
