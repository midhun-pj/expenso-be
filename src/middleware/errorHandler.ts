import { Request, Response, NextFunction } from 'express';

// Custom error handler middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack for debugging

  res.status(500).json({
    success: false,
    message: err.message || 'Server Error',
  });
};

export default errorHandler;
