import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from '@ui-kitten/components';

class CustomText extends Component {
  static propTypes = {
    weight: PropTypes.oneOf(['300', '400', '500', '600', '700', '800', '900']),
    locale: PropTypes.string,
  };

  findWeightVariant = props => {
    const flatStyle = StyleSheet.flatten(props.style || {});
    return flatStyle.fontWeight || '400';
  };

  render() {
    const weightVariant = this.findWeightVariant(this.props);

    return <Text {...this.props} weight={weightVariant} />;
  }
}

export default CustomText;
