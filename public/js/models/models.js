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
			notes : {
				'C' : 261.63,
				'D' : 293.66,
				'E' : 329.63,
				'F' : 349.23,
				'G' : 392.00,
				'A' : 440.00,
				'B' : 493.88 	
			}
		},

	});

	return {
		Synth : Synth
	};

}(window, document, Backbone, _, jQuery));