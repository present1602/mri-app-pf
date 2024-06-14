import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AmazingCropper from 'react-native-amazing-cropper';;
import CustomCropperFooter from './CustomCropperFooter';

const Cropper = ({route, navigation}:any) => {
  console.log("route.params : ", route.params)
  console.log("route.params.img : ", route.params.img)

  const onDone = (croppedImageUri:string) => {
    console.log('croppedImageUri = ', croppedImageUri);
  }

  const onError = (err:any) => {
    console.log(err);
  }

  const onCancel = () => {
    console.log('Cancel button was pressed');
    // navigate back
  }

  return (
    <AmazingCropper
      onDone={onDone}
      onError={onError}
      onCancel={onCancel}
      imageUri={route.params.img}
      imageWidth={1600}
      imageHeight={2496}
      NOT_SELECTED_AREA_OPACITY={0.3}
      BORDER_WIDTH={20}
      footerComponent={<CustomCropperFooter />}
    />
  );
}

export default Cropper;