var app = app || {};

app.models = (function(w, d, Backbone, _, $) {

	'use strict';

	var Synth;

	Synth = Backbone.Model.extend({

		initialize : function() {
			console.log('models.js >> Synth : new instance');
		},
		urlRoot : '/instruments/synth',

		defualts : {
			'comes from' : 'default'
		}


	});

	return {
		Synth : Synth
	};

}(window, document, Backbone, _, jQuery));