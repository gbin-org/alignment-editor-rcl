const errorMessageExtractor = (error: any): string => {
  let errorMessage = String(error);

  if (Object.prototype.hasOwnProperty.call(error, 'message')) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  return errorMessage;
};

export default errorMessageExtractor;
