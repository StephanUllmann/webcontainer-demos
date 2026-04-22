export const sendResponse = (res: any, statusCode: number, data: any, message: string = 'Success') => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
  });
};

export const sendError = (res: any, statusCode: number, message: string, errors: any = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
