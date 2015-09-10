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