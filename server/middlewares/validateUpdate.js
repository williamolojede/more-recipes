import isObjectEmpty from '../helpers/isObjectEmpty';

const validateUpdate = (req, res, next) => {
  const { update } = req.body;

  if (!update || isObjectEmpty(update) === true) {
    const err = new Error('Update property required or can not be empty');
    err.statusCode = 400;
    return next(err);
  }
  return next();
};

export default validateUpdate;
