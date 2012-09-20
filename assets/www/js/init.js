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
            exports: "Navigator"
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
        },
  text: {
    useXhr: function (url, protocol, hostname, port) {
      // allow cross-domain requests
      // remote server allows CORS
      return true;
    }
  }
});

require([
  'jQuery',
  'jQuery.mobile',
  'cordova',
  'underscore',
  'backbone',
  'app',
], function($, jQMobile, cordova, _, Backbone, App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});
