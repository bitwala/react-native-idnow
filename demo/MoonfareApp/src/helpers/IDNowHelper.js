import {IDnowManager} from 'react-native-idnow';

export const startVideoVerification = async options => {
  try {
    const resp = await IDnowManager.startVideoIdent(options);
    console.warn('==== resp', resp);
  } catch (e) {
    console.warn('==== e', e);
  }
};
