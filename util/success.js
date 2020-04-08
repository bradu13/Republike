module.exports = (res, status, data) => {
    return res.status(status).send(
        {
            status: 1,
            data: data
        }
    )
};
