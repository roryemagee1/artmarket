import { isValidObjectId } from 'mongoose'

export default function checkObjectId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid ObjectId: ${req.params.id}`);
  }
  next();
}