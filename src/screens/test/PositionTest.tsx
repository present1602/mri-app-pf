import React from 'react';
import { View, Text, StyleSheet, Modal, Alert } from 'react-native';
import AmazingCropper from 'react-native-amazing-cropper';

const imgUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'

const PositionTest:any = () => {
  function onDone(){
    console.log("ondone")
    Alert.alert("인식중")
  }
  function onError(){
  }
  function onCancel(){
  }
  return (
    // <View style={ styles.container }>
    // [
      // <View style={{ 
      //     height: 100, position: 'absolute', 
      //     zIndex: 11111, backgroundColor: 'green',
      //     opacity:0.2
      //     }}>
      //   <Text>aaaa</Text>
      // </View>,

      // <View style={{borderWidth: 2, height:250, flex: 1, backgroundColor:'yellow'}}>
      //   <Text style={{fontSize:40}}>content</Text>
      // </View>,
      <>
        <Modal
          transparent={true}
          visible={true}
          >
          <View style={{position:'absolute', zIndex: 111}}><Text>abb</Text></View>  
        </Modal>
        <AmazingCropper
          onDone={onDone}
          onError={onError}
          onCancel={onCancel}
          imageUri={imgUrl}
          imageWidth={150}
          imageHeight={200}
          NOT_SELECTED_AREA_OPACITY={0.3}
          BORDER_WIDTH={20}
        />
      </>
    // ]
  );
}

export default PositionTest;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    opacity: 0.2,
    flex:1
  }
})

{/* <AmazingCropper
  onDone={onDone}
  onError={onError}
  onCancel={onCancel}
  imageUri={route.params.img.uri}
  // imageWidth={route.params.img.width}
  // imageHeight={route.params.img.height}
  imageWidth={route.params.img.width}
  imageHeight={route.params.img.height}
  // imageWidth={1600}
  // imageHeight={2496}
  NOT_SELECTED_AREA_OPACITY={0.3}
  BORDER_WIDTH={20}
/> */}
