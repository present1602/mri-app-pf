import React, { useEffect, useState } from 'react';
import { View, Text, Platform, Alert, Image, BackHandler } from 'react-native';
import { PermissionsAndroid } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
// import ImagePicker, {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImageEditor from "@react-native-community/image-editor";



type cropDataParam = {
  offset: any,
  size: any,
  displaySize: any,
  // resizeMode: 'contain' | 'cover' | 'stretch',
  resizeMode: any,
}


const CameraTest3 = () => {
  // const [permissionReady, setPermissionReady] = useState(false)

  const requestPermission = async () => {
    if(Platform.OS == 'android'){
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then((result) => {
      })
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      ]).then((result) => {
        if(result['android.permission.CAMERA']
          && result['android.permission.READ_EXTERNAL_STORAGE']
          && result['android.permission.WRITE_EXTERNAL_STORAGE']
          == 'granted'
        )
        {
          console.log("cameratest3 all permissions granted cameratest3")
          takePhoto()
        }
        else{
          Alert.alert(
            "MRI",
            "앱 이용을 위해 [설정] > [애플리케이션]에서 카메라와 미디어파일 접근 권한을 허용해주세요",
            [{text:'앱 종료', onPress: () => { BackHandler.exitApp()} }]
          )
        }
      })
    }
  }

  const takePhoto = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, (response:any) => {
      console.log("Test3 response : ", response)
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
      }
    })
  }

  useEffect(() => {
    requestPermission()
  }, [])

  const cropData:cropDataParam = {
    offset: {x: 50, y: 50},
    size: {width: 200, height: 150},
    displaySize: {width: 200, height: 200},
    // resizeMode: 'contain' | 'cover' | 'stretch',
    resizeMode: 'contain',
  };

  return (
    <View>
      <Text>Camera test 3</Text>
    </View>
  );
}

export default CameraTest3;



// import React, { Component } from 'react';
// import AmazingCropper from 'react-native-amazing-cropper';;

// class CameraTest2 extends Component {
//   onDone = (croppedImageUri:string) => {
//     console.log('croppedImageUri = ', croppedImageUri);
//     // send image to server for example
//   }

//   onError = (err:any) => {
//     console.log(err);
//   }

//   onCancel = () => {
//     console.log('Cancel button was pressed');
//     // navigate back
//   }

//   render() {
//     return (
//       <AmazingCropper
//         onDone={this.onDone}
//         onError={this.onError}
//         onCancel={this.onCancel}
//         imageUri='https://www.lifeofpix.com/wp-content/uploads/2018/09/manhattan_-11-1600x2396.jpg'
//         imageWidth={1600}
//         imageHeight={2396}
//         NOT_SELECTED_AREA_OPACITY={0.3}
//         BORDER_WIDTH={20}
//       />
//     );
//   }
// }

// export default CameraTest2;
