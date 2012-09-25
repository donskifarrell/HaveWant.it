define([
  'jQuery',
  'underscore',
  'backbone',

  'text!templates/addItem/cameraImages.html'
], 

function($, _, Backbone, cameraImagesTemplate){
  var cameraView = Backbone.View.extend({
    el: '#page',

    initialize: function(){
      console.log("Initialised Camera Page");
    },

    render: function(){
      this.$el.html(cameraImagesTemplate).trigger('create');
    }
  });

  return new cameraView;
});
