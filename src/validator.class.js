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