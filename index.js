
import { NativeModules, processColor, Platform } from 'react-native';

const RNIdnow = Platform.select({
  ios: NativeModules.IDnowViewManager,
  android: NativeModules.RNIdnow,
});

export const defaultOptions = {
  companyId: '',
  showVideoOverviewCheck: true,
  showErrorSuccessScreen: false,
  transactionToken: 'TST-XXXXX',
  ignoreCompanyID: true,
  showIdentTokenOnCheckScreen: false,
  forceModalPresentation: false,
  // environment: 'LIVE', no need to force to use a specific env; Default is to determine this by the token used
  // apiHost: null,
  // webHost: null,
  // websocketHost: null,
  // videoHost: null,
  // stunHost: null,
  // stunPort: null,

  appearance: {
    // Adjust colors
    defaultTextColor: '#000',
    primaryBrandColor: 'blue',
    proceedButtonBackgroundColor: 'orange',
    proceedButtonTextColor: 'rgba(255, 255, 255, 1)',
    photoIdentRetakeButtonBackgroundColor: 'orange',
    photoIdentRetakeButtonTextColor: 'white',
    textFieldColor: 'grey',
    failureColor: 'red',
    successColor: 'cyan',
    
    // Adjust statusbar
    enableStatusBarStyleLightContent: false,
    
    // Adjust fonts
    fontNameRegular: 'HelveticaNeue',
    fontNameLight: 'HelveticaNeue-Ligth',
    fontNameMedium: 'HelveticaNeue-Bold',
  }
}

const prepareOptions = (options) => {
  // TODO refactor
  const appearanceOptions = {
    ...defaultOptions.appearance,
    ...options.appearance,
  };
  return {
    ...defaultOptions,
    ...options,
    appearance: {
      ...appearanceOptions,
      defaultTextColor: processColor(appearanceOptions.defaultTextColor),
      primaryBrandColor: processColor(appearanceOptions.primaryBrandColor),
      proceedButtonBackgroundColor: processColor(appearanceOptions.proceedButtonBackgroundColor),
      proceedButtonTextColor: processColor(appearanceOptions.proceedButtonTextColor),
      photoIdentRetakeButtonBackgroundColor: processColor(appearanceOptions.photoIdentRetakeButtonBackgroundColor),
      photoIdentRetakeButtonTextColor: processColor(appearanceOptions.photoIdentRetakeButtonTextColor),
      textFieldColor: processColor(appearanceOptions.textFieldColor),
      failureColor: processColor(appearanceOptions.failureColor),
      successColor: processColor(appearanceOptions.successColor),
    }
  };
}

const IDnowManager = { 
  startVideoIdent(options) {
    return new Promise((resolve, reject) => {
      RNIdnow.startVideoIdent(prepareOptions(options), (...args) => {
        const err = args[0];
        const resp = args[1];
        if (resp && resp.success) {
          return resolve(resp);
        } 
        return reject(err && err.message || 'Internal error');
      });
    });
  },
};

export { IDnowManager };
