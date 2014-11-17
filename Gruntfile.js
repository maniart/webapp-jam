module.exports = function(grunt) {
	
	'use strict';
	// define config
	var config = {
		less : {
			development : {
				options : {
					compress : true,
					yuicompress : true,
					optimization : 2
				}, 
				files : {
					'public/css/main.css' : 'public/css/main.less'
				}
			}
		},
		watch :  {
			styles : {
				files : ['public/css/**/*.less'],
				tasks : ['less'],
				options : {
					noSpawn : true
				}
			}
		}
	};
	// init config
	grunt.initConfig(config);
	// load tasks
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// register tasks
	grunt.registerTask('default', ['watch']);

};

