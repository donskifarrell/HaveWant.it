define([
  'jQuery',
  'underscore',
  'backbone'
], 

function($, _, Backbone){
  var selectGalleryView = Backbone.View.extend({
    el: '#page',

    initialize: function(){
      console.log("Initialised Select From Gallery Page");
    },

    render: function(){
      alert('Galleryasdasd!');
      this.$el.html(mainHomeTemplate).trigger('create');
    }
  });

  return new selectGalleryView;
});
