'use strict'; // eslint-disable-line strict

var _ = require('lodash');
var utils = require('./utils');
var _utils$common = utils.common,
    validate = _utils$common.validate,
    iso8601ToRippleTime = _utils$common.iso8601ToRippleTime,
    xrpToDrops = _utils$common.xrpToDrops;

var ValidationError = utils.common.errors.ValidationError;


function createEscrowCreationTransaction(account, payment) {
  var txJSON = {
    TransactionType: 'EscrowCreate',
    Account: account,
    Destination: payment.destination,
    Amount: xrpToDrops(payment.amount)
  };

  if (payment.condition !== undefined) {
    txJSON.Condition = payment.condition;
  }
  if (payment.allowCancelAfter !== undefined) {
    txJSON.CancelAfter = iso8601ToRippleTime(payment.allowCancelAfter);
  }
  if (payment.allowExecuteAfter !== undefined) {
    txJSON.FinishAfter = iso8601ToRippleTime(payment.allowExecuteAfter);
  }
  if (payment.sourceTag !== undefined) {
    txJSON.SourceTag = payment.sourceTag;
  }
  if (payment.destinationTag !== undefined) {
    txJSON.DestinationTag = payment.destinationTag;
  }
  if (payment.memos !== undefined) {
    txJSON.Memos = _.map(payment.memos, utils.convertMemo);
  }
  if (Boolean(payment.allowCancelAfter) && Boolean(payment.allowExecuteAfter) && txJSON.CancelAfter <= txJSON.FinishAfter) {
    throw new ValidationError('"CancelAfter" must be after "FinishAfter" for' + ' EscrowCreate');
  }
  return txJSON;
}

function prepareEscrowCreation(address, escrowCreation) {
  var instructions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  validate.prepareEscrowCreation({ address: address, escrowCreation: escrowCreation, instructions: instructions });
  var txJSON = createEscrowCreationTransaction(address, escrowCreation);
  return utils.prepareTransaction(txJSON, this, instructions);
}

module.exports = prepareEscrowCreation;