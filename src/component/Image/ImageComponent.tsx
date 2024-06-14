import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { WIDTH } from '../../constant/ui';

const ImageComponent = ({uri}:any) => {
  const [width, setWidth] = useState(WIDTH-50)
  const [height, setHeight] = useState(0)
  console.log("img comp uri : ", uri)
  
  useEffect(() => {
    Image.getSize(uri, (w, h) => {
      const ratio = width / w
      setHeight(h*ratio)
    })
  }, [])
  
  return (
    <Image source={{uri}}
      style={{ width: width, height: height }} />
  );
}

export default ImageComponent;