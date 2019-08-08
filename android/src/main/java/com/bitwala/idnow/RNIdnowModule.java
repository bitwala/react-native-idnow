
package com.bitwala.idnow;

import android.app.Activity;
import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;

//import java.util.HashMap;

import de.idnow.sdk.IDnowSDK;

public class RNIdnowModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private Promise idnowPromise;

    private final ActivityEventListener idnowActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            switch (resultCode) {

                case IDnowSDK.RESULT_CODE_SUCCESS:
                    idnowPromise.resolve(true);
                    break;

                case IDnowSDK.RESULT_CODE_CANCEL:
                    idnowPromise.reject("CANCELLED", "Identification canceled");
                    break;

                case IDnowSDK.RESULT_CODE_FAILED:
                    idnowPromise.reject("FAILED", "Identification failed");
                    break;

                default:
                    idnowPromise.reject("INTERNAL_ERROR", "Internal error: " + resultCode);
            }
        }
    };

    public RNIdnowModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(idnowActivityEventListener);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNIdnow";
    }

    // private IDnowSDK.Server getServer(String environment) {
    //     final HashMap<String, IDnowSDK.Server> environmentServerMap = new HashMap();

    //     environmentServerMap.put("DEV", IDnowSDK.Server.DEV);
    //     environmentServerMap.put("DEV2", IDnowSDK.Server.DEV2);
    //     environmentServerMap.put("TEST", IDnowSDK.Server.TEST);
    //     environmentServerMap.put("TEST1", IDnowSDK.Server.TEST1);
    //     environmentServerMap.put("TEST2", IDnowSDK.Server.TEST2);
    //     environmentServerMap.put("TEST3", IDnowSDK.Server.TEST3);
    //     environmentServerMap.put("LIVE", IDnowSDK.Server.LIVE);
    //     environmentServerMap.put("CUSTOM", IDnowSDK.Server.CUSTOM);
    //     environmentServerMap.put("INT", IDnowSDK.Server.INT);
    //     environmentServerMap.put("DV3", IDnowSDK.Server.DV3);
    //     environmentServerMap.put("DV4", IDnowSDK.Server.DV4);

    //     return environmentServerMap.get(environment);
    // }

    @ReactMethod
    public void startVideoIdent(final ReadableMap options, final Promise promise) {
        Activity currentActivity = getCurrentActivity();
        idnowPromise = promise;

        try {
            IDnowSDK.getInstance().initialize(currentActivity, options.getString("companyId"));
            IDnowSDK.setShowVideoOverviewCheck(options.getBoolean("showVideoOverviewCheck"), reactContext);
            IDnowSDK.setShowErrorSuccessScreen(options.getBoolean("showErrorSuccessScreen"), reactContext);

            // String environment = options.getString("environment");

            // IDnowSDK.setEnvironment(this.getServer(environment)); // no need to force to use a specific env; Default is to determine this by the token used

            // if (environment.equals("CUSTOM")) {
            //     IDnowSDK.setEnvironment(IDnowSDK.Server.CUSTOM);
            //     IDnowSDK.setApiHost(options.getString("apiHost"), reactContext); // require if env is "CUSTOM"
            //     IDnowSDK.setWebHost(options.getString("webHost"), reactContext); // require if env is "CUSTOM"
            //     IDnowSDK.setWebsocketHost(options.getString("websocketHost"), reactContext); // require if env is "CUSTOM"

            //     if (options.hasKey("videoHost")) {
            //         IDnowSDK.setVideoHost(options.getString("videoHost"), reactContext);
            //     }
            //     if (options.hasKey("stunHost")) {
            //         IDnowSDK.setStunHost(options.getString("stunHost"), reactContext);
            //     }
            //     if (options.hasKey("stunPort")) {
            //         IDnowSDK.setStunPort(options.getInt("stunPort"), reactContext);
            //     }
            // }

            IDnowSDK.setTransactionToken(options.getString("transactionToken"), reactContext);

            IDnowSDK.getInstance().start(IDnowSDK.getTransactionToken(reactContext));
        } catch (Exception e) {
            promise.reject("ERR_UNEXPECTED_EXCEPTION", e);
        }
    }
}