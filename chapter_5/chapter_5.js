// create a single object for your application

// make sure that the namespace doesn't already exist
var MYAPP = MYAPP || {};

MYAPP.namespace = function (ns_string) {
	var parts = ns_string.split('.'),
		parent = MYAPP;

	// strip redundant leading globals
	if (parts[0] === "MYAPP") {
		parts = parts.slice(1);
	}

	for (var i = 0, l = parts.length; i < l; i ++) {
		// create a property that doesn't exist
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}

		parent = parent[parts[i]];
	}

	return parent;
};


// constructors
MYAPP.Parent = function () {};
MYAPP.child = function () {};

// a variable
MYAPP.some_var = 1;

// an object container
MYAPP.modules = {};

// nested objects
MYAPP.modules.module1 = {};
MYAPP.modules.module1.data = {a: 1, b: 2};
MYAPP.modules.module2 = {};

var module3 = MYAPP.namespace('MYAPP.modules.module3');
// module3 === MYAPP.modules.module3 --> true

// skip initial MYAPP
MYAPP.namespace('modules.module51');

MYAPP.namespace('once.upon.a.time.there.was.this.long.nested.property');

// minified test
function test1() {
	var modules = MYAPP.modules;
	alert(modules.module1);
	alert(modules.module2);
	alert(modules.module3);
}

// private members
function Gadget() {
	// private member
	var name = 'iPod';
	// privileged method becuse it has access to private property name
	this.getName = function () {
		return name;
	};
}

var toy = new Gadget();

// privacy failures
function Gadget() {
	// private member
	var specs = {
		screen_width: 320,
		screen_height: 480,
		color: "white"
	};

	// public function
	this.getSpecs = function () {
		return specs;
	};
}

var toy = new Gadget(),
	specs = toy.getSpecs();

specs.color = "black";
specs.price = "free";

console.log(toy.getSpecs());
// to combat the above problem, you may not even need getSpecs
// instead, you must implement POLA (Principle of Least Authority)
// if you need dimensions, you could create a getDimensions()

var myObj;
(function () {
	// private members
	var name = "my, oh my";

	// implements the public part
	// note --no `var`
	myObj = {
		getName: function () {
			return name;
		}
	};
}());

// same idea, different implementation
// also known as the module pattern
myObj = (function () {
	// private members
	var name = "my, oh my";

	// implements the public part
	return {
		getName: function () {
			return name;
		}
	};
}());

// prototypes and privacy
function Gadget2() {
	var name = 'iPod';

	this.getName = function () {
		return name;
	};
}

Gadget.prototype = (function () {
	var browser = 'Mobile Webkit';
	return {
		getBrowser: function () {
			return browser;
		}
	};
}());

var myarray;

(function () {
	var astr = "[object Array]",
		toString = Object.prototype.toString;

	function isArray(a) {
		return toString.call(a) === astr;
	}

	function indexOf(haystack, needle) {
		for (var i = 0, l = haystack.length; i < l; i ++) {
			if (haystack[i] === needle) {
				return i;
			}
		}
		return -1;
	}

	myarray = {
		isArray: isArray,
		indexOf: indexOf,
		inArray: indexOf
	};
}());

// this pattern allows us to have the same private methods while
// maintaining the original private methods if they are overwritten
// myarray.inArray(["2", "4"], "4");

// Module Pattern
MYAPP.namespace('MYAPP.utilities.array');

MYAPP.utilities.array = (function () {
	// depedencies
	var uobj = MYAPP.utilities.object,
		ulang = MYAPP.utilities.lang,

		// private properties
		array_string = "[Object Array]",
		ops = Object.prototype.toString;

		// private methods
		// ...
		//
		// end var

	// optionally one-time init procedures
	//

	// public API
	return {
		inArray: function(needle, haystack) {
			for (var i = 0, l = haystack.length; i < l; i ++) {
				if (haystack[i] === needle) {
					return true;
				}
			}
		},
		isArray: function(a) {
			return ops.call(a) === array_string;
		}

		// more methods and properties
	};
}());

// this reveals the module pattern by returning the object below
MYAPP.utilities.array = (function() {
	// private properties
	var array_string = "[Object Array]",
		ops = Object.prototype.toString,

	// private methods
	inArray = function (haystack, needle) {
		for (var i = 0, l = haystack.length; i < l; i ++) {
			if (haystack[i] === needle) {
				return i;
			}
		}

		return -1;
	};

	isArray = function (a) {
		return ops.call(a) === array_string;
	};

	return {
		isArray: isArray,
		indexOf: inArray
	};
}());

MYAPP.utilities.Array = (function() {
	var uobj = MYAPP.utilities.object,
		ulang = MYAPP.utilities.lang,

		// private properties and methods
		Constr;

		// end var

		// optionally one-time init procedures
		// ...

		// public API --constructor
		Constr = function (o) {
			this.elements = this.toArray(o);
		};

		Constr.prototype = {
			constructor: MYAPP.utilities.Array,
			version: "2.0",
			toArray: function (obj) {
				for (var i = 0, a = [], l = obj.length; i < l; i ++) {
					a[i] = obj[i];
				}
				return a;
			}
		};

		// return the constructor
		// to be assigned to the new namespace
		return Constr;
}());

MYAPP.utilities.module = (function (app, global) {
	// reference to the global object
	// and to the global app namespace object
	// are now localized
}(MYAPP, this));


// The advantage of the Sandbox method allows the developer
// to create an instance of the object while also constructing
// the modules that are attributes to the Sandbox.
// copying over all the modules and initializating them
// for the object

Sandbox.modules = {};

Sandbox.modules.dom = function (box) {
	box.getElement = function () {};
	box.getStyle = function () {};
	box.foo = "bar";
};

Sandbox.modules.event = function (box) {
	// access to the Sandbox prototype if needed:
	// box constructor.prototype.m = "mmm";
	box.attachEvent = function () {};
	box.detachEvent = function () {};
};

Sandbox.modules.ajax = function (box) {
	box.makeRequest = function () {};
	box.getResponse = function () {};
};

function Sandbox() {
	// turning arguments into an array
	var args = Array.prototype.slice.call(arguments),
		// the last argument is the callback
		callback = args.pop(),
		// modules can be passed as an array or as individual parameters
		modules = (args[0] && typeof args[0] === "string") ? args : args[0],
		i;

	// make sure the function is called
	// as a constructor
	if (!(this instanceof Sandbox)) {
		return new Sandbox(modules, callback);
	}

	// add propertis to `this` as needed:
	this.a = 1;
	this.b = 2;

	// now add modules to the core `this` object
	// no modules or * both mean, "use all modules"
	if (!modules || modules === "*") {
		modules = [];
		for (i in Sandbox.modules) {
			if (Sandbox.modules.hasOwnProperty(i)) {
				modules.push(i);
			}
		}
	}

	// initialize the required modules
	for (i = 0, l = modules.length; i < l; i ++) {
		Sandbox.modules[modules[i]](this);
	}

	// call the callback
	callback(this);
}

Sandbox.prototype = {
	name: "My Application",
	version: "1.0",
	getName: function () {
		return this.name;
	}
};

var sandy = new Sandbox(function(box) {
	console.log(box.getName());
});

// Static members

// constructor
var Gadget = function () {};

// a static method
Gadget.isShiny = function () {
	return 'you bet';
};

// a normal method added to the prototype
Gadget.prototype.setPrice = function (price) {
	this.price = price;
};

// calling a static method
console.log(Gadget.isShiny()); //

var iphone = new Gadget();
iphone.setPrice(500);

// calling a facade which points to the original static method
Gadget.prototype.isShiny = Gadget.isShiny;
console.log(iphone.isShiny()); //

var Gadget_New = function (price) {
	this.price = price;
};

// a static method
Gadget_New.isShiny = function () {
	// this always works
	var msg = "you bet";

	if (this instanceof Gadget_New) {
		// this only works if called non-statically
		msg += ", it costs $" + this.price + "!";
	}

	return msg;
};

// a normal method added to the prototype
Gadget_New.prototype.isShiny = function () {
	return Gadget_New.isShiny.call(this);
};

console.log(Gadget.isShiny()); // you bet!

var a = new Gadget_New("499.99");
console.log(a.isShiny()); // you bet, it costs $499.99!

var Gadget_5 = (function () {
	// static variable/property
	var counter = 0;

	// returning the new implementation
	// of the constructor
	return function () {
		console.log(counter += 1);
	};
}()); // execute immediately

console.log(new Gadget_5()); // 1
console.log(new Gadget_5()); // 2

// expose the unique static identifier by creating a privileged method
var Gadget = (function () {
	var counter = 0, NewGadget;

	NewGadget = function () {
		counter += 1;
	};

	NewGadget.prototype.getLastId = function () {
		return counter;
	};

	return NewGadget;
}());

//testing the new implementation
var iPhone5S = new Gadget();
console.log(iPhone5S.getLastId());

var iPod = new Gadget();
console.log(iPod.getLastId());

// Object Constants
var Widget = function () {
	// implementation
};

Widget.MAX_HEIGHT = 320;
Widget.MAX_WIDTH = 480;

var constant = (function () {
	var constants = {},
		ownProp = Object.prototype.hasOwnProperty,
		allowed = {
			string: 1,
			number: 1,
			boolean: 1
		},
		prefix = (Math.random() + "_").slice(2);
	return {
		set: function (name, value) {
			if (this.isDefined(name)) {
				return false;
			}
			if (!ownProp.call(allowed, typeof value)) {
				return false;
			}
			constants[prefix + name] = value;
			return true;
		},
		isDefined: function (name) {
			return ownProp.call(constants, prefix + name);
		},
		get: function (name) {
			if (this.isDefined(name)) {
				return constants[prefix + name];
			}
			return null;
		}
	};
}());

// check if defined
constant.isDefined("maxwidth"); // false

// define
constant.set("maxwidth", 480); // true

// check again
constant.isDefined("maxwidth"); // true

// chaining

var obj = {
	value: 1,
	increment: function () {
		this.value += 1;
		return this;
	},
	add: function (v) {
		this.value += v;
		return this;
	},
	shout:function () {
		console.log(this.value);
	}
};

obj.increment().add(3).shout(); // 5

// to implement below, we use syntastic sugar
// or the method we create for chaining
if (typeof Function.prototype.method !== "function") {
	Function.prototype.method = function (name, implementation) {
		this.prototype[name] = implementation;
		return this;
	};
}

var Person = function (name) {
	this.name = name;
}.
	method('getName', function () {
		return this.name;
	}).
	method('setName', function (name) {
		this.name = name;
		return this;
	});

