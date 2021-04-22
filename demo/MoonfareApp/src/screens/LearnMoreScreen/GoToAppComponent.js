import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {withStyles} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import styles from './GoToAppComponent.style';
import CustomText from '../../components/Text';
import images from '../../constants/images';
import i18n from '../../i18n';
import LoaderButton from '../../components/LoaderButton';
import {ScrollView} from 'react-native-gesture-handler';

const propTypes = {
  eva: PropTypes.shape({
    style: PropTypes.object,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const GoToAppComponent = ({navigation, eva}) => {
  const {style} = eva;

  const onPress = () => {
    // The end
  };

  return (
    <View>
      <View style={style.logoView}>
        <Image style={style.logo} source={images.iconInvest} />
      </View>

      <View style={style.titleView}>
        <CustomText style={style.titleText} weight={500}>
          {i18n.t('GOTO_APP.START')}
        </CustomText>
      </View>

      <View style={style.titleView}>
        <CustomText style={style.successTitleText}>
          {i18n.t('GOTO_APP.PLEASE')}
        </CustomText>
        <TouchableOpacity style={style.forgotView}>
          <CustomText>app.moonfare.com</CustomText>
        </TouchableOpacity>
      </View>

      <View style={style.titleView}>
        <CustomText style={style.successTitleText}>
          {i18n.t('GOTO_APP.APP_DESCRIPTION')}
        </CustomText>
      </View>

      <View style={style.learnMoreButtonView}>
        <LoaderButton
          style={style.learnMoreButton}
          textStyle={style.textStyle}
          onPress={() => onPress()}
          size="large"
          text={i18n.t('GOTO_APP.APP')}
        />
      </View>
    </View>
  );
};

GoToAppComponent.propTypes = propTypes;
const GoToAppScreen = withStyles(GoToAppComponent, styles);

export default GoToAppScreen;
