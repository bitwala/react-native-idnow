import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {View, Image, Dimensions, SafeAreaView} from 'react-native';
import {withStyles} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import styles from './IdentificationCompleteScreen.style';
import images from '../../constants/images';

import i18n from '../../i18n';
import LoaderButton from '../../components/LoaderButton';
import {ScrollView} from 'react-native-gesture-handler';
import CustomText from '../../components/Text';
import {doLogin} from '../../actions/auth';

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

const IdentificationCompleteComponent = ({navigation, eva}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [values, setValues] = useState({
    identId: '',
  });

  const onChange = value => {
    setValues(value);
  };

  const onPress = () => {
    const value = inputRef.current.getValue();
    if (value) {
      const {email, password} = values;
      dispatch(doLogin({email, password}));
    }
  };

  const {navigate} = navigation;
  const {style} = eva;

  return (
    <SafeAreaView style={style.keyboardView}>
      <ScrollView
        style={{
          height: Dimensions.get('window').height,
        }}>
        <View style={style.logoView}>
          <Image style={style.logo} source={images.appLogo} />
        </View>

        <View style={style.titleView}>
          <CustomText style={style.titleText} weight={500}>
            {i18n.t('IDENTIFICATION_COMPLETE.IDENTIFICATION')}
          </CustomText>
        </View>

        <View style={style.titleView}>
          <CustomText style={style.successTitleText}>
            {i18n.t('IDENTIFICATION_COMPLETE.SUCCESS_MESSAGE')}
          </CustomText>
        </View>

        <View style={style.learnMoreButtonView}>
          <LoaderButton
            style={style.learnMoreButton}
            textStyle={style.textStyle}
            onPress={() => onPress()}
            size="large"
            text={i18n.t('IDENTIFICATION_COMPLETE.LEARN_MORE')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

IdentificationCompleteComponent.propTypes = propTypes;
IdentificationCompleteComponent.defaultProps = defaultProps;
const IdentificationCompleteScreen = withStyles(
  IdentificationCompleteComponent,
  styles,
);

export default IdentificationCompleteScreen;
