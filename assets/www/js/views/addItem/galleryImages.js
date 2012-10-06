define([
  'jQuery',
  'underscore',
  'backbone',
  'thumbnailer',
  'klass',
  'photoswipe',

  'text!templates/addItem/galleryImages.html',
  'text!templates/addItem/selectImagesListItem.html'
], 

function($, _, Backbone, thumbnailer, klass, PhotoSwipe, galleryImagesTemplate, selectImagesListItem){
  var galleryView = Backbone.View.extend({
    el: '#page',
    imageListItemTemplate: _.template(selectImagesListItem),
    showLoading: true,

    initialize: function(){
      _.bindAll(this, 'fsRequestSuccess');
      _.bindAll(this, 'fsRequestError');
      _.bindAll(this, 'getAlbumImages');
      _.bindAll(this, 'generateThumbs');
      _.bindAll(this, 'renderThumbnail');

      document.addEventListener("deviceready", this.onDeviceReady, true);
      console.log("Initialised Gallery Page");
    },

    onDeviceReady: function(e) {
      console.log("Gallery Page: Device Ready");
    },

    fsRequestSuccess: function(fs) {
      console.log("Got the file system: " + fs.name);
      console.log("Root entry name is "+ fs.root.name);  

      var sdcard = fs.root;
      sdcard.getDirectory(
        'DCIM/Camera', 
        { create: false }, 
        this.getAlbumImages, 
        this.fsRequestError);
    },

    fsRequestError: function(e) {
      console.log("**************Gasdasd Fail");
      console.log("File System Error: " + e.toString());
    },

    getAlbumImages: function(albumDir) {    
      $.mobile.showPageLoadingMsg();  
      console.log("Getting images from album '" + albumDir.fullPath + "'");
      var albumReader = albumDir.createReader();
      albumReader.readEntries(this.generateThumbs, this.fsRequestError);
    },

    generateThumbs: function(images) {
      for (var id = 0; id <= images.length - 1; id++) {
        thumbnailer.createImageThumbnail(images[id].fullPath, this.renderThumbnail);
      };
    },

    renderThumbnail: function(thumbPath) {
      if (this.showLoading) {
        console.log("!!!!!hidePageLoadingMsg");
        $.mobile.hidePageLoadingMsg();
        this.showLoading = false;
      }

      var img = thumbPath[0];
      var name = img.substring(img.lastIndexOf('/') + 1);
      var thumb = thumbPath[1];     
      var listItem;
      listItem = this.imageListItemTemplate(
        { 
          'full': img,
          'name': name,
          'thumb': thumb
        });
      $('#galleryList').append(listItem);
      $('#galleryList').listview('refresh');
    },

    render: function() {      
      console.log("Gallery Page - Render");
      this.$el.html(galleryImagesTemplate).trigger('create');
      try{
        console.log(" - Getting FileSystem and Photos");
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.fsRequestSuccess, this.fsRequestError);
      }
      catch(err){        
        console.log(" - Getting FileSystem Failed");
      }
    },

    printResults: function(results) {
      console.log("Print Results: ");
      for (property in results) {
        console.log(property + ': ' + results[property]);
      }
      console.log("===================");
    }
  });

  return new galleryView;
});
