/**
 * @module Form
 * @version 1.0
 * @author Nizar Bousebsi
 */

var FormClass= (function() {
	"use strict";

	var Core = CoreClass;
	var Events = EventClass;

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