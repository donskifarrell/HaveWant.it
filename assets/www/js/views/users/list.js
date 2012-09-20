// Filename: views/projects/list
define([
  'jQuery',
  'underscore',
  'backbone',
  'text!templates/users/list.html'
], function($, _, Backbone, userListTemplate){
  var userListView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){

      console.log("init users****main*");
    },
    render: function(){

      console.log("Renasderas****users*");
      var data = {};
      var compiledTemplate = _.template( userListTemplate, data );
      this.$el.html( compiledTemplate ); 
    }
  });
  return new userListView;
});
