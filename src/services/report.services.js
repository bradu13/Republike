const ReportModel = require('../db').Report;
const strings = require('../util/strings');

const add = async (report) => {
  try {
    return await ReportModel.create(report);
  } catch (error) {
    throw strings.errors.addReport;
  }
};

const get = async (id) => {
  try {
    return await ReportModel.findOne({ where: { id } });
  } catch (error) {
    throw strings.errors.getReport;
  }
};

const remove = async (req) => {
  const report = req.report;

  try {
    await report.destroy();
  } catch (error) {
    throw strings.errors.deleteReport;
  }
};

module.exports = {
  add,
  get,
  remove
};
