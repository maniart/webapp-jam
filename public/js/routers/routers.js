var app = app || {};

app.routers = (function(w, d, Backbone) {

	'use strict';
	
	var Desktop = Backbone.Router.extend({

		initialize : function() {
			Backbone.history.start();
		},

		routes : {
			'' : 'index',
			'instruments/:instrument' : 'instrument',
			'mixer' : 'mixer',
			'stage' : 'stage'
		},

		stage : function() {
			console.log('routers.js >> routes : stage');
			new app.views.Stage({ model : new app.models.Stage() });
		},

		index : function() {
			console.log('routers.js >> routes : index');

		}, // index
		
		instrument : function(name) {
			
			var name = name.charAt(0).toUpperCase() + name.slice(1);

			if(!(name in app.models) || !(name in app.views)) {
				throw new Error('No such instrument.');
			} else {
				var instrumentModel = new app.models[name]();
				var instrumentView = new app.views[name]({ model : instrumentModel });
				instrumentModel.fetch({

					success : function(model, response, options) {
						console.log('routers.js >> Desktop instrument success - model - ', model, ' response - ', response, ' options: - ', options);
					}, 
					error : function(model, response, options) {
						console.log('routers.js >> Desktop instrument error - model - ', model, ' response - ', response, ' options: - ', options);
					
					}
				});
			}
		}, // instrument	
		
		mixer : function() {
			var mixer = new app.models.Mixer();
			var onSuccess = function(model, response, options) {
				console.log('routers.js >> Desktop mixer success - model - ', model, ' response - ', response, ' options: - ', options);	

			};
			var onError = function(model, response, options) {
				console.log('routers.js >> Desktop mixer error - model - ', model, ' response - ', response, ' options: - ', options);	
			};
			mixer.fetch({
				success : onSuccess,
				error : onError
			});
		}
	});

	return {
		Desktop : Desktop
	};

}(window, document, Backbone));
