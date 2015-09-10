/**
 * @module Core
 * @version 1.0
 * @author Nizar Bousebsi
 */
var CoreClass = (function() {
	"use strict";

	var green = '#bada55';
	var orange = '#f28f0d';
	var red = '#ff3300';
	var blue = '#19e3d9';
	var pink = '#ff80bf';

	/** @constant modelFormRule */
	var modelFormRule = '../models/forms/';

	/**
	 * @function printer
	 * @summary Print a string inside the browser console.
	 * @access public
	 * @param {string} message Message to display in the console.
	 * @param {string} color Value of an hexa color.
	 * @example myApp.Core.printer("Hello OLOC.io!", myApp.Core.green);
	 */
	var printer = function(message, color) {
		console.log('%c' + message,
					'background: #222; color:' + color);
	};

	/**
	 * @function notif
	 * @summary Alert a message on the screen.
	 * @access public
	 * @param {string} title Title of your message.
	 * @param {string} message Message content to display.
	 * @param {string} type Type of the message (success/error/infos).
	 * @example myApp.Core.alert("Hello OLOC.io!", "Always at the snap of your fingers.", "success");
	 */
	var notif = function(title, message, type) {
		var notificationStatus = ConfigClass.getNotifStatus();
		if(notificationStatus === true) {
			swal(title, message, type);
		}
	};

	/**
	 * @function looper
	 * @summary Loop through an array.
	 * @access public
	 * @param {array} Array to loop through.
	 * @example myApp.Core.looper(array(1,2,3,4,5));
	 */
	var looper = function(array) {
		for (var i = 0; i < array.length; i++) {
			printer(array[i]);
		}
	};

	/**
	 * @function looperJsonObject
	 * @summary Loop through a JSON object
	 * @access public
	 * @param {object} jsonObject Valid JSON Object to loop through.
	 * @example myApp.Core.looperJsonObject(jsonObject);
	 */
	var looperJsonObject = function(jsonObject) {
		for (var key in jsonObject) {
			if (jsonObject.hasOwnProperty(key)) {
				CoreClass.printer(key + " -> " + jsonObject[key], CoreClass.blue);
			}
		}
	};

 	/**
	 * @function looperDeepJsonObject
	 * @summary Loop deeper in a JSON object, fetch the available children nodes.
	 * @access public
	 * @param {object} jsonObject Valid JSON object to parse.
	 * @param {function} func Callback function to process the JSON object
	 * @example myApp.Core.looperDeepJsonObject(jsonObject, myApp.Validation);
	 */
	var looperDeepJsonObject = function(jsonObject, func) {
		for (var i in jsonObject) {
			func.apply(this,[i,jsonObject[i]]);
			if (jsonObject[i] !== null && typeof(jsonObject[i])=="object") {
				looperDeepJsonObject(jsonObject[i], func);
			}
		}
	}

	/**
	 * @function isObject
	 * @summary Check if a given variable is a valid JavaScript object.
	 * @access public
	 * @param {object} message Message to display in the console.
	 * @return {boolean} true or false
	 * @example myApp.Core.isObject(Object);
	 */
	var isObject = function(object) {
		if (typeof object === "object" && !Array.isArray(object) && object !== null) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @function convertJsonObjectToArray
	 * @summary Convert a valid JSON object into an array.
	 * @access public
	 * @param {object} jsonObject Valid JSON object to convert.
	 * @return {array} result
	 * @example myApp.Core.convertJsonObjectToArray(jsonObject);
	 */
	var convertJsonObjectToArray = function(jsonObject) {
		var result = [];

		for (var key in jsonObject) {
			if (jsonObject.hasOwnProperty(key)) {
				result.push(jsonObject[key]);
			}
		}

		return result;
	};

	/**
	 * @function jsonStringToObject
	 * @summary Convert a JSON string into a valid JSON object.
	 * @access public
	 * @param {string} jsonString JSON string containing a JSON litteral..
	 * @return {object}
	 * @example myApp.Core.jsonStringToObject('{"author":"Nizar", "version":"1.0"}"'');
	 */
	var jsonStringToObject = function(jsonString) {
		return JSON.parse(jsonString);
	};

	/**
	 * @function isJsonStringValid
	 * @summary validate a JSON string.
	 * @access public
	 * @param {string} jsonString Describe the valid JSON object in litteral.
	 * @return {boolean} true or false
	 * @example myApp.Core.isJsonStringValid('{"author":"Nizar", "version":"1.0"}"'');
	 */
	var isJsonStringValid = function(jsonString) {
		console.log(jsonString);
		if (/^[\],:{}\s]*$/.test(jsonString.replace(/\\["\\\/bfnrtu]/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
			return true;
		}
		else {
			CoreClass.printer('[Alert] - This JSON string is malformed: ' + jsonString, CoreClass.red);
			return false;
		}
	};

	/**
	 * @function isJsonObjectValid
	 * @summary validate a JSON object.
	 * @access public
	 * @param {object} jsonObject Validate the JSON object.
	 * @return {boolean} true or false
	 * @example myApp.Core.isJsonObjectValid(jsonObject);
	 */
	var isJsonObjectValid = function(jsonObject) {
		try {
			var jsonString = JSON.stringify(jsonObject);
			return true;
		}
		catch (ex) {
			CoreClass.printer('[Alert] - This JSON string is malformed: ' + jsonString, CoreClass.red);
			return false;
		}
	};

	/**
	 * @function getJsonFile
	 * @summary Return the JSON object fetched from the json file.
	 * @access public
	 * @param {string} jsonFilePath JSON file containing a JSON litteral.
	 * @return {object} JSON valid object
	 * @example myApp.Core.getJsonFile('file/rules.json');
	 */
	var getJsonFile = function(jsonFilePath, fn) {
		$.getJSON(jsonFilePath, function(jsonObject) {
			CoreClass.printer('[Status] - JSON loaded: ' + jsonFilePath, CoreClass.green);
			fn.Apply(jsonObject);
		})
		.done(function() {
			//console.log( "second success" );
		})
		.fail(function() {
			CoreClass.printer('[Alert] - Wrong path or invalid JSON file: ' + jsonFilePath, CoreClass.red);
		})
		.always(function() {
			//console.log( "always" );
		});
	};

	return {
		green: green,
		orange: orange,
		red: red,
		blue: blue,
		pink: pink,
		printer: printer,
		notif: notif,
		jsonStringToObject: jsonStringToObject,
		looper: looper,
		looperJsonObject: looperJsonObject,
		looperDeepJsonObject: looperDeepJsonObject,
		isObject: isObject,
		convertJsonObjectToArray: convertJsonObjectToArray,
		isJsonStringValid: isJsonStringValid,
		isJsonObjectValid: isJsonObjectValid,
		getJsonFile: getJsonFile
	};
})();

module.exports = CoreClass;