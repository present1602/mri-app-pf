import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import AmazingCropper from 'react-native-amazing-cropper';

// const CameraTest2 = ({data}:any) => {
//   const onDone = (croppedImageUri:string) => {
//     console.log('croppedImageUri = ', croppedImageUri);
//     // send image to server for example
//   }

//   const onError = (err:any) => {
//     console.log(err);
//   }

//   const onCancel = () => {
//     console.log('Cancel button was pressed');
//     // navigate back
//   }

//   return (
//     <AmazingCropper
//       onDone={() => onDone() }
//       onError={() => onError() }
//       onCancel={() => onCancel() }
//       imageUri='https://www.lifeofpix.com/wp-content/uploads/2018/09/manhattan_-11-1600x2396.jpg'
//       imageWidth={1600}
//       imageHeight={2396}
//       NOT_SELECTED_AREA_OPACITY={0.3}
//       BORDER_WIDTH={20}
//     />
//   );
// }
const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

const CameraTest6 = ({navigation}:any) => {
  const takePicture = async function(camera:any) {
    
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    navigation.navigate("CameraTest22", {img: data.uri})

    //  eslint-disable-next-line
    console.log("data.uri : ", data.uri);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> SNAP2 </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );

  
}

export default CameraTest6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});