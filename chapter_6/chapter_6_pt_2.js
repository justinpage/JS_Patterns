// Klass

var klass = function (Parent, props) {
	var Child, F, i;

	// 1.
	// new constructor
	Child = function () {
		if (Child.uber && Child.uber.hasOwnProperty("__construct")) {
			Child.uber.__construct.apply(this, arguments);
		}
		if (Child.prototype.hasOwnProperty("__construct")) {
			Child.prototype.__construct.apply(this, arguments);
		}
	};

	// 2
	// inherit
	Parent = Parent || Object;
	F = function () {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.uber = Parent.prototype;
	Child.prototype.construcor = Child;

	// 3.
	// add implementation methods
	for (i in props) {
		if (props.hasOwnProperty(i)) {
			Child.prototype[i] = props[i];
		}
	}

	// return the "class"
	return Child;
};

var Man = klass(null, {
	__construct: function (what) {
		console.log("Man's constructor");
		this.name = what;
	},
	getName: function () {
		return this.name;
	}
});

var first = new Man('Adam'); // logs "Man's constructor"
first.getName(); // Adam

var SuperMan = klass(Man, {
	__construct: function (what) {
		console.log("SuperMan's constructor");
	},
	getName: function() {
		var name = SuperMan.uber.getName.call(this);
		return "I am " + name;
	}
});

var clark = new SuperMan('Clark Kent');
clark.getName(); // "I am Clark Kent"

// prototypal inheritance

function object(o) {
	function F() {}
	F.prototype = o;
	return new F();
}
// object to inherit from
var Parent = {
	name: "Papa"
};

// the new object
var child = object(Parent);

// testing
console.log(child.name);

// prototypal inheritance -->discussion
function Person() {
	// an "own" property
	this.name = "Adam";
}

// a property added to the prototype
Person.prototype.getName = function () {
	return this.name;
};

// create a new person
var papa = new Person();
// inherit
var kid = object(papa);
//test that both own property
//and the prototype property were inherited
kid.getName(); // "Adam"

// you child variate this so only the prototype object of an existing constructor
// would be inherited
//
var anotherKid = object(Person.prototype);

function extend(parent, child) {
	var i;
	child = child || {};
	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
			child[i] = parent[i];
		}
	}
	return child;
}

var daddy = {name: "Adam"};
var kiddie = extend(daddy);
console.log(kiddie.name); // Adam 

// with this shallow copy methods, if you change a property of the child, and this 
// property happens to be an object, then you'll be modifying the parent as well

var daddie = {
	counts: [1,2,3],
	reads: {paper: true}
};

var kid = extend(daddie);
kid.counts.push(4);
console.log(daddie.counts.toString());

function extendDeep(parent, child) {
	var i,
		toStr = Object.prototype.toString,
		astr = "[object Array]";

	child = child || {};

	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
			if (typeof parent[i] === "object") {
				child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
				extendDeep(parent[i], child[i]);
			} else {
				child[i] = parent[i];
			}
		}
	}
	return child;
}

var daddie = {
	counts: [1,2,3],
	reads: {paper: true}
};

var kid = extendDeep(daddie);

kid.counts.push(4);
console.log(kid.counts.toString());
console.log(daddie.counts.toString());

// mix-ins

function mix() {
	var arg, prop, child = {};
	for (arg = 0; arg < arguments.length; arg += 1) {
		for (prop in arguments[arg]) {
			if (arguments[arg].hasOwnProperty(prop)) {
				child[prop] = arguments[arg][prop];
			}
		}
	}
	return child;
}

var cake = mix(
	{eggs: 2, large: true},
	{butter: 1, salted: true},
	{flower: "3 Cups"},
	{sugar: "sure!"}
);

console.dir(cake);

// borrowing methods

// borrowing from an array
function f() {
	// shorter expression for array
	var args = [].slice.call(arguments, 1, 3);
	return args;
}
console.log(f(1,2,3,4,5,6));
