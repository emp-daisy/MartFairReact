import { TOKEN_KEY } from './constant';

export default (error) => {
  let errorMessage = 'Something went wrong!';
  const { response } = error;
  if (response) {
    errorMessage = response.data.error.message;
    if (response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }
  }
  return errorMessage;
};
