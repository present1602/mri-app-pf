import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Image, Alert, DevSettings, Platform } from 'react-native';
import { useAppContext } from '../../provider/RootProvider';

const Unauthorized = ({navigation}: any) => {
  
  const { resetUser } = useAppContext()
  
  const execLogout = async () =>{
    await AsyncStorage.removeItem("user_auth").then(() => {
      // console.log("devset reload")
      
      // DevSettings.reload()
      resetUser()
      navigation.reset({
        routes: [{ name: "AuthScreens" }]
      });
      
    })
  }

  const logout = () => {
    Alert.alert(
      "MRI", 
      "로그아웃하시겠습니까?",
      [
        {text: '예', onPress: () => execLogout(), style: 'cancel'},
        {text: '아니오'},
      ]  
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.mainSection}>
          <View style={{ marginBottom: 50, marginTop: 100}} >
            <Image source={ require('../../assets/img/warning.png') } />
          </View>
          <View style={styles.infoSection}>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoText}>앱 이용을 위해서는</Text>
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoText}><Text style={{ fontWeight: 'bold'}}>관리자의 회원승인</Text>이 필요합니다</Text>
            </View>
            <View style={styles.subInfoTextWrapper}>
              <Text style={styles.subInfoText}>학원 관리자에게 문의해주세요</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonSection}>
          { Platform.OS == 'android' &&
            <TouchableOpacity style={styles.bottomButton}
              onPress= { () => { BackHandler.exitApp() } } 
              >
              <Text style={styles.bottomButtonText}>앱 종료</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity style={styles.bottomButton}
            onPress= { () => { logout() } } 
            >
            <Text style={{  }}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Unauthorized;

export const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1.
  },
  contentWrapper: {
    display:'flex',
    flex:1,
    flexDirection: 'column',
  },
  mainSection:{
    // fontSize: 30
    display: 'flex',
    flex: 1.7,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 100,
  },
  buttonSection:{
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  bottomButton: {
    borderWidth: 1,
    borderColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 10,
    height: 50,
    width: '50%',
    marginVertical: 10
  },
  bottomButtonText: {
    fontSize: 15
  },
  
  infoSection:{
    display: 'flex',
    flex: 1
  },
  infoTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  subInfoTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25
  },
  infoText: {
    fontSize: 24
  },
  subInfoText: {
    fontSize: 16,
    color: 'rgb(138,139,141)'
  }

})