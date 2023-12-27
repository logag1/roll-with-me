import { Request, Response, NextFunction, RequestHandler } from 'express';

export function asyncHandler(requestHandler: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (e) {
      console.log(e)
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}