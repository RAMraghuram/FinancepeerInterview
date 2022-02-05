import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const {width} = Dimensions?.get('window');

const image = require('../resources/images/background.jpeg');
const imageArray = [
  {
    key: '1',
    name: require('../resources/images/image1.png'),
  },
  {
    key: '2',
    name: require('../resources/images/image2.png'),
  },
  {
    key: '3',
    name: require('../resources/images/image3.jpeg'),
  },
  {
    key: '4',
    name: require('../resources/images/image4.jpeg'),
  },
  {
    key: '5',
    name: require('../resources/images/image5.jpeg'),
  },
];

const HomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={image}
      resizeMode="stretch"
      style={styles?.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate={0}
        snapToAlignment="center"
        style={StyleSheet?.absoluteFill}
        snapToInterval={width}>
        {imageArray.map(({key, name}) => {
          return (
            <View key={key}>
              <Image source={name} style={styles?.imageStyle} />
            </View>
          );
        })}
      </ScrollView>
      <Text style={styles?.textStyle}>Swipe images horizontally</Text>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  textStyle: {textAlign: 'center', color: '#0521bd'},
  imageStyle: {
    height: 200,
    width: width,
  },
});
