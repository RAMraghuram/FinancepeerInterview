import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const readAndSaveJSON = async () => {
  const data: data = await require('../resources/data/data.json');
  await AsyncStorage.setItem('DATA', JSON.stringify(data));
};
interface data {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const readLocalData = async () => {
  const localData = await AsyncStorage.getItem('DATA');
  const parseJson: data[] = JSON.parse(localData!);
  return parseJson;
};

const DataScreen = ({navigation}) => {
  const [jsonData, setJsonData] = useState<data[]>();
  useEffect(() => {
    readAndSaveJSON();
  }, []);
  return (
    <SafeAreaView style={styles?.mainContainerStyle}>
      <TouchableOpacity
        style={styles?.buttonStyle}
        onPress={async () => {
          const value = await readLocalData();
          setJsonData(value);
        }}>
        <Text style={styles?.buttonTitleStyle}>Read Data</Text>
      </TouchableOpacity>
      {jsonData ? (
        <FlatList
          data={jsonData!}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({item}) => {
            return (
              <View style={styles?.container}>
                <View style={styles?.textContainerStyle}>
                  <Text style={styles?.idTextStyle}>ID: {item?.id}</Text>
                  <Text style={styles?.textStyle}>USERID: {item?.userId}</Text>
                  <Text style={styles?.textStyle}>TITLE: {item?.title}</Text>
                  <Text style={styles?.textStyle}>BODY: {item?.body}</Text>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text style={styles?.textAlingStyle}>
          Click on Read Data to read local data.
        </Text>
      )}
    </SafeAreaView>
  );
};

export default DataScreen;

const styles = StyleSheet.create({
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
  mainContainerStyle: {flex: 1, marginHorizontal: 16},
  textStyle: {marginBottom: 10, flexWrap: 'wrap'},
  container: {
    backgroundColor: '#92c0eb',
    borderRadius: 10,
    marginBottom: 10,
  },
  idTextStyle: {
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  textContainerStyle: {margin: 10},
  textAlingStyle: {textAlign: 'center'},
});
