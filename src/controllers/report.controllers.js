const ReportService = require('../services/report.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const load = async (req, res, next) => {
  try {
    const report = await ReportService.get(req.params.id);

    if (!report) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noReport);
    }

    req.report = report;

    return next();
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const verify = async (req, res, next) => {
  if (req.report.UserId !== req.user.id) {
    return rError(res, HTTPStatus.UNAUTHORIZED, strings.errors.noReportEditPermission);
  }
  next();
};

const add = async (req, res) => {
  const report = req.body;
  report.UserId = req.user.id;

  try {
    const result = await ReportService.add(report);

    return rSuccess(res, HTTPStatus.CREATED, result);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const get = async (req, res) => {
  try {
    return rSuccess(res, HTTPStatus.OK, req.report);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const remove = async (req, res) => {
  try {
    await ReportService.remove(req);

    return rSuccess(res, HTTPStatus.OK, strings.delete.success);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  add,
  load,
  get,
  verify,
  remove
};
