define([
  'jQuery',
  'underscore',
  'backbone',

  'text!templates/addItem/galleryImages.html'
], 

function($, _, Backbone, galleryImagesTemplate){
  var galleryView = Backbone.View.extend({
    el: '#page',
    filesystem: '',

    initialize: function(){
      document.addEventListener("deviceready", this.onDeviceReady, true);
      console.log("Initialised Gallery Page");
    },

    onDeviceReady: function(e) {
      console.log("Gallery Page: Device Ready");
      //request the persistent file system

    },

    fsRequestSuccess: function(fs) {

      console.log("*********************Gasdasd Ready");
        this.fileSystem = fs;          
        
        console.log("Got the file system: " + fileSystem.name);
        console.log("Root entry name is "+ fileSystem.root.name);  
        var dirReader = this.fileSystem.root.createReader();
        dirReader.readEntries(this.gotFiles, this.fsRequestError); 
    },

    fsRequestError: function(e) {
      console.log("**************Gasdasd Fail");
        console.log("File System Error: " + e.toString());
    },

    gotFiles: function(entries) {

      console.log("***got files");
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
        s+="<p/>";
        console.log(s);
    },

    render: function(){
      this.$el.html(galleryImagesTemplate).trigger('create');
      try{
        console.log("*asdasdORRRRR:  ");
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.fsRequestSuccess, this.fsRequestError);
      }
      catch(err){
        console.log("*********************GERRRRROOORRRRR:  " + err);
      }
    }
  });

  return new galleryView;
});
