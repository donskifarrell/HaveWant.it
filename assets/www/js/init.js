require.config({
  paths: {
    'cordova': 'libs/cordova/cordova',
    'jQuery': 'libs/jquery/jquery-min', 
    'jQuery.mobile-config': 'libs/jquery/jquery.mobile-config',
    'jQuery.mobile': 'libs/jquery/jquery.mobile-min',
    'underscore': 'libs/underscore/underscore-min',
    'backbone': 'libs/backbone/backbone-min',
    'thumbnailer': 'libs/thumbnailer/thumbnailer',
    'klass': 'libs/photoswipe/klass.min',
    'photoswipe': 'libs/photoswipe/photoswipe.jquery.min',
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
              deps: ['jQuery','underscore'],
              exports: 'Backbone'
          },            
          'thumbnailer': {
              exports: function(){ 
                this.thumbnailer = window.plugins.thumbnailer;
                return this.thumbnailer;
              }
          },          
          'photoswipe': {
              deps: ['jQuery', 'klass'],
              exports: function(){ 
                this.PhotoSwipe = window.Code.PhotoSwipe;
                return this.PhotoSwipe;
              }
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
  'thumbnailer',
  'klass',
  'photoswipe',
  'app',
], function($, jQMobile, navigator, _, Backbone, thumbnailer, klass, PhotoSwipe, App){
  $(document).ready(function() {
    App.initialize();
  });
});
