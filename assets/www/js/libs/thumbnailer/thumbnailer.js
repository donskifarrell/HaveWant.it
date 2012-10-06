/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2011, IBM Corporation
 */

/**
 * Constructor
 */
function Thumbnailer() {
	var config = {
		THUMBNAIL_HEIGHT: 48,
		THUMBNAIL_WIDTH: 66,
		IMAGE_MAX_SIZE: 80,
		THUMB_DIR_NAME: 'pg_thumbs',
		ALLOW_SUB_DIRS: false
	}

	var JAVA_CLASS = 'Thumbnailer',
		CREATE_VIDEO = 'createVideoThumbnail',
		CREATE_IMAGE = 'createImageThumbnail',
		CREATE_ALBUM = 'createAlbumThumbnails';

	function thumbError(err){
		alert('Error creating thumbnail(s): ' + err);
	};

	function isUrlValid(url){
		return (url.toLowerCase().indexOf(config.THUMB_DIR_NAME) >= 0) ? 
			"Already within a thumbnail directory!" : true;
	};

	function cleanUrl(url){
		return (url.toLowerCase().indexOf("file://") == 0) ? url.substring(7) : url;
	};

	function executeAction(url, callback, action){
		var result = isUrlValid(url);
		if (result == true) {
			url = cleanUrl(url);
		} else {
			console.log("Ignoring call: " + result);
			return;
		}
		cordova.exec(callback, thumbError, JAVA_CLASS, action, [url, config]);
	}

	return {
		setOptions: function(options){
			if(options) {
			    for(prop in options){
			    	// error checking?
			        config[prop] = options[prop];
			    }
			}
		},

		createVideoThumbnail: function(url, callback) {
			executeAction(url, callback, CREATE_VIDEO);
		},

		createImageThumbnail: function(url, callback) {
			executeAction(url, callback, CREATE_IMAGE);
		},

		createAlbumThumbnails: function(url, callback) {
			executeAction(url, callback, CREATE_ALBUM);
		}
	}
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.thumbnailer) {
    window.plugins.thumbnailer = new Thumbnailer();
}
