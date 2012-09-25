define([
  'jQuery',
  'cordova',
  'underscore',
  'backbone',

  'text!templates/addItem/addItem.html'
], 

function($, navigator, _, Backbone, addItemTemplate){

  var addItemView = Backbone.View.extend({
    el: $("#page"),

    initialize: function(){
      console.log("Initialised Add New Items Page");
    },

    render: function(){
      this.$el.html(addItemTemplate).trigger('create'); 
    }
  });
  
  return new addItemView;
});
