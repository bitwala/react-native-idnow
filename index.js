
import { NativeModules } from 'react-native';

const { RNIdnow } = NativeModules;

export const defaultOptions = {
  companyId: '',
  showVideoOverviewCheck: false,
  showErrorSuccessScreen: false,
  transactionToken: 'TST-XXXXX',
  environment: 'LIVE',
  // apiHost: null,
  // webHost: null,
  // websocketHost: null,
  // videoHost: null,
  // stunHost: null,
  // stunPort: null,
}

export default { 
  startVideoIdent(options) {
    return RNIdnow.startVideoIdent({
      ...defaultOptions,
      ...options,
    });
  }
};
