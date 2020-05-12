const RewardService = require('../services/reward.services');
const HTTPStatus = require('http-status-codes');
const rError = require('../util/error');
const rSuccess = require('../util/success');
const strings = require('../util/strings');

const daily = async (req, res) => {
  try {
    const result = await RewardService.daily(req.user);

    if (!result) {
      return rError(res, HTTPStatus.OK, strings.errors.alreadyRewardedToday);
    }

    return rSuccess(res, HTTPStatus.OK, req.user.likeAmount);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const convert = async (req, res) => {
  const aureus = req.params.aureus;

  if (aureus % 10 !== 0) {
    return rError(res, HTTPStatus.BAD_REQUEST, strings.errors.giveTenMultiple);
  }

  try {
    const result = await RewardService.convert(req.user, aureus);

    if (!result) {
      return rError(res, HTTPStatus.BAD_REQUEST, strings.errors.invalidAureusAmount);
    }

    return rSuccess(res, HTTPStatus.OK, result);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  daily,
  convert
};
