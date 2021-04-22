import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Image, Dimensions, SafeAreaView} from 'react-native';
import {withStyles} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import styles from './IdentificationFailedScreen.style';
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const IdentificationFailedComponent = ({navigation, eva}) => {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(doLogin());
  };

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
            {i18n.t('IDENTIFICATION_FAILED.FAILED')}
          </CustomText>
        </View>

        <View style={style.titleView}>
          <CustomText style={style.successTitleText}>
            {i18n.t('IDENTIFICATION_COMPLETE.SUCCESS_MESSAGE')}
          </CustomText>
        </View>

        <View style={style.titleView}>
          <CustomText style={style.successTitleText}>
            {i18n.t('IDENTIFICATION_COMPLETE.SUCCESS_MESSAGE')}
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
            text={i18n.t('IDENTIFICATION_FAILED.TRY_AGAIN')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

IdentificationFailedComponent.propTypes = propTypes;
const IdentificationFailedScreen = withStyles(
  IdentificationFailedComponent,
  styles,
);

export default IdentificationFailedScreen;
