define([
  'jQuery',
  'underscore',
  'backbone',
  'thumbnailer',
  'klass',
  'photoswipe',

  'text!templates/addItem/galleryImages.html'
], 

function($, _, Backbone, thumbnailer, klass, PhotoSwipe, galleryImagesTemplate){
  var galleryView = Backbone.View.extend({
    el: '#page',

    initialize: function(){
      _.bindAll(this, 'fsRequestSuccess');
      _.bindAll(this, 'fsRequestError');
      _.bindAll(this, 'generateThumbs');
      _.bindAll(this, 'renderThumbs');

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
        this.generateThumbs, 
        this.fsRequestError);
    },

    fsRequestError: function(e) {
      console.log("**************Gasdasd Fail");
      console.log("File System Error: " + e.toString());
    },

    generateThumbs: function(albumDir) {
      console.log("Generating Thumbnails");

      $.mobile.showPageLoadingMsg();
      thumbnailer.createAlbumThumbnails(albumDir.fullPath, this.renderThumbs);
    },

    renderThumbs: function(thumbPaths) {
      console.log("Rendering Thumbnails");
      this.printResults(thumbPaths);

      for (img in thumbPaths) {
        $('#gallery')
          .append('<li><a href="' + 
            img + '"><img src="' + 
            thumbPaths[img] + '"/></a></li>');
      }

      $.mobile.hidePageLoadingMsg();
      var options = {};
      $("#Gallery a").photoSwipe(options);
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
