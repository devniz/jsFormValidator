(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
/**
 * @module Form
 * @version 1.0
 * @author Nizar Bousebsi
 */

var FormClass= (function() {
	"use strict";

	var Core = CoreClass;

	var addTextInput = function(target, name, placeholder) {
		var textElement = '<div id="oloc-text-' + name + '"><input type="' + 'text" name="' + name + '" placeholder="' + placeholder + '"/></div>';
		$('#' + target).append(textElement);
		return textElement;
	};

	var addEmailInput = function(target, name, placeholder) {
		var emailElement = '<div id="oloc-email"><input type="' + 'email" name="' + name + '" placeholder="' + placeholder + '"/></div>';
		$('#' + target).append(emailElement);
		return emailElement;
	};

	var addPasswordInput = function(target, name, placeholder) {
		var passwordElement = '<div id="oloc-password-"' + name +  '><input type="' + 'password" name="' + name + '" placeholder="' + placeholder + '"/></div>';
		$('#' + target).append(passwordElement);
		return passwordElement;
	};

	var addConfirmInput = function(name, type, placeholder) {

	};

	var addTextarea = function(target, name, row, cols, content) {
		var textareaElement = '<div id="oloc-textarea-' + name + '"><textarea rows="' + row + '" cols="' + cols + '">' + content + '</textarea></div>';
		$('#' + target).append(textareaElement);
		return textareaElement;
	};

	var addCheckbox = function(target, name, value, content) {
		var checkboxElement = '<div id="oloc-checkbox-' + name + '"><input type="checkbox" name="' + name + '" value="'+ value + '">'+ content + '</div>';
		$('#' + target).append(checkboxElement);
		return checkboxElement;
	};

	var addRadioButton = function(target, name, value, content) {
		var radioElement = '<div id="oloc-radio-' + name + '"><input type="radio" name="' + name + '" value="' + value + '" checked>' + content + '</div>';
		$('#' + target).append(radioElement);
		return radioElement;
	};

	var addList = function(target, name, items, multiple) {
		var finalList = [];
		var list = CoreClass.jsonStringToObject(items);
		for (var key in list) {
			if (list.hasOwnProperty(key)) {
				var listArray = list[key];
				for (var i = 0; i < listArray.length; i++) {
					finalList += '<option value="' + listArray[i] + '"">' +listArray[i] +'</option>';
				}
			}
		}
		if(multiple === true) {
			var selectorElement = '<div id="oloc-selector-' + name + '"><select multiple>' + finalList+ '</select></div>';
		} else {
			var selectorElement = '<div id="oloc-selector-' + name + '"><select>' + finalList+ '</select></div>';
		}

		$('#' + target).append(selectorElement);
		return selectorElement;
	};

	var addSlider = function(target) {
		 $( "#slider" ).slider();
	};

	var addDropDownMenu = function(list) {

	};

	var addButton = function(target, name, value) {
		var buttonElement = '<div id="oloc-button-"' + name + '"><input type="' + 'button" name="' + name + '" value="' + value + '"/></div>';
		$('#' + target).append(buttonElement);
		return buttonElement;
	};

	var addResetButton = function(value) {
		var resetButtonElement = '<div id="oloc-reset-"' + name + '"><input type="' + 'button" name="' + name + '" value="' + value + '"/></div>';
		$('#' + target).append(resetButtonElement);
		return resetButtonElement;
	};

	var getFormElementById = function(id) {
		return $(id);
	};

	var getFormElementByName = function(name) {
		return $('input[name=' + name + ']');
	};

	var getFormElementByClass = function(cClass) {
		return $('input[name=' + cClass+ ']');

	};

	var getFormElementValueById = function(id) {
		return $('#' + id).val();
	};

	var getValueByName = function(name) {
		return $('input[name=' + name + ']').val();
	};

	var getFormElementValueByClass = function(cClass) {
		return $('input[name=' + cClass + ']').val();
	};

	var getAnyAttribute = function(target, attr) {
		var HtmlElement = $.parseHTML(target);
		var children = $(HtmlElement).children();
		return $(children).attr(attr);
	};

	var getFormElementAttributeName = function(target) {
		return $('input[name=' + target + ']').attr('name');
	};

	var getFormElementAttributeClass = function(target) {
		return $(target).attr('class');
	};

	return {
		addTextInput: addTextInput,
		addEmailInput: addEmailInput,
		addPasswordInput: addPasswordInput,
		addConfirmInput: addConfirmInput,
		addTextarea: addTextarea,
		addCheckbox: addCheckbox,
		addRadioButton: addRadioButton,
		addList: addList,
		addSlider: addSlider,
		addDropDownMenu : addDropDownMenu,
		addButton: addButton,
		addResetButton: addResetButton,
		getFormElementById: getFormElementById,
		getFormElementByName: getFormElementByName,
		getFormElementByClass : getFormElementByClass ,
		getFormElementValueById: getFormElementValueById,
		getValueByName: getValueByName,
		getFormElementValueByClass : getFormElementValueByClass,
		getAnyAttribute : getAnyAttribute,
		getFormElementAttributeName: getFormElementAttributeName,
		getFormElementAttributeClass : getFormElementAttributeClass
	};
})();

module.exports = FormClass;
},{}],3:[function(require,module,exports){
/**
 * @module jsFormValidator
 * @version 1.0
 * @author Nizar Bousebsi
 */

var jsForm = jsForm|| {};
var jsForm = {
	App: {
		/**
	 	 * @function create
	 	 * @summary This is the first function call to instantiate the OLOC.io app. Call it only once in the all application.
	 	 * @access public
	 	 * @return {object} OLOC.io Return and give access to all OLOC.io modules.
	 	 * @example var myApp = Oloc.App.appear(); //All the framework features are now accessible from myApp!;
	 	 */
		create: function() {
			if (jsFormValidator) {
				CoreClass.printer('You are using jsFormValidator!', CoreClass.green);
			}			

			return {
				Core       : CoreClass,
				Forms      : FormClass,
				Validator  : ValidatorClass
			};
		}
	},

}
module.exports = jsForm;
},{}],4:[function(require,module,exports){
jsFormValidator = require('../../src/jsFormValidator.class.js');
CoreClass 	   	= require('../../src/core.class.js');
FormClass	   	= require('../../src/form.class.js');
ValidatorClass	= require('../../src/validator.class.js');
},{"../../src/core.class.js":1,"../../src/form.class.js":2,"../../src/jsFormValidator.class.js":3,"../../src/validator.class.js":5}],5:[function(require,module,exports){
/**
 * @module Validator
 * @version 1.0
 * @author Nizar Bousebsi
 */

var ValidatorClass= (function() {
	"use strict";

	var ruleRoot = 'http://localhost:8888/jsFormValidator/models/forms/';

	var required = function(fieldName) {
		var fieldValue = FormClass.getValueByName(fieldName);

		if (!fieldValue) {
			CoreClass.printer('[Validation] - The field (' + fieldName + ') is required', CoreClass.red);
			return false;
		} else {
			CoreClass.printer('[Validation] - (' + fieldName + ') is OK for the rule required', CoreClass.green);
			return true;
		}
	};

	/**
	 * @function emailInput
	 * @summary validate a given email address.
	 * @access public
	 * @param {string} email Address email to validate.
	 * @return {boolean} true|false
	 * @example myApp.Validation.emailInput("nizar@oloc.io");
	 * @tutorial oloc-validate-email
	 */
	var email = function(email) {
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    
    	if (email) {
    		if (pattern.test(email) == true) {
    			CoreClass.printer('[Validation] - (' + email + ') is a valid email address', CoreClass.green);
    			return true;
    		} else {
    			CoreClass.printer('[Validation] - (' + email + ') is an invalid email address', CoreClass.red);
    			return false;
    		}
    	}
    };

	var password = function(password) {
		var strength = 0;
		if (password.length < 6) {
			CoreClass.printer('[Validation] - Password is too short', CoreClass.red);
			return 'Too short';
		}
		if (password.length > 7) strength += 1;
		if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1;
		if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1;
		if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1;
		if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
		if (strength < 2) {
			CoreClass.printer('[Validation] - Password is weak', CoreClass.red);
			return 'Weak';
		} else if (strength == 2 ) {
			CoreClass.printer('[Validation] - Password is too average', CoreClass.orange);
		} else {
			CoreClass.printer('[Validation] - Password is strong', CoreClass.green);
		}
	};

	var minLength = function(input, min) {
		var size = input.length;
		if (size < min) {
			CoreClass.printer('[Validation] - (' + input + ') need minimum ' + min + ' characters', CoreClass.red);
		} else {
			CoreClass.printer('[Validation] - (' + input + ') is OK for the rule minLength', CoreClass.green);
		}
	};

	var maxLength = function(input, min) {
		var size = input.length;
		if (size > min) {
			CoreClass.printer('[Validation] - (' + input + ') need maximum ' + min + ' characters', CoreClass.red);
		} else {
			CoreClass.printer('[Validation] - (' + input + ') is OK for the rule maxLength', CoreClass.green);
		}
	}

	var applyRules = function(ruleFolder) {
		if(ruleFolder) {
			var rulePath = ruleRoot + ruleFolder + '/rules.json';
			CoreClass.getJsonFile(rulePath, ValidatorClass);
		}
		else{
			CoreClass.printer('[Validation] - Missing or not specified rules for: ' + ruleRoot, CoreClass.orange);
			return false;
		}
	};

	var proceedRules = function(key, value) {
		if (value !== null && typeof(value) == "object") {
			var domElement = key;
			for (var key in value) {
				if (value.hasOwnProperty(key)) {
					ValidatorClass.mapRules(domElement, key, value);
				}
			}
		}
	};

	var mapRules = function(domElement, rule, value) {
		var element = 'input[name=' + domElement + ']';
		switch(rule) {
			//REQUIRED
			case 'required':
			$(element).on('keyup change', function() {
				ValidatorClass.required(domElement);
			});
			break;
			//VALID EMAIL
			case 'validEmail':
			$(element).on('keyup change', function() {
				ValidatorClass.email($(element).val());
			});
			break;
			//STRONG PASSWORD
			case 'validPassword':
			$(element).on('keyup change', function() {
				ValidatorClass.password($(element).val());
			});
			break;
			//MINLENGTH
			case 'minLength':
			$(element).on('keyup change', function() {
				ValidatorClass.minLength($(element).val(), value[rule]);
			});
			break;
			//MAXLENGHT
			case 'maxLength':
			$(element).on('keyup change', function() {
				ValidatorClass.maxLength($(element).val(), value[rule]);
			});
		}
	}

	var Apply = function(jsonRuleObject) {
		if(jsonRuleObject) {
			CoreClass.looperDeepJsonObject(jsonRuleObject, ValidatorClass.proceedRules);
		}
	};

	return {
		required: required,
		email: email,
		password: password,
		minLength: minLength,
		maxLength: maxLength,
		applyRules: applyRules,
		proceedRules: proceedRules,
		mapRules: mapRules,
		Apply: Apply,
	};
})();

module.exports = ValidatorClass;
},{}]},{},[4]);
