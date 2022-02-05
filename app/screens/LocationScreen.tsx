import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import GetLocation, {Location} from 'react-native-get-location';

const requestLocationPermission = () => {
  request(
    Platform?.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
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

const location = async () => {
  try {
    const result = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });
    console.log('result', result);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
const LocationScreen = ({navigation}) => {
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const [loc, setLoc] = useState<Location>();
  return (
    <SafeAreaView style={styles?.mainContainerStyle}>
      <TouchableOpacity
        style={styles?.buttonStyle}
        onPress={async () => {
          const result = await location();
          setLoc(result);
        }}>
        <Text style={styles?.buttonTitleStyle}>Get Location</Text>
      </TouchableOpacity>
      <View style={styles?.containerStyle}>
        {loc ? (
          <View style={styles?.textContainerStyle}>
            <Text style={styles?.geoTextStyle}>
              Longitute : {loc?.longitude}
            </Text>
            <Text style={styles?.geoTextStyle}>Latitude : {loc?.latitude}</Text>
            <Text style={styles?.geoTextStyle}>Accuracy : {loc?.accuracy}</Text>
          </View>
        ) : (
          <Text style={styles?.textStyle}>
            Click on Get Location button to get Location data
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  mainContainerStyle: {flex: 1, marginHorizontal: 16},
  geoTextStyle: {
    fontWeight: '600',
    fontSize: 24,
    marginBottom: 16,
    color: '#0521bd',
  },
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
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#8ee0dc',
    borderRadius: 15,
    bottom: 10,
  },
  textContainerStyle: {alignSelf: 'center', justifyContent: 'center'},
  textStyle: {textAlign: 'center'},
});
