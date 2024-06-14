import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constant/ui';
import {useAppContext} from '../../provider/RootProvider'


const Profile = ({navigation}:any) => {
  const { state } = useAppContext()
  const userData = state.user
  const [gradeText, setGradeText] = useState('')

  useEffect(() => {
    const grade = state.user?.grade
    switch(grade){
      case "10":
        setGradeText("고1")
        break;
      case "11":
        setGradeText("고2")
        break;
      case "12":
        setGradeText("고3")
        break;
      default:
        return;
    }
  }, [state])
  console.log("in profile state : ", state)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress = { () => { navigation.navigate('Settings') }} >
          <Image source={require('../../assets/img/setting_icon.png')} 
            style={styles.settingIconImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.topInfoSection}>
          <View style={styles.usernameWrapper}>
            <Text style={styles.username}>{userData?.username}</Text>
          </View>
          <View style={styles.gradeWrapper}>
            <Text style={styles.grade}>{gradeText}</Text>
          </View>
        </View>
        <View style={ styles.contentBodyWrapper }> 
          <View style={styles.emailSection}>
            {/* <Text style={styles.email}>email@naver.com</Text> */}
            <Text style={styles.email}>{userData?.email}</Text>
          </View>
          <TouchableOpacity onPress= { () => { navigation.navigate("UpdateProfile")} } >
            <View style={styles.updateButtonSection} >
              <View style={{ flex: 1 }}>
                <Text style={ styles.lineButtonText}>정보수정</Text> 
              </View>
              <View style={ styles.moveIconArea }>
                <Image source= {require('../../assets/img/move_icon.png')} />
              </View>
            </View>
          </TouchableOpacity>
          
          </View>
      </View>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff'
  },
  top: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingTop: 15,
  },
  settingIconImage: {
    margin: 12,
    padding: 12,
    width: 25,
  },
  contentWrapper: {
    display:'flex',
    // padding: 20,
    flex: 1,
  },
  topInfoSection: {
    padding: 20,
    display:'flex',
    // flexDirection: 'row',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  contentBodyWrapper: {
    backgroundColor: 'rgb(246,246,246)',
    flex: 1
  },
  usernameWrapper:{
    // marginTop:5, marginBottom:5
  },
  username: {
    fontSize: 28
  },
  gradeWrapper:{
    // margin: 5, padding:5
  },
  grade: {
    fontSize: 20,
    marginHorizontal: 12,
    color: Colors.Main
  },
  emailSection:{
    marginTop:5, marginBottom:5,
    padding: 20
  },
  email:{
    fontSize: 16,
  },
  updateButtonSection: {
    // margin: 10,
    display: 'flex', 
    flexDirection:'row',
    backgroundColor: '#fff',
    padding: 20
  },
  moveIconArea: {
    width: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lineButtonText: {
    fontSize: 16
  }
  
})
