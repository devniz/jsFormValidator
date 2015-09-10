/**
 * @module Event
 * @version 1.0
 * @author Nizar Bousebsi
 */

var EventClass = (function() {
	"use strict";

	/**
	 * @function addButtonClick
	 * @summary Assign a click event to any button.
	 * @access public
	 * @event addButtonClick
	 * @fires Event#action
	 * @param {string} target DIV id/name of the button.
	 * @param {function} action Function to call when the click is fired
	 * @example myApp.Event.addButtonClick("#send", myApp.Validation);
	 */
	var addButtonClick = function(target, action) {
		var buttonName = FormClass.getAnyAttribute(target, 'name');
		var buttonElement = $('input[name^=' + buttonName + ']');
		buttonElement.click(function() {
			CoreClass.printer('[Event] - Action ' + action + ' triggered.', CoreClass.blue);
		});
	};

	/**
	 * @function addOnChange
	 * @summary Assign an OnChange event for any input field.
	 * @access public
	 * @event addOnChange
	 * @fires Event#action
	 * @param {string} target DIV id/name of the input field.
	 * @param {function} action Function to call when the onchange event occur
	 * @example myApp.Event.addOnChange"#username", myApp.Storage);
	 */
	var addOnChange = function(target, action) {
		var elementName = FormClass.getAnyAttribute(target, 'name');
		var element = 'input[name=' + elementName + ']';
		$(element).on('keyup change', function () {
			console.log(action);
		});
	};

	/**
	 * @function addOnFocus
	 * @summary Assign the OnFocus event for any input field.
	 * @access public
	 * @event addOnFocus
	 * @fires Event#action
	 * @param {string} id DIV id of the input field.
	 * @param {function} action Function to call when the onfocus occur
	 * @example myApp.Event.addOnFocus("#password", myApp.Validation);
	 */
	var addOnFocus = function(id, action) {
	};

	return {
		addButtonClick: addButtonClick,
		addOnChange: addOnChange,
		addOnFocus: addOnFocus
	};
})();

module.exports = EventClass;