package org.apache.cordova.plugin;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

//thumbnailer
import android.util.Log;
import android.media.ThumbnailUtils;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.provider.MediaStore.Video.Thumbnails;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;

// remove
import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * This class echoes a string called from JavaScript.
 */
public class Thumbnailer extends Plugin {
	private static final String LOG_TAG = "CordovaThumbnailer";
	private static final String THUMB_DIR_NAME = "THUMB_DIR_NAME";
	private static final String THUMBNAIL_WIDTH = "THUMBNAIL_WIDTH";
	private static final String THUMBNAIL_HEIGHT = "THUMBNAIL_HEIGHT";
	private static final String IMAGE_MAX_SIZE = "IMAGE_MAX_SIZE";
	private static final String ALLOW_SUB_DIRS = "ALLOW_SUB_DIRS";
	private static final String CREATE_VIDEO = "createVideoThumbnail";
	private static final String CREATE_IMAGE = "createImageThumbnail";
	private static final String CREATE_ALBUM = "createAlbumThumbnails";
	private static final String VALID_EXT = ".jpg";

	private String _url;
	private String _thumbDirName;
	private Boolean _allowSubDirs;
	private int _thumbHeight;
	private int _thumbWidth;
	private int _imageMaxSize;

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action        The action to execute.
     * @param args          JSONArry of arguments for the plugin.
     * @param callbackId    The callback id used when calling back into JavaScript.
     * @return              A PluginResult object with a status and message.
     */
    public PluginResult execute(String action, JSONArray args, String callbackId) {
		if (!validArgs(args)) {			
			Log.e(LOG_TAG, "Invalid Arguments Specified!");
			return new PluginResult(PluginResult.Status.ERROR);
		}

		if (!parseArgs(args)) {			
			Log.e(LOG_TAG, "Error parsing JSON args");
			return new PluginResult(PluginResult.Status.ERROR);
		}

		try {		
			HashMap<String, String> thumbs = new HashMap<String, String>();
			if (action.equals(CREATE_VIDEO)) thumbs = createVideoThumbnail();
			else if (action.equals(CREATE_IMAGE)) thumbs = createImageThumbnail();
			else if (action.equals(CREATE_ALBUM)) thumbs = createAlbumThumbnails();
			else {
				Log.e(LOG_TAG, "Invalid action supplied to plugin!");
				return new PluginResult(PluginResult.Status.INVALID_ACTION);
			}

			return new PluginResult(PluginResult.Status.OK, new JSONObject(thumbs));
		}
		catch (Exception e){
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			Log.e(LOG_TAG, "Exception - " + e.toString() + 
						" - Message: " + e.getMessage() +
						" - StackTrace: " + sw.toString());
			return new PluginResult(PluginResult.Status.ERROR);
		}
    }

	private HashMap<String, String> createVideoThumbnail(){
		throw new java.lang.UnsupportedOperationException();
	}

	private HashMap<String, String> createImageThumbnail(){
		HashMap<String, String> thumbs = new HashMap<String, String>();
		thumbs.put(_url, createThumbnail(new File(_url)));
		return thumbs;
	}

	private HashMap<String, String> createAlbumThumbnails(){
		Log.i(LOG_TAG, "Creating thumbnails from album - THIS IS SLOW!");
		HashMap<String, String> thumbs = new HashMap<String, String>();
		File album = new File(_url);
		if (album.exists()){
			for (File item : album.listFiles()){
				if (item.getPath().contains(_thumbDirName) ||
				 	!item.getName().contains(VALID_EXT) ){
					continue;
				}				
				if (item.isDirectory() && !_allowSubDirs){
					continue;
				}

				thumbs.put(item.getPath(), createThumbnail(item));
			}
		}
		return thumbs;
	}

	private String createThumbnail(File fullItem){
		try {
			File thumbItem = createThumbnailFile(fullItem.getPath());
			if (!thumbItem.exists()){
				FileOutputStream out = new FileOutputStream(thumbItem);
				Bitmap bitmap = decodeMediaFile(fullItem);
				if (bitmap != null){
					bitmap.compress(Bitmap.CompressFormat.JPEG, 55, out);					
				} else {
					Log.i(LOG_TAG, "Could not create thumbnail for '" + fullItem.getPath() + "'");
					return "";
				}
			}
			return thumbItem.getPath();
		}
		catch (FileNotFoundException e){	    	
			Log.e(LOG_TAG, "FileNotFound: Error creating thumbnail - " + e.toString());
			// Need better return handling!
			return "";
		}
	}

	// Creates the thumbnail file and any directories in the path that are missing.
	private File createThumbnailFile(String mediaUrl){		
		Log.i(LOG_TAG, "Creating thumbnail for media item: " + mediaUrl);
		String fileName = mediaUrl.substring(mediaUrl.lastIndexOf("/") + 1);	
		String newThumbPath = mediaUrl.substring(0, mediaUrl.lastIndexOf("/")) 
									+ "/" + _thumbDirName + "/";

		File thumbFile = new File(newThumbPath + fileName);
		thumbFile.getParentFile().mkdirs();
		return thumbFile;
	}

	private Bitmap decodeMediaFile(File mediaFile){
	    Bitmap bmp = null;
	    try {
	        //Decode image size
	        BitmapFactory.Options options = new BitmapFactory.Options();
	        options.inJustDecodeBounds = true;

	        FileInputStream fis = new FileInputStream(mediaFile);
	        BitmapFactory.decodeStream(fis, null, options);
	        fis.close();

	        int scale = 1;
	        if (options.outHeight > _imageMaxSize || options.outWidth > _imageMaxSize) {
	            scale = (int)Math.pow(2, (int) Math.round(Math.log(_imageMaxSize / 
	               (double) Math.max(options.outHeight, options.outWidth)) / Math.log(0.5)));
	        }

	        //Decode with inSampleSize
	        BitmapFactory.Options finalOptions = new BitmapFactory.Options();
	        finalOptions.inSampleSize = scale;
	        fis = new FileInputStream(mediaFile);
	        bmp = BitmapFactory.decodeStream(fis, null, finalOptions);
	        fis.close();
	    } 
	    catch (Exception e) {
	    	Log.e(LOG_TAG, "Error creating bitmap during decode: " + e.toString());
	    }
	    return bmp;
	}

	// Parses args. Basic at the moment, but can expand this.
	private boolean parseArgs(JSONArray args){
		try {
			_url = args.getString(0);

			JSONObject config = (JSONObject) args.getJSONObject(1);
			_thumbDirName = config.getString(THUMB_DIR_NAME);
			_imageMaxSize = config.getInt(IMAGE_MAX_SIZE);
			_thumbWidth = config.getInt(THUMBNAIL_WIDTH);
			_thumbHeight = config.getInt(THUMBNAIL_HEIGHT);
			_allowSubDirs = config.getBoolean(ALLOW_SUB_DIRS);

			return true;
		}
		catch (JSONException e) {
			Log.e(LOG_TAG, "JSONException - " + e.toString());
			return false;
		}
	}	

	// Checks that args are valid. Basic at the moment, but can expand this.
	private boolean validArgs(JSONArray args){
		return (args == null || args.length() < 2) ? false : true;
	}
}