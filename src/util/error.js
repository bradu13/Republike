module.exports = (res, status, error) => {
  console.log(error);
  return res.status(status).send(
    {
      status: 0,
      error: error
    }
  );
};
