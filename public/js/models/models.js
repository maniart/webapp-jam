var app = app || {};

app.models = (function(w, d, Backbone, _, $) {

	'use strict';

	var Stage = Backbone.Model.extend({

		initialize : function() {
			console.log('models.js >> Stage : new instance');
		},
		urlRoot : '/stage'

	});

	var Synth = Backbone.Model.extend({

		initialize : function() {
			console.log('models.js >> Synth : new instance');
		},
		urlRoot : '/instruments/synth',

		defualts : {
			
		}


	});

	return {
		Stage : Stage,
		Synth : Synth
	};

}(window, document, Backbone, _, jQuery));