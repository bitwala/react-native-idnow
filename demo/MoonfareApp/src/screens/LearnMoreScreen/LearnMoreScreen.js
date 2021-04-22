import React from 'react';
import {ViewPager, withStyles} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import styles from './LearnMoreScreen.style';
import SliderScreen from './SliderScreenComponent';
import images from '../../constants/images';
import {View} from 'react-native';
import Text from '../../components/Text';
import GoToAppComponent from './GoToAppComponent';

const propTypes = {
  eva: PropTypes.shape({
    style: PropTypes.object,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const data = [
  {
    key: '1',
    image: images.confidential,
    icon: '',
    title: 'Access to confidential Information',
    description:
      'You can view current and upcoming funds and be among the first to learn about new strategies coming to the platform. Now available are fund track records, information on why we invest in a particular fund and what are some of the portfolio companies of the fund manager. We also provide exclusive access to our funds’ data rooms and documents.',
  },
  {
    key: '2',
    image: images.premium,
    icon: '',
    title: 'Premium content',
    description:
      'In partnership with our fund managers, we create premium content including webinars and case studies that provide an opportunity for our investors to get to know a fund’s team, understand their investment strategy,  and actively participate in Q&A sessions. You will also be invited to exclusive events.',
  },
  {
    key: '3',
    image: images.allocation,
    icon: '',
    title: 'Requesting allocations',
    description:
      'Once you choose the right investment opportunities on the platform, you can request allocations into the corresponding funds or portfolios.',
  },
];

const LearnMoreComponent = ({navigation, eva}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const shouldLoadComponent = index => index === selectedIndex;

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={index => setSelectedIndex(index)}>
      {data.map(each => (
        <SliderScreen
          key={each.key}
          icon={each.icon}
          description={each.description}
          image={each.image}
          title={each.title}
        />
      ))}
      <View>
        <GoToAppComponent navigation={navigation} eva={eva} />
      </View>
    </ViewPager>
  );
};

LearnMoreComponent.propTypes = propTypes;
const LearnMoreScreen = withStyles(LearnMoreComponent, styles);

export default LearnMoreScreen;
