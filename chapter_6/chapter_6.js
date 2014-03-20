// chapter 6: Code Reuse Patterns
function Parent(name) {
	this.name = name || 'Justin';
}

// adding functionality to the prototype
Parent.prototype.say = function() {
	return this.name;
};

// empty child constructor
function Child(name) {}

// inheritance magic happens here -> not provided by language
// below will be a few examples for implementation
inherit(Child, Parent);

// the default pattern
// problem: it has to create new instances of parent
// child inherits ALL properties from parent
// not just prototype, which is unecessary
// can't pass data to parent
function inherit(C, P) {
	C.prototype = new P();
}

// Rent-a-Constructor
function Child(a, b, c, d) {
	Parent.apply(this, arguments);
}

function Article() {
	this.tags = ['js', 'css'];
}
var article = new Article();

function BlogPost() {}
BlogPost.prototype = article;
var blog = new BlogPost();

function StaticPage() {
	Article.call(this);
}
var page = new StaticPage();

console.log(article.hasOwnProperty('tags'));
console.log(blog.hasOwnProperty('tags'));
console.log(page.hasOwnProperty('tags'));

blog.tags.push('html');
page.tags.push('php');
console.log(article.tags.join(', '));

// the prototype chain

function Parent(name) {
	this.name = name || 'Justin';
}

// adding functionality to the prototype
Parent.prototype.say = function() {
	return this.name;
};

function Child(name) {
	Parent.apply(this, arguments);
}

var kid = new Child("Patrick");
console.log(kid.name);

// multiple inheritance by borrowing constructors
function Cat() {
	this.legs = 4;
	this.say = function () {
		return "meeeooowwww";
	};
}

function Bird() {
	this.wings = 2;
	this.fly = true;
}

function CatWings() {
	Cat.apply(this);
	Bird.apply(this);
}

var jane = new CatWings();
console.dir(jane);

// Classical Pattern #3 -Rent and Set Prototype
// function Child(a, b, c, d) {
// 	Parent.apply(this, arguments);
// }
//
// Child.prototype = new Parent();

function Parent(name) {
	this.name = name || 'Justin';
}

// adding functionality to the prototype
Parent.prototype.say = function() {
	return this.name;
};

// child constructor
function Child(name) {
	Parent.apply(this, arguments);
}
Child.prototype = new Parent();

// Classical Pattern #4 -Share the Prototype
// this will set the child's prototype to be the same as the parent's prototype
// problem is, a grandchild somewhere could make a change affecting all parents and
// grandparents through the chain.
function inherit(C, P) {
	C.prototype = P.prototype;
}

function inherit(C, P) {
	var F = function () {};
	F.prototype = P.prototype;
	C.prototype = new F();
}


// storing the superclass

function inherit(C, P) {
	var F = function () {};
	F.prototype = P.prototype;
	C.prototype = new F();
	C.uber = P.prototype;
}

// resetting the constructor pointer
function inherit(C, P) {
	var F = function () {};
	F.prototype = P.prototype;
	C.prototype = new F();
	C.uber = P.prototype;
	C.prototype.constructor = C;
}

var kid = new Child();
