'use client';

interface ErrorProps {
  message: string;
}
const Error: React.FC<ErrorProps> = ({ message }) => {
  return <p style={{ color: 'red' }}>{message}</p>;
};

export default Error;
