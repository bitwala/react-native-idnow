import {LOGIN_ERROR, LOGIN_SUCCESS} from '../constants/actions';
import I18n from '../i18n';
import {showToast} from '../helpers/ToastHelper';

export const doVerification = () => async dispatch => {
  try {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        type: 'User',
        attributes: {
          countryOfResidence: 'DE',
          identificationURL:
            'https://go.test.idnow.de/moonfaresaas/identifications/TST-LEMQV/webcam',
          sessionId: 'TST-LEMQV',
          provider: 'IDNOW',
        },
      },
    });
  } catch (error) {
    if (error && error.status === 401) {
      showToast({message: I18n.t('ERRORS.AUTH')});
    }
    dispatch({type: LOGIN_ERROR, payload: error});
  }
};
