define([
  'jQuery',
  'cordova',
  'underscore',
  'backbone',

  'text!templates/addItem/addItem.html'
], 

function($, navigator, _, Backbone, userListTemplate){

  var userListView = Backbone.View.extend({
    el: $("#page"),

    initialize: function(){
      document.addEventListener("deviceready", this.onDeviceReady,false);
      console.log("Initialised AddItems Page");
    },

    render: function(){
      var data = {};
      var compiledTemplate = _.template( userListTemplate, data );
      this.$el.html( compiledTemplate ).trigger('create'); 
    },

    useCamera: function(){
      this.capturePhoto();
    },

    useGallery: function(){
      this.getPhoto(this.pictureSource.PHOTOLIBRARY);
    },

    pictureSource: '',
    destinationType: '',

    // Cordova is ready to be used!
    //
    onDeviceReady: function() {
        this.pictureSource = navigator.camera.PictureSourceType;
        this.destinationType = navigator.camera.DestinationType;
    },

    // Called when a photo is successfully retrieved
    //
    onPhotoDataSuccess: function(imageData) {
      // Uncomment to view the base64 encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    },

    // Called when a photo is successfully retrieved
    //
    onPhotoURISuccess: function(imageURI) {
      // Uncomment to view the image file URI 
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    },

    // A button will call this function
    //
    capturePhoto: function() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, { quality: 50,
        destinationType: this.destinationType.DATA_URL, 
        pictureSourceType: this.pictureSource.CAMERA });
    },

    // A button will call this function
    //
    capturePhotoEdit: function() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, { quality: 20, allowEdit: true,
        destinationType: this.destinationType.DATA_URL });
    },

    // A button will call this function
    //
    getPhoto: function(source) {
      // Retrieve image file location from specified source
      alert('Gallery!');
      navigator.camera.getPicture(
        this.onPhotoURISuccess, 
        this.onFail, 
        { 
          quality: 50, 
          allowEdit: true,
          destinationType: Camera.DestinationType.DATA_URL, 
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY, 
          allowEdit: false, 
          mediaType: Camera.MediaType.PICTURE,
        });
    },

    // Called if something bad happens.
    // 
    onFail: function(message) {
      alert('Failed because: ' + message);
    }

  });
  
  return new userListView;
});
