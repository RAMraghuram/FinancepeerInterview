import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ImagePickerResponse, launchCamera} from 'react-native-image-picker';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const camera = async () => {
  const result = await launchCamera({
    mediaType: 'photo',
  });
  return result;
};

const requestCameraPermission = () => {
  request(
    Platform?.OS === 'ios'
      ? PERMISSIONS.IOS.CAMERA
      : PERMISSIONS.ANDROID.CAMERA,
  )
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch(error => {
      console.log('error', error);
    });
};

const CameraScreen = ({navigation}) => {
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const [picture, setPicture] = useState<ImagePickerResponse | undefined>();
  return (
    <SafeAreaView style={styles?.mainContainerStyle}>
      <TouchableOpacity
        style={styles?.buttonStyle}
        onPress={async () => {
          const result = await camera();
          setPicture(result);
        }}>
        <Text style={styles?.buttonTitleStyle}>Launch Camera</Text>
      </TouchableOpacity>
      <View style={styles?.containerStyle}>
        {picture ? (
          <Image
            source={{uri: picture?.assets?.[0]?.uri}}
            style={styles?.imageStyle}
          />
        ) : (
          <Text style={styles?.textStyle}>
            Click on Camera button to access Camera
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  mainContainerStyle: {flex: 1, marginHorizontal: 16},
  buttonStyle: {
    backgroundColor: '#00ffb3',
    width: 150,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 20,
  },
  buttonTitleStyle: {textAlign: 'center', color: '#000000', fontWeight: '600'},
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    bottom: 10,
  },
  containerStyle: {flex: 1, justifyContent: 'center'},
  textStyle: {textAlign: 'center'},
});
