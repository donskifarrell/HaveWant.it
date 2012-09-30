define([
  'jQuery',
  'jQuery.mobile',
  'underscore',
  'backbone',

  'text!templates/home/home.html'
], 

function($, jQMobile, _, Backbone, mainHomeTemplate){
  var mainHomeView = Backbone.View.extend({
    el: '#page',

    render: function(){
      console.log("Rendering Home Page");
      this.$el.html(mainHomeTemplate).trigger('create');
    }
  });

  return new mainHomeView;
});
