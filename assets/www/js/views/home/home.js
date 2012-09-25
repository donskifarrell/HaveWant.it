define([
  'jQuery',
  'underscore',
  'backbone',

  'text!templates/home/home.html'
], 

function($, _, Backbone, mainHomeTemplate){
  var mainHomeView = Backbone.View.extend({
    el: '#page',

    render: function(){
      this.$el.html(mainHomeTemplate).trigger('create');
    }
  });

  return new mainHomeView;
});
