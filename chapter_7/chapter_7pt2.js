// Chapter 7 Design Patterns
//
// Iterator Pattern
// You have an object containing some sort of aggregate data. This data
// may ne stored internally and the consumer doesn't need to know how it is
// structured by being able to access individual elements

var agg = (function () {
	var index = 0,
		data = [1,2,3,4,5],
		length = data.length;
	return {
		next: function () {
			if (!this.hasNext()) {
				return null;
			}
			element = data[index];
			index = index + 2;
			return element;
		},

		rewind: function () {
			index = 0;
		},


		current: function () {
			return data[index];
		},
		
		hasNext: function () {
			return index < length;
		}
	};
}());

// loops 1, then 3, then 5
while (agg.hasNext()) {
	console.log(agg.next());
}

// go back
agg.rewind();
console.log(agg.current()); // 1

// Decorator Pattern
// additional functionality can be added to an object dynamically, at runtime
// customization and configuration of the expected behavior


// implementation
function Sale(price) {
	this.price = price || 100;
}
Sale.prototype.getPrice = function () {
	return this.price;
};

// implemented as properties of a constructor property:
Sale.decorators = {};

Sale.decorators.fedtax = {
	getPrice: function () {
		var price = this.uber.getPrice();
		price += price * 5 / 100;
		return price;
	}
};

Sale.decorators.quebec = {
	getPrice: function () {
		var price = this.uber.getPrice();
		price += price * 7.5 / 100;
		return price;
	}
};

Sale.decorators.money = {
	getPrice: function () {
		return "$" + this.uber.getPrice().toFixed(2);
	}
};

Sale.decorators.cdn = {
	getPrice: function () {
		return "CDN$" + this.uber.getPrice().toFixed(2);
	}
};

Sale.prototype.decorate = function (decorator) {
	var F = function () {},
		overrides = this.constructor.decorators[decorator],
		i, newObj;
	F.prototype = this;
	newObj = new F();
	newObj.uber = F.prototype;
	for (i in overrides) {
		if (overrides.hasOwnProperty(i)) {
			newObj[i] = overrides[i];
		}
	}
	return newObj;
};

var sale = new Sale(100);
sale = sale.decorate('fedtax');
sale = sale.decorate('quebec');
sale = sale.decorate('money');
console.log(sale.getPrice());

// another scenario where provincial tax is not needed
var sale_2 = new Sale(100);
sale_2 = sale_2.decorate('fedtax');
sale_2 = sale_2.decorate('cdn');
console.log(sale_2.getPrice());

// implementation using a list
// benifits from the dynamic nature of JS and doesn't need to use inheritance at all.
// pass results of the previous method as a parameter to the next method
// decorator pattern with a list makes far more sense, IMO, in comparison to the
// syntasitc sugar above.

function Sale(price) {
	this.price = price || 100;
	this.decorators_list = [];
}

Sale.decorators = {};

Sale.decorators.fedtax = {
	getPrice: function (price) {
		return price + price * 5 / 100;
	}
};

Sale.decorators.quebec = {
	getPrice: function (price) {
		return price + price * 7.5 / 100;
	}
};
Sale.decorators.money = {
	getPrice: function (price) {
		return "$" + price.toFixed(2);
	}
};

Sale.prototype.decorate = function (decorator) {
	this.decorators_list.push(decorator);
};

Sale.prototype.getPrice = function () {
	var price = this.price,
		i,
		max = this.decorators_list.length,
		name;
	for (i = 0; i < max; i += 1) {
		name = this.decorators_list[i];
		price = Sale.decorators[name].getPrice(price);
	}
	return price;
};

var sale_list = new Sale(100);
sale_list.decorate('fedtax');
sale_list.decorate('quebec');
sale_list.decorate('money');
console.log(sale_list);
console.log(sale_list.getPrice());

// Strategy Pattern enables you to select algorithms at runtime.

var data = {
	first_name: "Super",
	last_name: "Man",
	age: "unknown",
	username: "o_O"
};


var validator = {
	// all available checks
	types: {},

	// error messages in the current
	// validation session
	messages: [],

	// current validation config
	// name: validation type
	config: {},

	// the interface method
	// `data` is key => value pairs
	validate: function (data) {
		var i, msg, type, checker, result_ok;

		this.messages = [];

		for (i in data) {
			if (data.hasOwnProperty(i)) {
				type = this.config[i];
				checker = this.types[type];

				if (!type) {
					continue; // no need to validate
				}

				if (!checker) { // uh-oh
					throw {
						name: "ValidationError",
						message: "No handler to validate type " + type
					};
				}

				result_ok = checker.validate(data[i]);
				if (!result_ok) {
					msg = "Invalid value for *" + i + "*, " + checker.instructions;
					this.messages.push(msg);
				}
			}
		}
		return this.hasErrors();
	},

	// helper
	hasErrors: function () {
		return this.messages.length !== 0;
	}

};

// checks for non-empty values
validator.types.isNonEmpty = {
	validate: function (value) {
		return value !== "";
	},
	instructions: "the value cannot be empty"
};

// cheks if a value is a number
validator.types.isNumber = {
	validate: function (value) {
		return !isNaN(value);
	},
	instructions: "the value can only be a valid number"
};

// checks if the value contains only letters and numbers
validator.types.isAlphaNum = {
	validate: function (value) {
		return !/[^a-z0-9]/i.test(value);
	},
	instructions: "the value can onl contain characters and numbers, no special symbols"
};
validator.config = {
	first_name: 'isNonEmpty',
	age: 'isNumber',
	username: 'isAlphaNum'
};

validator.validate(data);

if (validator.hasErrors()) {
	console.log(validator.messages.join("\n"));
}

