import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface user {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

const APIScreen = ({navigation}) => {
  const [data, setData] = useState<user[]>();
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  const renderApiLoader = () => {
    return (
      <View style={[StyleSheet?.absoluteFill, styles?.loaderStyle]}>
        <ActivityIndicator size="small" style={{opacity: 1}} color="#00808F" />
      </View>
    );
  };

  const userApi = async () => {
    try {
      setApiLoading(true);
      const response = await axios({
        method: 'get',
        url: 'https://gorest.co.in/public/v2/users',
      });
      setData(response.data);
      setApiLoading(false);
    } catch (error: any) {
      Alert.alert('API error');
    }
  };
  useEffect(() => {
    userApi();
  }, []);
  return (
    <>
      {apiLoading ? renderApiLoader() : null}
      <SafeAreaView style={styles?.mainContainerStyle}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={item => item?.id.toString()}
          renderItem={({item}) => {
            return (
              <View style={styles?.container}>
                <View style={styles?.textContainerStyle}>
                  <Text style={styles?.idTextStyle}>ID: {item?.id}</Text>
                  <Text style={styles?.textStyle}>NAME: {item?.name}</Text>
                  <Text style={styles?.textStyle}>EMAIL: {item?.email}</Text>
                  <Text style={styles?.textStyle}>GENDER: {item?.gender}</Text>
                  <Text style={styles?.textStyle}>STATUS: {item?.status}</Text>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default APIScreen;

const styles = StyleSheet.create({
  mainContainerStyle: {flex: 1, marginHorizontal: 16, marginTop: 16},
  container: {
    backgroundColor: '#92c0eb',
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainerStyle: {margin: 10},
  idTextStyle: {
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  textStyle: {marginBottom: 10, flexWrap: 'wrap'},
  loaderStyle: {
    zIndex: 5000,
    elevation: 5000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.3)',
  },
});
