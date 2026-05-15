import type { Request, Response, NextFunction } from "express";

export const validateParamId =
  (paramName: string) => (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(String(req.params[paramName]));
    if (isNaN(id)) {
      res.status(400).json({ message: `${paramName} måste vara ett nummer.` });
      return;
    }
    next();
  };
