//import schema  from "../validators/auth-validator"

import { Request, Response, NextFunction } from "express";
import { Schema, ZodError } from "zod";

const validate =
  (schema: Schema) =>
  async (req: Request,
         res: Response, 
         next: NextFunction) => {  

    try {
      const parseBody = await schema.parseAsync(req.body);
      const originalReq = req as any;
      originalReq.body = parseBody;
      next();

    } catch (err) {

            if (err instanceof ZodError) {
                const error = {
                status: 422,
                message: "Fill the inputs properly",
                extraDetails: err.issues[0].message,
                };
                next(error);
            } else {
                next(err); // Pass non-validation errors to the default error handler
            }

            
        };
  };

export { validate };
