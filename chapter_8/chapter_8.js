// user agent sniffing is regarded as an anti-pattern
// it will cause a significant performance hit
// ->a better pattern would be to be specific
if (typeof document.attachEvent !== "undefined") {
	document.attachEvent('onclick', console.log);
}

// DOM scripting
// Avoid DOM access loops
// assign DOM references to local variables and working with locals
// using selectors API where available
// caching the length when iterating over html collections
//
// here we have the content looping and then after the loop we
// then append the results
var i, content = "";
for (i = 0; i < 100; i += 1) {
	content += i + ", ";
}
/* document.getElementById("result").innerHTML += content; */

// using local variables is better:
// var style = document.getElementById("result").style,
// 	padding = style.padding,
// 	margin = style.margin;

// using selector API is better because it returns a DOM node of the selection. This is faster than other DOM methods
document.querySelector("body");

// For DOM manipulation, each update, addition, or removal is expensive
// it causes the DOM to repaint the screen and also reflow.
// using the document fragment will update offline and then live to the DOM in
// one step --thus less expensive
// var p, t, frag;
//
// frag = document.createDocumentFragment();
//
// p = document.createElement('p');
// t = document.createTextNode('First paragraph');
// p.appendChild(t);
// frag.appendChild(p);
//
// p = document.createElement('p');
// t = document.createTextNode('Second paragraph');
// p.appendChild(t);
// frag.appendChild(p);
//
// document.body.appendChild(frag);
//
// Event Handling
// var b = document.getElementById('click-wrap');
// if (document.addEventListener) {
// 	b.addEventListener('click', myHandler, false);
// } else if (document.attachEvent) {
// 	b.attachEvent('onclick', myHandler);
// } else {
// 	b.onclick = myHandler;
// }

function myHandler(e) {
	var src, parts;

	// get event and source element
	e = e || window.event;
	src = e.target || e.srcElement;


	if (src.nodeName.toLowerCase() !== "button") {
		return;
	}
	// actual work: update label
	parts = src.innerHTML.split(": ");
	parts[1] = parseInt(parts[1], 10) + 1;
	src.innerHTML = parts[0] +  ": " + parts[1];

	// no bubble
	if (typeof e.stopPropagation === "function") {
		e.stopPropagation();
	}
	if (typeof e.cancelBubble !== "undefined") {
		e.cancelBubble = true;
	}
	// prevent default action
	if (typeof e.preventDefault === "function") {
		e.preventDefault();
	}
	if (typeof e.returnValue !== "undefined") {
		e.returnValue = false;
	}
}

// XMLHttpRequest
// (function() {
// 	document.getElementById('xhr').onclick = function() {
// 		var xhr = new XMLHttpRequest();
//
// 		// provide a callback to the readystatechange event
// 		xhr.onreadystatechange =  function () {
// 			if (xhr.readyState !== 4)
// 				return false;
// 			if (xhr.status !== 200) {
// 				console.log("Error, status code: " + xhr.status);
// 				return false;
// 			}
// 			console.log(xhr.responseText);
// 			document.body.innerHTML += "<pre>" + xhr.responseText +  "<\/pre>";
// 		};
//
// 		xhr.open("GET", "page.html", true);
// 		xhr.send("");
// 	};
// }());
//

// tic tac toe via JSONP
var ttt = {
	// cells played so far
	played: [],

	// shorthand:
	get: function (id) {
		return document.getElementById(id);
	},

	// handle clicks
	setup: function () {
		this.get('new').onclick = this.newGame;
		this.get('server').onclick = this.remoteRequest;
	},

	// clean the board
	newGame: function () {
		var tds = document.getElementsByTagName("td"),
			max = tds.length,
			i;
		for (i = 0; i < max; i += 1) {
			tds[i].innerHTML = "&nbsp;";
		}
		ttt.played = [];
	},

	// make a request
	remoteRequest: function () {
		var script = document.createElement("script");
		script.src = "server.php?callback=ttt.serverPlay&played=" +  ttt.played.join(',');
		document.body.appendChild(script);
	},

	// callback, server's turn to play
	serverPlay: function (data) {
		if (data.error) {
			alert(data.error);
			return;
		}
		data = parseInt(data, 10);
		this.played.push(data);
		this.get('cell-' + data).innerHTML = '<span class="server">X\/span>';

		setTimeout(function () {
			ttt.clientPlay();
		}, 300);
	},

	clientPlay: function () {
		var data = 5;

		if (this.played.length === 9) {
			alert("Game Over");
			return;
		}

		// keep coming up with random numbers 1-9
		// until one not taken cell is found
		while (this.get('cell-' + data).innerHTML !== "&nbsp;") {
			data = Math.ceil(Math.random() * 9);
		}

		this.get('cell-' + data).innerHTML = "O";
		this.played.push(data);
	}
};

/* ttt.setup(); */
