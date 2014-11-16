var app = app || {};

app.main = (function(w, d, Backbone, _, $) {


	var routers = app.routers;


	var init = function() {
		new routers.Desktop();
	};

	return {
		init : init
	};

}(window, document, Backbone, _, jQuery));

jQuery(document).ready(app.main.init);
