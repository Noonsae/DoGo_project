export const isValidPassword = (password: string) => {
  const lengthCheck = password.length >= 8 && password.length <= 32;
  const complexityCheck = /(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*\W)|(?=.*\d)(?=.*\W)/.test(password);
  return lengthCheck && complexityCheck;
};
