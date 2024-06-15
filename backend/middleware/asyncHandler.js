// export default function asyncHandler(fn) {
//   (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   }
// }

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;