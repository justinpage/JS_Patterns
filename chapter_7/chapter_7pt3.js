// Mediator
// this pattern alleviates the situation of tight coupling and objects knowing too 
// much about each other.
//
function Player(name) {
	this.points = 0;
	this.name = name;
}
Plater.prototype.play = function () {
	this.points += 1;
	mediator.played();
};

var scoreboard = {
	// html elements to be updated
	element: document.getElementById('results'),

	// update the score display
	update: function (score) {
		var i, msg = '';
		for (i in score) {
			if (score.hasOwnProperty(i)) {
				msg += '<p><strong>' + i + '<\/strong>: ';
				msg += score[i];
				msg += '<\/p>';
			}
		}
		this.element.innerHTML = msg;
	}
};

var mediator = {
	// all players
	players: {},

	//init
	setup: function () {
		var players = this.players;
		players.home = new Player('Home');
		players.guest = new Player('Guest');
	},

	// someone plays, update the score
	played: function () {
		var players = this.players,
		score = {
			Home: players.home.points,
			Guest: players.guest.points
		};
		scoreboard.update(score);
	}
}
