import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalPicker from './ModalPicker'


const SlectBoxTest = () => {
  const [chooseData, setChooseData] = useState<any>({})
  const[isModalVisible, setModalVisible] = useState(false)

  const changeModalVisibility = (bool:boolean) => {
    setModalVisible(bool)
  }

  const setData = (option:any) => {
    setChooseData(option)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress = { () => changeModalVisibility(true) } 
        style={styles.gradeSelectBox}>
        <Text style={styles.gradePlaceholder}>학년</Text>
        <Text style={styles.gradePlaceholder}>{chooseData}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        // nRequestClose= { () => { changeModalVisibility(false) } }
      >
        <ModalPicker
          changeModalVisibility = {changeModalVisibility}
          setData = {setData}
        />
      </Modal>
    </View>
  );
}

export default SlectBoxTest;

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradeSelectBox: {
    borderWidth: 1,
    borderColor: 'blue'
  },
  gradePlaceholder: {
    marginVertical: 10
  }
})