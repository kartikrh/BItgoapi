'use strict'; // eslint-disable-line strict

var utils = require('./utils');
var _utils$common = utils.common,
    validate = _utils$common.validate,
    iso8601ToRippleTime = _utils$common.iso8601ToRippleTime,
    xrpToDrops = _utils$common.xrpToDrops;


function createPaymentChannelFundTransaction(account, fund) {
  var txJSON = {
    Account: account,
    TransactionType: 'PaymentChannelFund',
    Channel: fund.channel,
    Amount: xrpToDrops(fund.amount)
  };

  if (fund.expiration !== undefined) {
    txJSON.Expiration = iso8601ToRippleTime(fund.expiration);
  }

  return txJSON;
}

function preparePaymentChannelFund(address, paymentChannelFund) {
  var instructions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  validate.preparePaymentChannelFund({ address: address, paymentChannelFund: paymentChannelFund, instructions: instructions });
  var txJSON = createPaymentChannelFundTransaction(address, paymentChannelFund);
  return utils.prepareTransaction(txJSON, this, instructions);
}

module.exports = preparePaymentChannelFund;