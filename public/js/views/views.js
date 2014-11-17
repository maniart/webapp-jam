var app = app || {};

app.views = (function(w, d, Backbone, _, $) {

	'use strict';

	
	var Synth = Backbone.View.extend({

		attributes : {
			'class' : 'instrument synth col-xs-12'
		},
		
		template : _.template('<div class="row"><% _.each(notes, function(note, objectKey) { %> <div class="key note" style="width:<%= 100/_.size(notes) %>%; background-color: rgba(0, 0, 0, <%= .7 / (_.keys(notes).indexOf(objectKey) + 1) %>)" data-frequency="<%= note %>"></div> <% }); %></div>'),
		
		$container : $('.instrument-container'),
		
		render : function() {
			this.$el.
				html(this.template({ notes : this.model.get('notes') })).
				appendTo('.instrument-container');
			this.$el.hammer();
			
		},

		attachListeners : function() {
			//this.model.on('change', this.render);
			this.listenTo(this.model, 'change', this.render);
		},

		initialize : function() {
			console.log('views.js >> Synth : new instance ');
			this.attachListeners();
		},

		events : {
			'tap' : function(ev) {
				console.log('*tap ', $(ev.gesture.target).data('frequency'));
			},
			'pan' : function(ev) {
				console.log('*pan ', $(ev.gesture.target).data('frequency'));
			}
		}



	});

	return {
		Synth : Synth
	};

}(window, document, Backbone, _, jQuery));