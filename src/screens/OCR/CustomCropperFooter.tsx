import React from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../constant/ui';

const CustomCropperFooter = (props:any) => (
  <View style={styles.buttonsContainer}>
    {/* <TouchableOpacity onPress={props.onCancel} style={styles.touchable}>
      <Text style={styles.text}>CANCEL</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={props.onRotate} style={styles.touchable}>
      <MaterialCommunityIcon name='format-rotate-90' style={styles.rotateIcon} />
    </TouchableOpacity> */}
    <TouchableOpacity onPress={props.onRotate} style={[styles.touchable, {borderRightWidth: 1, borderColor: 'rgb(192,192,192)'} ]}>
      <Text style={styles.text}>회전하기</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={props.onDone} style={styles.touchable}>
      <Text style={styles.text}>자르기</Text>
    </TouchableOpacity>
  </View>
)

export default CustomCropperFooter;

CustomCropperFooter.propTypes = {
  onDone: PropTypes.func,
  onRotate: PropTypes.func,
  onCancel: PropTypes.func
}

const styles = StyleSheet.create({
  buttonsContainer: {
    // flexDirection: 'row',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', // 'flex-start'
    justifyContent: 'center',
    backgroundColor:'rgb(222,222,222)',
    height: '100%',
    // height: 120
  },
  text: {
    color: Colors.Main,
    fontSize: 20
  },
  touchable: {
    padding: 10,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  rotateIcon: {
    color: 'white',
    fontSize: 26,
    ...Platform.select({
      android: {
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: '#000000',
        textShadowRadius: 3,
        shadowOpacity: 0.9,
        elevation: 1
      },
      ios: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#000000',
        shadowRadius: 3,
        shadowOpacity: 0.9
      }
    }),
  },
})