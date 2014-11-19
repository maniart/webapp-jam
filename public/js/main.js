var app = app || {};

app.main = (function(w, d, Backbone, _, $) {


	var routers = app.routers;

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
		init : init
	};

}(window, document, Backbone, _, jQuery));

jQuery(document).ready(app.main.init);
