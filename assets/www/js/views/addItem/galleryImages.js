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
      _.bindAll(this, 'renderPhotos');
      _.bindAll(this, 'listDir');
      _.bindAll(this, 'gotFiles');

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
      //sdcard.createReader().readEntries(this.gotFiles, this.fsRequestError);
      sdcard.getDirectory('DCIM/TEST', { create: false }, this.renderPhotos, this.fsRequestError);
/*
      console.log("*********************Gasdasd Ready");
      this.fileSystem = fs;          
        
        console.log("Got the file system: " + this.fileSystem.name);
        console.log("Root entry name is "+ this.fileSystem.root.name);  
        var dirReader = this.fileSystem.root.createReader();
        var hmm = dirReader.readEntries(this.gotFiles, this.fsRequestError); 
*/
      console.log("Photo Gallery complete");
    },

    fsRequestError: function(e) {
      console.log("**************Gasdasd Fail");
      console.log("File System Error: " + e.toString());
    },

    renderPhotos: function(DCIM) {
      console.log("Rendering Photos");
      var gallery = $('#gallery');
      this.listDir(DCIM, gallery);
    },

    listDir: function(directoryEntry, domParent) {
      console.log("listDir..");
      $.mobile.showPageLoadingMsg(); // show loading message
   
      var directoryReader = directoryEntry.createReader();
   
      directoryReader.readEntries(function(entries){ // success get files and folders
          console.log("Entries Length: - " + entries.length);
          for(var i = 0; i < entries.length; ++i){

            function loadThumbnail(thumbPath){
              thumbPath = "file://" + thumbPath;
              console.log("Thumbpath: " + thumbPath);

              if( i%2 == 0) {
                domParent.append(
                  '<div class="ui-block-a"><div class="thumbnail"><img src="' + 
                  thumbPath
                  + '"/></div></div>');
              }
              else {
                domParent.append(
                  '<div class="ui-block-b"><div class="thumbnail"><img src="' +
                  thumbPath
                  + '"/></div></div>');
              }
            }
            thumbnailer.createImageThumbnail(entries[i].fullPath, loadThumbnail);
            //console.log(entries[i].name);
          }
          $.mobile.hidePageLoadingMsg(); // hide loading message
      }, function(error){ // error get files and folders
          alert(error.code);
      });
    },

    gotFiles: function(entries) {

      console.log("***got files - " + entries.length);
        var s = "";
        for(var i=0, len=entries.length; i<len; i++) {
            //entry objects include: isFile, isDirectory, name, fullPath
            s+= entries[i].fullPath;
            if (entries[i].isFile) {
                s += " [F]";
            }
            else {
                s += " [D]";
            }
            s += " ";
            
        }
        console.log(s);
    },

    render: function(){      
      console.log("Gallery Page - Render");
      this.$el.html(galleryImagesTemplate).trigger('create');
      try{
        console.log(" - Getting FileSystem and Photos");
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.fsRequestSuccess, this.fsRequestError);
      }
      catch(err){        
        console.log(" - Getting FileSystem Failed");
      }
    }
  });

  return new galleryView;
});
