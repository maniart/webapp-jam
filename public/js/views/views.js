var app = app || {};

app.views = (function(w, d, Backbone, _, $) {

	'use strict';

	var Stage = Backbone.View.extend({

		attributes : {
			'class' : 'stage col-xs-12'
		},

		socket : io(),

		template : _.template('<h1>Stage</h1>'),

		render : function() {
			this.$el.
				html(this.template({ })).
				appendTo('.stage-container');
		},

		attachListeners : function() {
			this.listenTo(this.model, 'change', this.render);
			this.socket.on('note', function(freq) {
				console.log('socket.io >> note : ', freq);
			});
		},

		initialize : function() {
			console.log('views.js >> Stage : new instance ');
			this.attachListeners();
			this.render();
		},

		events : {

		}

	});

	var Synth = Backbone.View.extend({

		attributes : {
			'class' : 'instrument synth col-xs-12'
		},
		
		socket : io(),

		template : _.template('<div class="row"><% _.each(notes, function(note, objectKey) { %> <div class="key note" style="width:<%= 100/_.size(notes) %>%; background-color: rgba(0, 0, 0, <%= .7 / (_.keys(notes).indexOf(objectKey) + 1) %>)" data-frequency="<%= note %>"></div> <% }); %></div>'),
		
		$container : $('.instrument-container'),
		
		render : function() {
			this.$el.
				html(this.template({ notes : this.model.get('notes') })).
				appendTo('.instrument-container');
			this.$el.hammer();
			
		},

		attachListeners : function() {
			this.listenTo(this.model, 'change', this.render);
		},

		initialize : function() {
			console.log('views.js >> Synth : new instance ');
			this.attachListeners();
		},

		events : {
			'tap' : function(ev) {
				console.log('*tap ', $(ev.gesture.target).data('frequency'));
				this.socket.emit('note', $(ev.gesture.target).data('frequency'));
			},
			'pan' : function(ev) {
				console.log('*pan ', $(ev.gesture.target).data('frequency'));
				this.socket.emit('note', $(ev.gesture.target).data('frequency'));
			}
		}

	});

	return {
		Synth : Synth,
		Stage : Stage
	};

}(window, document, Backbone, _, jQuery));