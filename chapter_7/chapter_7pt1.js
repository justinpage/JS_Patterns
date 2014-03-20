// Chapter 7 Design Patterns
//
// Singleton Pattern
// everytime you create an object using the object literal
// you are actually creating a singleton, and there is no special
// syntax involved
var obj = {
	myprop: 'my value'
};

var obj2 = {
	myprop: 'my value'
};

console.log(obj == obj2); // false
console.log(obj === obj2); // false

// instance in a static property
function Universe() {
	if (typeof Universe.instance === "object") {
		return Universe.instance;
	}

	this.start_time = 0;
	this.bang = "Big";

	// cache
	Universe.instance = this;
	return this;
}

var uni = new Universe();
var uni2 = new Universe();
console.log(uni === uni2);

// instance in a closure
function Universe() {
	var instance = this;

	this.start_time = 0;
	this.bang = "Big";

	// rewrite the constructor
	Universe = function() {
		return instance;
	};
}

var uni = new Universe();
var uni2 = new Universe();
console.log(uni === uni2);

// with some testing we can see we will lose any properites added to it between
// the moment of initial definition and redefintion
Universe.prototype.nothing = true;
var uni = new Universe();
// adding to the prototype after the initial
// object is created
Universe.prototype.everything = true;
var uni2 = new Universe();

// to gain back definition, even after adding attriutes
// we can wrap our constructor and the instance in an immediate function

var Universe;

(function () {
	var instance;

	Universe = function Universe() {
		if (instance) {
			return instance;
		}

		instance = this;

		this.start_time = 0;
		this.bang = "Big";
	};
}());

// update prototype and create instance
Universe.prototype.nothing = true;
var uni = new Universe();
Universe.prototype.everything = true;
var uni2 = new Universe();

console.log("uni === uni2", uni === uni2);

// Factory Pattern
// performs repeating operations when setting up similar objects
// Offers a way for the customers of the factory to create objects without
// knowing the specific type (class) at compile time

// parent constructor
function CarMaker() {}

CarMaker.prototype.drive = function () {
	return "Vroom, I have " + this.doors + " doors";
};

CarMaker.factory = function (type) {
	var constr = type,
		newcar;
	// error if the constructor doesn't exist
	if (typeof CarMaker[constr] !== "function") {
		throw {
			Name: "Error",
				message: constr + " doesn't exist"
		};
	}

	// at this point the constructor is known to exist
	// let's have it inherit the parent but only once
	if (typeof CarMaker[constr].prototype.drive !== "function") {
		CarMaker[constr].prototype =  new CarMaker();
	}
	// create a new instance
	newcar = new CarMaker[constr]();
	// optionally call some methods and then return...
	return newcar;
};

// define specific car makes
CarMaker.Compact = function () {
	this.doors = 4;
};
CarMaker.Convertible = function () {
	this.doors = 2;
};
CarMaker.SUV = function () {
	this.doors = 24;
};
var corolla = CarMaker.factory('Compact');
var solstice = CarMaker.factory('Convertible');
var cherokee = CarMaker.factory('SUV');
console.log(corolla.drive()); // "Vroom, I have 4 doors
console.log(solstice.drive()); // "Vroom, I have 2 doors
console.log(cherokee.drive()); // "Vroom, I have 24 doors


