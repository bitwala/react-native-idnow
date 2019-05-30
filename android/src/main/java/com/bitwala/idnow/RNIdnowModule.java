
package com.bitwala.idnow;

import android.app.Activity;
import android.widget.Toast;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.BaseActivityEventListener;

import java.util.HashMap;

import de.idnow.sdk.IDnowSDK;

public class RNIdnowModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private Promise mIdnowPromise;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        public void onActivityResult(int requestCode, int resultCode, Intent data) {
            Toast.makeText(reactContext, "requestCode: " + requestCode + ", resultCode: " + resultCode, Toast.LENGTH_LONG).show();
            // TODO: use mIdnowPromise here
            if (requestCode == IDnowSDK.REQUEST_ID_NOW_SDK) {
                StringBuilder toastText;

                switch (resultCode) {

                    case IDnowSDK.RESULT_CODE_SUCCESS:
                        toastText = new StringBuilder("Identification performed. ");
                        if (null != data) {
                            toastText.append(data.getStringExtra(IDnowSDK.RESULT_DATA_TRANSACTION_TOKEN));
                        }
                        break;

                    case IDnowSDK.RESULT_CODE_CANCEL:
                        toastText = new StringBuilder("Identification canceled. ");
                        if (null != data) {
                            toastText.append(data.getStringExtra(IDnowSDK.RESULT_DATA_ERROR));
                        }
                        break;

                    case IDnowSDK.RESULT_CODE_FAILED:
                        toastText = new StringBuilder("Identification failed. ");
                        if (null != data) {
                            toastText.append(data.getStringExtra(IDnowSDK.RESULT_DATA_ERROR));
                        }
                        break;

                    default:
                        toastText = new StringBuilder("Result Code: ");
                        toastText.append(resultCode);
                }

                Toast.makeText(reactContext, toastText.toString(), Toast.LENGTH_LONG).show();
            }
        }
    };

    public RNIdnowModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "RNIdnow";
    }

    private IDnowSDK.Server getServer(String environment) {
        final HashMap<String, IDnowSDK.Server> environmentServerMap = new HashMap();

        environmentServerMap.put("DEV", IDnowSDK.Server.DEV);
        environmentServerMap.put("DEV2", IDnowSDK.Server.DEV2);
        environmentServerMap.put("TEST", IDnowSDK.Server.TEST);
        environmentServerMap.put("TEST1", IDnowSDK.Server.TEST1);
        environmentServerMap.put("TEST2", IDnowSDK.Server.TEST2);
        environmentServerMap.put("TEST3", IDnowSDK.Server.TEST3);
        environmentServerMap.put("LIVE", IDnowSDK.Server.LIVE);
        environmentServerMap.put("CUSTOM", IDnowSDK.Server.CUSTOM);
        environmentServerMap.put("INT", IDnowSDK.Server.INT);
        environmentServerMap.put("DV3", IDnowSDK.Server.DV3);
        environmentServerMap.put("DV4", IDnowSDK.Server.DV4);

        return environmentServerMap.get(environment);
    }

    @ReactMethod
    public void startVideoIdent(final ReadableMap options, final Promise promise) {
        Activity currentActivity = getCurrentActivity();
        mIdnowPromise = promise;

        // Toast.makeText(reactContext, options.getString("environment") + " ---- " + options.getString("environment").equals("CUSTOM") + " --- " + options.toString(), Toast.LENGTH_LONG).show();
        try {
            IDnowSDK.getInstance().initialize(currentActivity, options.getString("companyId"));
            IDnowSDK.setShowVideoOverviewCheck(options.getBoolean("showVideoOverviewCheck"), reactContext);
            IDnowSDK.setShowErrorSuccessScreen(options.getBoolean("showErrorSuccessScreen"), reactContext);

            String environment = options.getString("environment");

            IDnowSDK.setEnvironment(this.getServer(environment)); // default is "LIVE"

            if (environment.equals("CUSTOM")) {
                IDnowSDK.setApiHost(options.getString("apiHost"), reactContext); // require if env is "CUSTOM"
                IDnowSDK.setWebHost(options.getString("webHost"), reactContext); // require if env is "CUSTOM"
                IDnowSDK.setWebsocketHost(options.getString("websocketHost"), reactContext); // require if env is "CUSTOM"

                if (options.hasKey("videoHost")) {
                    IDnowSDK.setVideoHost(options.getString("videoHost"), reactContext);
                }
                if (options.hasKey("stunHost")) {
                    IDnowSDK.setStunHost(options.getString("stunHost"), reactContext);
                }
                if (options.hasKey("stunPort")) {
                    IDnowSDK.setStunPort(options.getInt("stunPort"), reactContext);
                }
            }

            IDnowSDK.setTransactionToken(options.getString("transactionToken"), reactContext);

            IDnowSDK.getInstance().start(IDnowSDK.getTransactionToken(reactContext));

//          mIdnowPromise.resolve(true);
        } catch (Exception e) {
            mIdnowPromise.reject("ERR_UNEXPECTED_EXCEPTION", e);
            mIdnowPromise = null;
        }
    }


    /**
     * Callback from the SDK
     */
//    @ReactMethod
//    public void onActivityResult(int requestCode, int resultCode, Intent data) {
//        if (requestCode == IDnowSDK.REQUEST_ID_NOW_SDK) {
//            StringBuilder toastText;
//
//            switch (resultCode) {
//
//                case IDnowSDK.RESULT_CODE_SUCCESS:
//                    toastText = new StringBuilder("Identification performed. ");
//                    if (null != data) {
//                        toastText.append(data.getStringExtra(IDnowSDK.RESULT_DATA_TRANSACTION_TOKEN));
//                    }
//                    mIdnowPromise.resolve(true);
//                    break;
//
//                case IDnowSDK.RESULT_CODE_CANCEL:
//                    toastText = new StringBuilder("Identification canceled. ");
//                    if (null != data) {
//                        toastText.append(data.getStringExtra(IDnowSDK.RESULT_DATA_ERROR));
//                    }
//                    mIdnowPromise.reject("CANCEL", "Identification canceled");
//                    break;
//
//                case IDnowSDK.RESULT_CODE_FAILED:
//                    toastText = new StringBuilder("Identification failed. ");
//                    if (null != data) {
//                        toastText.append(data.getStringExtra(IDnowSDK.RESULT_DATA_ERROR));
//                    }
//                    mIdnowPromise.reject("FAIL", "Identification failed");
//                    break;
//
//                default:
//                    toastText = new StringBuilder("Result Code: ");
//                    toastText.append(resultCode);
//                    mIdnowPromise.reject("INTERNAL_ERROR", "Internal error");
//            }
//            mIdnowPromise = null;
//            Toast.makeText(reactContext, toastText.toString(), Toast.LENGTH_LONG).show();
//        }
//    }
}