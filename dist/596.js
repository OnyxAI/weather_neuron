(window["webpackJsonpweather"] = window["webpackJsonpweather"] || []).push([[596],{

/***/ 2596:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * i18n.js
 */
var enTranslationMessages = __webpack_require__(2036);

var frTranslationMessages = __webpack_require__(4344);

var DEFAULT_LOCALE = 'en'; // prettier-ignore

var appLocales = ['en', 'fr'];

var formatTranslationMessages = function formatTranslationMessages(locale, messages) {
  var defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {};

  var flattenFormattedMessages = function flattenFormattedMessages(formattedMessages, key) {
    var formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
    return Object.assign(formattedMessages, _defineProperty({}, key, formattedMessage));
  };

  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

var translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages)
};
exports.appLocales = appLocales;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;

/***/ }),

/***/ 2036:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"app.containers.Weather.header\":\"Weather\"}");

/***/ }),

/***/ 4344:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"app.containers.Weather.header\":\"\"}");

/***/ })

}]);