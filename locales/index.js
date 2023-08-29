const { I18n } = require('i18n')
var config = require('./../config');
const path = require('path');

const i18n = new I18n(config.i18n)
module.exports = i18n;