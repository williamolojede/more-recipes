// handles system error gotten from sequelize catch blocks

const systemErrorHandler = (error, callback) => {
  const err = new Error(error.msg);
  err.status = error.code || 500;
  return callback(err);
};

export default systemErrorHandler;
