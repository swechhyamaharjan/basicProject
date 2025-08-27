import {z} from "zod";

const validateHandler = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body) //clean data
    next();
  } catch (err) {
    err = z.flattenError(err);
    res.status(400).send({errror: err.fieldErrors});
  }
}
export default validateHandler;