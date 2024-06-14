import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

const TextTest = () => {
  return (
    <View>
      <Text style={{fontSize: 25}}>aaaaaa
       <TouchableOpacity onPress = { () => Alert.alert("ka") }>
         <Text style={{fontSize: 30}}>inner text</Text> 
      </TouchableOpacity>
       bbbb
      </Text>
    </View>
  );
}

export default TextTest;