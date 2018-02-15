'use strict'; // eslint-disable-line strict

var utils = require('./utils');
var _utils$common = utils.common,
    validate = _utils$common.validate,
    iso8601ToRippleTime = _utils$common.iso8601ToRippleTime,
    xrpToDrops = _utils$common.xrpToDrops;


function createPaymentChannelCreateTransaction(account, paymentChannel) {
  var txJSON = {
    Account: account,
    TransactionType: 'PaymentChannelCreate',
    Amount: xrpToDrops(paymentChannel.amount),
    Destination: paymentChannel.destination,
    SettleDelay: paymentChannel.settleDelay,
    PublicKey: paymentChannel.publicKey.toUpperCase()
  };

  if (paymentChannel.cancelAfter !== undefined) {
    txJSON.CancelAfter = iso8601ToRippleTime(paymentChannel.cancelAfter);
  }
  if (paymentChannel.sourceTag !== undefined) {
    txJSON.SourceTag = paymentChannel.sourceTag;
  }
  if (paymentChannel.destinationTag !== undefined) {
    txJSON.DestinationTag = paymentChannel.destinationTag;
  }

  return txJSON;
}

function preparePaymentChannelCreate(address, paymentChannelCreate) {
  var instructions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  validate.preparePaymentChannelCreate({ address: address, paymentChannelCreate: paymentChannelCreate, instructions: instructions });
  var txJSON = createPaymentChannelCreateTransaction(address, paymentChannelCreate);
  return utils.prepareTransaction(txJSON, this, instructions);
}

module.exports = preparePaymentChannelCreate;