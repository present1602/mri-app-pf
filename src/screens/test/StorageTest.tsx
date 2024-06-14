import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


const setStringValue = async (value: string) => {
  try {
    await AsyncStorage.setItem('cykey1', value)
  } catch(e) {
    // save error
  }

  console.log('set storage Done.')
}

const getMyStringValue = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch(e) {
    // read error
  }

  console.log('get storage Done.')

}


const StorageTest = () => {
  const [val1, setVal1] = useState('value1')
  
  const onSubmit = async (value:string) => {
    try {
      return await AsyncStorage.setItem("key1", value)
    } catch(e) {
      // read error
    }
  }
  const removeData = async (key:string) => {
    try {
      return await AsyncStorage.removeItem(key)
    } catch(e) {
      // read error
    }
  }

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key)

      if(value != null){
        setVal1(value)
        console.log("value : ", value)
      }
    } catch(e) {
      // read error
    }
  }

  const returnData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value
    } catch(e) {
      // read error
    }
  }


  const consoleData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key)

      if(value != null){
        setVal1(value)
      }
    } catch(e) {
      // read error
    }
  }


  


  useEffect(() => {
   

  }, [])
  return (
    <View>
      <Text>출력 : {val1}</Text>
      <TouchableOpacity onPress= { () => {onSubmit("3456")} } >
        <Text style={{ fontSize: 20}}>아이템 SET</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress= { () => {getData("key1")} } >
        <Text style={{ fontSize: 20}}>print STORAGE VALUE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress= { () => {removeData("key1")} } >
        <Text style={{ fontSize: 20}}>REMOVE STORAGE VALUE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress= { () => {consoleData("key1")} } >
        <Text style={{ fontSize: 20}}>CONSOLE STORAGE VALUE</Text>
      </TouchableOpacity>
    </View>
  );
}

export default StorageTest;