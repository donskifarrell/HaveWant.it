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
      console.log("Renasderas****main*");
      this.$el.html(mainHomeTemplate);
    }
  });

  return new mainHomeView;
});
