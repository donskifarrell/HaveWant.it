require.config({
  paths: {
    'cordova': 'libs/cordova/cordova',
    'jQuery': 'libs/jquery/jquery-min', 
    'jQuery.mobile-config': 'libs/jquery/jquery.mobile-config',
    'jQuery.mobile': 'libs/jquery/jquery.mobile-min',
    'underscore': 'libs/underscore/underscore-min',
    'backbone': 'libs/backbone/backbone-min',
    templates: '../templates'
  },
  shim: {
          'cordova': {
            exports: "navigator"
          },
          'jQuery': {
            exports: "$"
          },
          'underscore': {
            exports: "_"
          },
          'backbone': {
              //These script dependencies should be loaded before loading
              //backbone.js
              deps: ['jQuery','underscore'],
              //Once loaded, use the global 'Backbone' as the
              //module value.
              exports: 'Backbone'
          },
          'jQuery.mobile-config': ['jQuery'],
          'jQuery.mobile': ['jQuery','jQuery.mobile-config'],
        }
});

require([
  'jQuery',
  'jQuery.mobile',
  'cordova',
  'underscore',
  'backbone',
  'app',
], function($, jQMobile, navigator, _, Backbone, App){
  $(document).ready(function() {
    App.initialize();
  });
});
