import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const numChoiceList = [1,2,3,4,5]

const NumberChoiceList = ({answer_no}:any) => {
  return (
    <View>
      <TouchableOpacity>
        <Text>1</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>2</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>3</Text>
      </TouchableOpacity>
      
    </View>
  );
}

export default NumberChoiceList;
