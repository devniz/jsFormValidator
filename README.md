# jsFormValidator
jsFormValidator is a modern JavaScript Form validator

Validate any HTML form in 3 deadly simple steps:

### 1) Download and add into your index.html jQuery and jsFormValidator:

- original version: [jsFormValidator - original] (https://github.com/Devniz/jsFormValidator/blob/master/src/lib/jsform.js)
- minified version: [jsFormValidator - minified] (https://github.com/Devniz/jsFormValidator/blob/master/src/lib/jsform.min.js)

```
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="jsform.js"></script>
```

### 2) Let's say for instance we want to validate a basic login form. Create a 'Login' folder inside models/forms which also will contain rules.json.

```
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
jsFormValidator.App.create().Validator.applyRules('Login');
```

That's All Folks!

## Notes
You need to keep the structures of the folder models/forms where the rules.json should be. It doesn't matter how you setup jsForm but the models folder should always be at the root of your application.

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
