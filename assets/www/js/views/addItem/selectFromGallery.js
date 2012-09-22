define([
  'jQuery',
  'underscore',
  'backbone'
], 

function($, _, Backbone){
  var selectGalleryView = Backbone.View.extend({
    el: '#page',

    initialize: function(){
      document.addEventListener("deviceready", this.onDeviceReady,false);
      console.log("Initialised Select From Gallery Page");
    },

    render: function(){
      this.$el.html(mainHomeTemplate);
    }
  });

  return new selectGalleryView;
});
