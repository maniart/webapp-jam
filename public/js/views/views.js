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
			this.socket.on('orientation', function(data) {
				console.log('socket.io >> orienation : ', data);
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
			var _this = this,
				orientationArray = [];
			this.listenTo(this.model, 'change', this.render);
			/*
			w.addEventListener('deviceorientation', function(event) {
				
				orientationArray.push(event.alpha, event.beta, event.gamma);
				console.log(orientationArray);
				_this.socket.emit('orienation', orientationArray);
			});
			*/		
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
				var freq = $(d.elementFromPoint(ev.gesture.pointers[0].clientX, ev.gesture.pointers[0].clientY)).data('frequency');
				if(!(undefined === freq)) {
					console.log('*pan emit: ', freq);
					this.socket.emit('note', freq);
				}
			}
		}

	});

	return {
		Synth : Synth,
		Stage : Stage
	};

}(window, document, Backbone, _, jQuery));