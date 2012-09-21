define([
  'cordova',
  'jQuery',
  'underscore',
  'backbone',

  'views/home/home',
  'views/items/items',
  'views/addItem/addItem'
], 

function(navigator, $, _, Backbone, homePage, itemsListView, addNewItemView){

  var AppRouter = Backbone.Router.extend({
    routes: {
      'items': 'showItems',
      'additem': 'addNewItem',

      '*actions': 'showHomePage'
    },

    showItems: function(){
      itemsListView.render();
    },

    addNewItem: function(){
      addNewItemView.render();
    },

    showHomePage: function(actions){
      homePage.render(); 
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };

  return { 
    initialize: initialize
  };
});
