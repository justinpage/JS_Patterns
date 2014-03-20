function sum (x, y) {
	var result = x + y;
	return result;
}


// define three globals
var global_var = 1;
global_novar = 2;

(function() {
	global_fromfunc = 3; // anti-pattern
}());

// you are now able to access the window object (this) from
// any where the global function is called.
var global = (function() {
	return this;
}());

function func() {
	var a = 1, b = 2, sum = a + b, myObject = {}, i, j;
	// function body
}

// antipattern
myname = "global"; //global variable
function funct() {
	console.log(myname); // undefined
	var  myname = "local";
	console.log(myname); //local
}
funct();

// good pattern for declaring array outside main for loop causes less queries
var arr = [];
for (var i = 0, l = arr.length; i < l; i ++) {
	var v = arr[i];
}

var man = {
	hands: 2,
	legs: 2,
	heads: 1
};

// somewhere else in the code
// a method was added to all objects
if(typeof Object.prototype.clone === "undefined") {
	Object.prototype.clone = function () {};
}

/* for (var i in man) {
	if (man.hasOwnProperty(i)) {
		console.log(i, ":", man[i]);
	}
}
*/

// a better way to avoid naming collisions
var i, hasOwn = Object.prototype.hasOwnProperty;
for (i in man) {
	if (hasOwn.call(man, i)) { // filter
		console.log(i, ":", man[i]);
	}
}

// warning doesn't pass JSLint
var i, hasOwn = Object.prototype.hasOwnProperty;
for (i in man) if (hasOwn.call(man, i)) { // filter
	console.log(i, ":", man[i]);
}

var inspect_me = 0,
	result = '';
switch (inspect_me) {
	case 0:
		result = "zero";
		break;
	
	default:
	result = "unknown";	
}

var person = {
	name:       "Justin",
	last_name:  "Page",

	getName: function () {
		return this._getFirst() + ' ' + this._getLast();
	},
	_getFirst: function() {
		return this.name;
	},
	_getLast: function() {
		return this.last_name;
	}
};

// YUIdoc example

/**
 * My JS App
 *
 * @module myapp
 *
 */
var MYAPP = {};

/**
 * A math utility
 * @namespace MYAPP
 * @class math_stuff
 */
MYAPP.math_stuff = {
	/**
	 * Sums two numbers
	 *
	 * @method sum
	 * @param {Number} a First Number
	 * @param {Number} b Second Number
	 * @param {Number} The sum of the two inputs
	 */
	sum: function (a, b) {
		return a + b;
	},

	/**
	 * Multiplies two numbers
	 * @method multi
	 * @param {Number} a The First Number
	 * @param {Number} b The Second Number
	 * @return {Number} The sum of the two inputs
	 */
	multiply: function (a, b) {
		return a * b;
	},
};
