define([
  'backbone',

  'views/home/home',
  'views/addItem/addItem',
  'views/addItem/galleryImages',
  'views/addItem/cameraImages'
], 

function(
  Backbone, 
  homePage, 
  itemsList, 
  addNewItem,
  galleryImages,
  cameraImages
){

  var AppRouter = Backbone.Router.extend({
    routes: {
      'additem': 'addNewItem',
      'useCamera': 'useCamera',
      'useGallery': 'useGallery',

      '*actions': 'showHomePage'
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
