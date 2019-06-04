
import { NativeModules } from 'react-native';

const { RNIdnow } = NativeModules;

export const defaultOptions = {
  companyId: '',
  showVideoOverviewCheck: true,
  showErrorSuccessScreen: true,
  transactionToken: 'TST-XXXXX',
  // environment: 'LIVE', no need to force to use a specific env; Default is to determine this by the token used
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
