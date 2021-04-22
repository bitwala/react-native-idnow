import React, {useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native';
import {withStyles} from '@ui-kitten/components';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import styles from './LoginScreen.style';
import {Email, Password} from '../../helpers/formHelper';
import TextInputField from '../../components/TextInputField';
import images from '../../constants/images';

import i18n from '../../i18n';
import LoaderButton from '../../components/LoaderButton';
import {ScrollView} from 'react-native-gesture-handler';
import CustomText from '../../components/Text';
import axios from 'axios';

import {signIn} from '@okta/okta-react-native';

const {Form} = t.form;
const LoginForm = t.struct({
  email: Email,
  password: Password,
});

const propTypes = {
  eva: PropTypes.shape({
    style: PropTypes.object,
  }).isRequired,
  onLogin: PropTypes.func,
  isLoggingIn: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  resetAuth: PropTypes.func,
  installationUrl: PropTypes.string,
};

const defaultProps = {
  onLogin: () => {},
  isLoggingIn: false,
};

const LoginScreenComponent = ({navigation, eva}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [values, setValues] = useState({
    // My Okta credentials
    email: 'nan@gmail.com',
    password: '!qaz2wsx3edC',
  });
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    fields: {
      email: {
        placeholder: '',
        template: props => <TextInputField {...props} />,
        keyboardType: 'email-address',
        error: i18n.t('LOGIN.EMAIL_ERROR'),

        autoCompleteType: false,
        autoCorrect: false,
        config: {
          label: i18n.t('LOGIN.EMAIL'),
        },
        autoCapitalize: 'none',
      },
      password: {
        placeholder: '',
        template: props => <TextInputField {...props} />,
        keyboardType: 'default',
        autoCapitalize: 'none',
        autoCompleteType: false,
        autoCorrect: false,
        error: i18n.t('LOGIN.PASSWORD_ERROR'),
        config: {
          label: i18n.t('LOGIN.PASSWORD'),
        },
        secureTextEntry: true,
      },
    },
  };

  const onChange = value => {
    setValues(value);
  };

  const {navigate} = navigation;
  const {style} = eva;

  const onPress = async () => {
    let user;
    try {
      setIsLoading(true);
      const result1 = await signIn({
        username: values.email,
        password: values.password,
      });
      user = await axios.get(
        // @TODO This is my local ip, we need to consider deploying BE to remote env and change the URL here accordingly

        'http://192.168.178.21:3001/api/v1/context/auth/user',
        {headers: {Authorization: result1.access_token}},
      );
      navigate()
    } catch (e) {
      console.log({e});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.keyboardView}>
      <ScrollView
        style={{
          height: Dimensions.get('window').height,
        }}>
        <View style={style.logoView}>
          <Image style={style.logo} source={images.moonfareLogoDarkblue} />
        </View>
        <View style={style.titleView}>
          <CustomText style={style.titleText}>
            {i18n.t('LOGIN.TITLE')}
          </CustomText>
        </View>

        <View style={style.contentView}>
          <View style={style.formView}>
            <Form
              ref={inputRef}
              type={LoginForm}
              options={options}
              value={values}
              onChange={value => onChange(value)}
            />
            <TouchableOpacity
              style={style.forgotView}
              onPress={() => navigate('ResetPassword')}>
              <CustomText style={style.textStyle}>
                {i18n.t('LOGIN.FORGOT_PASSWORD')}
              </CustomText>
            </TouchableOpacity>
            <View style={style.loginButtonView}>
              <LoaderButton
                style={style.loginButton}
                loading={isLoading}
                textStyle={style.buttonTextStyle}
                onPress={() => {
                  onPress();
                }}
                size="large"
                text={i18n.t('LOGIN.LOGIN')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

LoginScreenComponent.propTypes = propTypes;
LoginScreenComponent.defaultProps = defaultProps;
const LoginScreen = withStyles(LoginScreenComponent, styles);

export default LoginScreen;
