import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { withStyles } from '@ui-kitten/components';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import styles from './IdNowCodeScreen.style';
import { Name } from '../../helpers/formHelper';
import TextInputField from '../../components/TextInputField';
import images from '../../constants/images';

import i18n from '../../i18n';
import LoaderButton from '../../components/LoaderButton';
import { ScrollView } from 'react-native-gesture-handler';
import CustomText from '../../components/Text';
import { doLogin, saveIdentCode } from '../../actions/auth';
import Logo from '../../components/Logo';

const { Form } = t.form;
const LoginForm = t.struct({
  code: Name,
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
  onLogin: () => {
  },
  isLoggingIn: false,
};

const IdNowCodeScreenComponent = ({ navigation, eva }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [values, setValues] = useState({
    code: '',
  });

  const options = {
    fields: {
      code: {
        placeholder: 'TST-XXXX',
        template: props => <TextInputField {...props} />,
        keyboardType: 'default',
        error: i18n.t('IDENTIFICATION.WRONG_CODE'),
        autoCompleteType: false,
        autoCorrect: false,
        textTransform: 'uppercase',
        textAlign: 'center',
        align: 'center',
        autoCapitalize: 'none',
        config: {
          label: '',
        },
        style: eva.style.codeInput,
      },
    },
  };

  const isLoggingIn = useSelector(state => state.auth.isLoggingIn);

  const onChange = value => {
    setValues(value);
  };

  const { navigate } = navigation;
  const { style } = eva;

  const onPress = () => {
    const value = inputRef.current.getValue();
    if (value) {
      const { code } = values;
      dispatch(saveIdentCode({ code }));
      navigate('IdentificationScreen');
    }
  };

  return (
    <SafeAreaView style={style.keyboardView}>
      <ScrollView
        style={{
          height: Dimensions.get('window').height,
        }}>
        <Logo />
        <View style={style.titleView}>
          <CustomText style={style.titleText}>
            {i18n.t('IDENTIFICATION.TITLE')}
          </CustomText>
        </View>

        <View style={style.contentView}>
          <View style={style.formView}>
            <CustomText style={style.textStyle}>
              {i18n.t('IDENTIFICATION.INSTRUCTION')}
            </CustomText>
          </View>
          <View style={style.formView}>
            <Form
              ref={inputRef}
              type={LoginForm}
              options={options}
              value={values}
              onChange={value => onChange(value)}
            />
            <View style={style.loginButtonView}>
              <LoaderButton
                style={style.loginButton}
                loading={isLoggingIn}
                textStyle={style.buttonTextStyle}
                onPress={() => onPress()}
                size='large'
                text={i18n.t('IDENTIFICATION.CONFIRM')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

IdNowCodeScreenComponent.propTypes = propTypes;
IdNowCodeScreenComponent.defaultProps = defaultProps;
const IdNowCodeScreen = withStyles(IdNowCodeScreenComponent, styles);

export default IdNowCodeScreen;
