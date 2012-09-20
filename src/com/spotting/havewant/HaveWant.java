package com.spotting.havewant;

import android.os.Bundle;
import android.app.Activity;
import org.apache.cordova.*;
import android.view.Menu;
import android.view.MenuItem;
import android.support.v4.app.NavUtils;

public class HaveWant extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }

    
}
