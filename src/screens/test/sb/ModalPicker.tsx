import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const OPTIONS = [
    {code:'2103', text:'2021년 3월' },
    {code:'2011', text:'2020년 11월' },
    {code:'2009', text:'2020년 9월' },
    {code:'2006', text:'2020년 6월' },
    {code:'2003', text:'2020년 3월' },
]


const ModalPicker = (props:any) => {
  
  console.log("props : ", props)

  useEffect(() =>{
    // setTimeout(() => {
    //   props.changeModalVisibility(false);
    // }, 1000)
  }, [])
  const onPressItem = (option:any) => {
    Alert.alert("on press item")
    props.setData(option)
    setTimeout(() => {
      props.changeModalVisibility(false);
    }, 1000)
    // props.changeModalVisibility(false);
    // props.setData(option)
  }
  const onPressModalOutside = () => {
    props.changeModalVisibility(false);
  }

  const options = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        style={ styles.option }
        key= {item.code}
        onPress = { () => onPressItem(item) }
      >
        <Text style={styles.text}>
          {item}
        </Text>
      </TouchableOpacity>
    )
  })
  
  return (
    <View
      // onPress ={ () => props.changeModalVisibility(false) }
      style={ styles.container }
    >
      <View style={[styles.modal, { width: WIDTH - 20, height: (HEIGHT/2)-20 } ]}>
        <ScrollView>
          {options}
        </ScrollView>
      </View>
      
    </View>
  );
}

export default ModalPicker;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'orange',
    borderRadius: 10
  },
  option: {
    alignItems: 'flex-start'
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold'
  }
});