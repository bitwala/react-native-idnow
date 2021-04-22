import {Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default theme => ({
  keyboardView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme['background-basic-color-1'],
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height * 0.07,
  },
  logo: {
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.4,
    resizeMode: 'contain',
  },
  titleView: {
    marginTop: Dimensions.get('window').height * 0.01,
    padding: 20,
  },
  titleText: {
    width: '100%',
    textAlign: 'center',
    padding: 20,
    fontSize: theme['font-size-extra-large'],
    fontWeight: theme['font-bold'],
  },
  successTitleText: {
    width: '100%',
    textAlign: 'center',
    padding: 10,
    fontSize: theme['font-size-large'],
    fontWeight: theme['font-thin'],
  },

  learnMoreButtonView: {
    paddingTop: 16,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  learnMoreButton: {
    flex: 1,
    borderRadius: 20,
  },

  textStyle: {
    fontSize: theme['font-size-extra-small'],
    color: theme['text-hint-color'],
    fontWeight: theme['font-medium'],
  },
});
