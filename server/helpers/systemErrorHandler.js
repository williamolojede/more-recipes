// handles system error gotten from sequelize catch blocks

const systemErrorHandler = (error, callback) => {
  const err = new Error(error.msg || 'internal server error');
  err.statusCode = error.code || 500;
  return callback(err);
};

export default systemErrorHandler;
