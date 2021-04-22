import React from 'react';
import {Image, View} from 'react-native';
import {Card, Text, withStyles} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import styles from './LearnMoreScreen.style';
import CustomText from '../../components/Text';

const propTypes = {
  eva: PropTypes.shape({
    style: PropTypes.object,
  }).isRequired,
  image: PropTypes.any.isRequired,
  icon: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};

const SliderScreenComponent = ({image, icon, title, description, key, eva}) => {
  const {style} = eva;
  return (
    <View key={key}>
      <View style={style.logoView}>
        <Image style={style.logo} source={image} />
      </View>
      <Text>{icon}</Text>

      <Card>
        <View style={style.titleView}>
          <CustomText style={style.titleText} weight={500}>
            {title}
          </CustomText>
        </View>
        <View style={style.titleView}>
          <CustomText style={style.successTitleText}>{description}</CustomText>
        </View>
      </Card>
    </View>
  );
};

SliderScreenComponent.propTypes = propTypes;
const SliderScreen = withStyles(SliderScreenComponent, styles);

export default SliderScreen;
