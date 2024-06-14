import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;




const DateSelection = ({dateDataList, setDateDataList, changeDateModalVisibility}:any) => {
  
  const onPressItem = (item:any) => {
    const findActiveItem = dateDataList.find((el:any) => el.active == true)
    if(findActiveItem && findActiveItem.value == item.value ){
      return;
    }
    
    let newList:any = []
    
    if(item.active){
      return
    }
    dateDataList.map((data:any)=> {
      if(data.value == item.value){
        newList.push({...data, active:true })
      }else if(data.value){
        newList.push({...data, active: false})
      }else{
        newList.push(data)
      }
    })
    setDateDataList(newList)
    
  }

  return (
    
    <TouchableOpacity
      onPress = { () => changeDateModalVisibility(false) }
      style={ styles.container }
    >
      <View style={[styles.modal, { width: WIDTH - 30 }]}>
        <ScrollView>
        { dateDataList.map((item:any, index:number) => {
            console.log("item : ", item)
            return (
              <TouchableOpacity
                style={ styles.option }
                key= {item.value}
                onPress = { () => onPressItem(item) }
              >
                <View style={{flex: 6}}>
                  <Text style={styles.text}>
                    {item.label}
                  </Text>
                </View>

                <View style={{flex:1}}>
                    <View style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                  } }>
                    {
                      item.active ?
                        <View style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          backgroundColor: '#000',
                        }}/>
                        : null
                    }
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
        </ScrollView>
      </View>
      
    </TouchableOpacity>
  );
}

export default DateSelection;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    height: HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modal: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    maxHeight: HEIGHT-80
  },
  option: {
    display:'flex',
    flexDirection:'row',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 40
  },
  text:{
    fontSize: 20
  }
})


