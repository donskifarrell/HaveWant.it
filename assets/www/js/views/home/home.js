define([
  'jQuery',
  'jQuery.mobile',
  'underscore',
  'backbone',

  'collections/items',
  'text!templates/home/home.html',
  'text!templates/home/myitems.html'
], 

function($, jQMobile, _, Backbone, itemCollection, mainHomeTemplate, myItems){
  var mainHomeView = Backbone.View.extend({
    el: '#page',

    initialize: function(){
      console.log("Initialised Home Page");
      this.collection = itemCollection;
      this.collection.bind("add", this.exampleBind);
      this.collection = itemCollection.add({ name: "Twitter"});
      this.collection = itemCollection.add({ name: "Facebook"});
      this.collection = itemCollection.add({ name: "Myspace", score: 20});
    },

    render: function(){
      console.log("Rendering Home Page");
      this.$el.html(mainHomeTemplate).trigger('create');

      if (this.collection.models.length > 0){
        var data = {
          projects: this.collection.models,
          _: _ 
        };
        var compiledTemplate = _.template( myItems, data );
        $("#itemsList").html("");
        $("#itemsList").html(compiledTemplate).trigger('create');
      }
    }
  });

  return new mainHomeView;
});
