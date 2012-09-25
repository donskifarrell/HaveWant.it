define([
  'cordova',
  'jQuery',
  'underscore',
  'backbone',

  'views/home/home',
  'views/items/items',
  'views/addItem/addItem',
  'views/addItem/galleryImages',
  'views/addItem/cameraImages'
], 

function(navigator, $, _, Backbone, 
  homePage, 
  itemsList, 
  addNewItem,
  galleryImages,
  cameraImages
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
      itemsList.render();
    },

    addNewItem: function(){
      addNewItem.render();
    },

    useCamera: function(){
      cameraImages.render();
    },

    useGallery: function(){
      galleryImages.render();
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
