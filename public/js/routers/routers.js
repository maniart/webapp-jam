var app = app || {};

app.routers = (function(w, d, Backbone) {

	'use strict';
	
	var Desktop = Backbone.Router.extend({

		initialize : function() {
			Backbone.history.start();
		},

		routes : {
			'' : 'index'
		},

		index : function() {
			console.log('routers.js >> routes : index');
		}

	});

	return {
		Desktop : Desktop
	};

}(window, document, Backbone));
