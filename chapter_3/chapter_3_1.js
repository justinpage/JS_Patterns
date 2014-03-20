// named function expression
var add = function add(a, b) {
	return a + b;
};

// lambda
var add = function(a, b) {
	return a + b;
};

// Declaration versus Expressions: Names and Hoisting
/* callMe(function () { */
	// I am an unmamed function expression
	// also known as an anonymouse function
// });

// callMe(function me() {
	// I am an mamed function expression
	// and my name is me
// });

var myObject = {
	say: function () {
		// I am a function expression
	}
};

// Callback pattern
function writeCode(callback) {
	// do something
	callback();
}

function introduceBugs() {
	// ... make bugs
}

writeCode(introduceBugs);

// a callback example
var findNodes = function (callback) {
	var i = 10000, nodes = [], found;

	if (typeof callback !== "function") {
		callback = false;
	}

	while (i) {
		i -= 1;

		if (callback) {
			callback(found);
		}

		nodes.push(found);
	}

	return nodes;
};

// a callback function
var hide = function (node) {
	node.style.display = "none";
};

findNodes(hide);

// find the nodes and hide them as you go
// second implementation using lambda
findNodes(function (node) {
	node.style.display = "none";
});

// closure and scope
var myApp = {};
myApp.color = "green";
myApp.paint = function (node) {
	node.style.color = this.color;
};

var findNodes = function (callback, callback_obj) {
	// ...
	if (typeof callback === "function") {
		callback.call(callback_obj, found);
	}
};

findNodes(myApp.paint, myApp);

// alternatively, if you don't want to repeat yourself, you can use a string
var findNodes = function(callback, callback_obj) {
	if (typeof callback === "string") {
		callback = callback_obj[callback];
	}

	if (typeof callback === "function") {
		callback.call(callback_obj, found);
	}
};

var thePlotThickens = function() {
	console.log('500ms later...');
};

setTimeout(thePlotThickens, 500);
