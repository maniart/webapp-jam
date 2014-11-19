var app = app || {};

app.main = (function(w, d, Backbone, _, $) {


	var routers = app.routers;

	if(!(typeof io) === 'function') {
		throw new Error('socket.io not found');
	}
	var socket = io();

	var attachListeners = function() {
		socket.on('connect', function() {
			console.log('socket.io >> connected');
			
		});
	};

	var init = function() {
		attachListeners();
		new routers.Desktop();
	};

	return {
		init : init,
		socket : socket
	};

}(window, document, Backbone, _, jQuery));

jQuery(document).ready(app.main.init);
