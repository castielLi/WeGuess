package com.weguess;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.reactnativenavigation.NavigationReactPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.remobile.file.RCTFilePackage;
import com.imagepicker.ImagePickerPackage;
import com.bubblemessage.BubbleMessagePackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.rnfs.RNFSPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.fabricio.vergal.RNWorkers.RNWorkersPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.reactlibrary.RNUUIDGeneratorPackage;
import com.benwixen.rnfilesystem.RNFileSystemPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.pgsqlite.SQLitePluginPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNNetworkInfoPackage(),
            new NavigationReactPackage(),
            new RNFetchBlobPackage(),
            new RCTFilePackage(),
            new ImagePickerPackage(),
            new BubbleMessagePackage(),
            new RNFSPackage(),
            new ReactNativeAudioPackage(),
            new RNSoundPackage(),
            new RNWorkersPackage(),
            new VectorIconsPackage(),
            new ReactNativeLocalizationPackage(),
            new ReactNativeContacts(),
            new RNUUIDGeneratorPackage(),
            new RNFileSystemPackage(),
            new SQLitePluginPackage(),
            new RCTCameraPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
