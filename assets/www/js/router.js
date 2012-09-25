define([
  'cordova',
  'jQuery',
  'underscore',
  'backbone',

  'views/home/home',
  'views/items/items',
  'views/addItem/addItem',
  'views/addItem/selectFromGallery'
], 

function(navigator, $, _, Backbone, 
  homePage, 
  itemsListView, 
  addNewItemView,
  selectFromGallery
){

  var AppRouter = Backbone.Router.extend({
    routes: {
      'items': 'showItems',
      'additem': 'addNewItem',
      'useCamera': 'useCamera',
      'useGallery': 'useGallery',

      '*actions': 'showHomePage'
    },

    showItems: function(){
      itemsListView.render();
    },

    addNewItem: function(){
      addNewItemView.render();
    },

    useCamera: function(){
      addNewItemView.useCamera();
    },

    useGallery: function(){
      selectFromGallery.render();
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
