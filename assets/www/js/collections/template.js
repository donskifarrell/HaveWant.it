define([
  'jQuery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  return {};
});



define([
  'jQuery',
  'underscore',
  'backbone',

  'text!templates/home/home.html'
], 

function($, _, Backbone, aTemplate){
  var aView = Backbone.View.extend({
    el: '#page',

    initialize: function(){
      document.addEventListener("deviceready", this.onDeviceReady,false);
      console.log("Initialised aTemplate Page");
    },

    render: function(){
      this.$el.html(aTemplate);
    }
  });

  return new aView;
});
