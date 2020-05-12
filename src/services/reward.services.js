const strings = require('../util/strings');

const daily = async (user) => {
  try {
    const actualDate = new Date();

    if (user.lastReward && user.lastReward.toDateString() === actualDate.toDateString()) {
      return false;
    }

    user.lastReward = actualDate;
    user.likeAmount += 100;

    await user.save();

    return true;
  } catch (error) {
    console.log(error);
    throw strings.errors.dailyReward;
  }
};

const convert = async (user, aureus) => {
  try {
    if (user.aureusAmount < aureus) {
      return false;
    }

    user.aureusAmount -= aureus;
    user.likeAmount += (aureus / 10);

    await user.save();
    return {
      likes: user.likeAmount,
      aureus: user.aureusAmount
    };
  } catch (error) {
    throw strings.errors.convert;
  }
};

module.exports = {
  daily,
  convert
};
