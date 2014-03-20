var setup = function () {
	var count = 0;
	return function() {
		return (count += 1);
	};
};

// using the setup function
var next = setup();
console.log(next());

var scareMe = function () {
	console.log("Boo!");
	scareMe = function () {
		console.log("Double Boo!");
	};
};

// draw back is that you lose everything in the initial call because scareMe
// becomes redefined by the new function
// scareMe(); // Boo!
// scareMe(); // Double Boo!

// 1. adding a new property
scareMe.property = "properly";

// 2. assigning to a different name
var prank = scareMe;

// 3. using as a method
var spooky = {
	boo: scareMe
};

// calling with a new name
prank(); // Boo!
prank(); // Boo!
console.log(spooky.boo.property);

// calling as a method
spooky.boo(); // Boo!
spooky.boo(); // Boo!
console.log(spooky.boo.property);

// using the self-defined function
scareMe(); // Double boo!
scareMe(); // Double boo!
console.log(scareMe.property); // undefined

// immediate functions
// (function () {
// 	alert("watch out!");
// })();

(function () {
	var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		today = new Date(),
		msg = 'Today is ' + days[today.getDay()] + ', ' + today.getDate();

		console.log(msg);
})();

// prints:
// I met Justin Page on Tues, 11

(function (who, when) {
	console.log("I met " + who + " on " + when);
}("Justin Page", new Date()));

// pass in the global scope inside the immediate function
(function (global) {
	console.log(this);
}(this));

// return values from immediate functions
var result = (function () {
	return 2 + 2;
})();

console.log(result); // 4

var getResult = (function () {
	var res = 2 + 2;

	return function () {
		return res;
	};
}());

console.log(getResult()); // 4

var o = {
	message: (function () {
		var who = "me",
			what = "call";
		return what + " " + who;
	}()),
	getMsg: function () {
		return this.message;
	}
};

console.log(o.getMsg()); // "call me"
console.log(o.message); // "call me"

({
	maxWidth: 600,
	maxHeight: 400,

	gimmeMax: function () {
		return this.maxWidth + "x" + this.maxHeight;
	},

	init: function () {
		console.log(this.gimmeMax());
	}
}).init();

// memoization pattern -caching the return result of a function
// var myFunc = function (param) {
// 	if (!myFunc.cache[param]) {
// 		var result = {};
// 		// ... expensive operation
// 		myFunc.cache[param] = result;
// 	}
//
// 	return myFunc.cache[param];
// };

// cache storage
/* myFunc.cache = {}; */

var myFunc = function () {
	var cachekey = JSON.stringify(Array.prototype.slice.call(arguments)),
		result;
	if (!myFunc.cache[cachekey]) {
		var result = {};
		// ... expensive operation
		myFunc.cache[cachekey] = result;
	}

	return myFunc.cache[cachekey];
};

myFunc.cache = {};

// Passing a large amount of parameters should be acomplished through
// an object being passed through an array
var conf = {
	username: "batman",
	first: "Bruce",
	last: "Wayne1"
};
// addPerson(conf);


// Currying by example
function add(x, y) {
	var oldx = x, oldy = y;
	if (typeof oldy === "undefined") { // partial
		return function (newy) {
			return oldx + newy;
		};
	}

	return x + y;
}

console.log(typeof add(5)); // function
console.log(add(3)(4)); // 7

// create and store a new function
var add2000 = add(2000);
console.log(add2000(10));

// curried add -implicitlty used y variable.
// accepts partial list of arguments
function add(x, y) {
	if (typeof y === "undefined") {
		return function(y) {
			return x + y;
		};
	}
	// full app
	return x + y;
}

// general purpose currying function:
function schonfinkelize(fn) {
	var slice = Array.prototype.slice,
		stored_args = slice.call(arguments, 1);
	return function () {
		var new_args = slice.call(arguments),
			args = stored_args.concat(new_args);
		return fn.apply(null, args);
	};
}

// let us give the above a general purpose application
// with subtraction
function sub(x, y) {
	return x - y;
}

// curry a function to get a new function
var newsub = schonfinkelize(sub, 10);
console.log(newsub(5)); // 5

// to call directly to schonfinkelize
console.log(schonfinkelize(add, 6)(7));

// the transformation function schonfinkelize is not limited to single parameters
