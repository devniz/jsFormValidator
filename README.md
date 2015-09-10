# jsFormValidator
jsFormValidator is a modern JavaScript Form validator

Validate any HTML form in 3 deadly simple steps:

### 1) Download and add into your index.html jQuery and jsFormValidator:

- original version: [jsFormValidator - original] (https://github.com/Devniz/jsFormValidator/blob/master/src/lib/jsform.js)
- minified version: [jsFormValidator - minified] (https://github.com/Devniz/jsFormValidator/blob/master/src/lib/jsform.min.js)

```
<!-- 
DEMO JsFormValidator.
-->
<!DOCTYPE html>
<html>
<head>
	<title>jsFormValidator Demo</title>
	<meta charset="UTF-8">
	<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	<script src="jsform.js"></script>
</head>
<body>
	<div id="loginSection">
		<input type="text" name="email" placeholder="Email"/>
		<input type="text" name="username" placeholder="Username"/>
		<input type="password" name="password" placeholder="Password">
	</div>
	<script>
		jsFormValidator.App.create().Validator.applyRules('Login');
	</script>
</body>
</html>
```

### 2) Let's say for instance we want to validate a basic login form. Create a 'Login' folder inside models/forms which also will contain rules.json

```
//Structure of your project using jsFormValidator

- myApp
 -- models
   --- forms
      ---- Login
       ----- rules.json
- jquery.min.js
- jsform.min.js
- index.html
```

```
//rules.json file containing a simple JSON object describing your validation rules.

{
	"email": {
		"validEmail":true,
		"required":true
	},

	"username": {
		"minLength":5,
		"maxLength":15
	},

	"password": {
		"validPassword":true,
		"match": "password",
		"required":true
	}
}
```

### 3) Validate your form with one single line of code and check what's happen in your browser console!

```
jsFormValidator.App.create().Validator.applyRules('Login'); //Magic! make sure that the parameter of applyRules(pathToRulesJson), is equal to the folder created into models/forms (Login in that example)
```

That's All Folks!

## Notes
You need to keep the structures of the folder models/forms where the rules.json should be. It doesn't matter how you setup jsForm and where you use it as it is a global object, but the models folder should always be at the root of your application. The JSON file 'rules.json' must be valid in each of your form validation folder (Login or whatever other name) and must keep the same name i.e rules.json.

### Rules

- required: Make sure that the field is provided by the user.
- match: Make sure that the field match exactly another one.
- email: Validate an email address.
- password: Check the strenght of the password.
- minlength: A field is limited to x minimum of characters.
- maxLength: A field is limited to z maximum of characters

### TODO

- Add more validators
- Add testing
