import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useAppContext } from '../../provider/RootProvider';
import { delete_account } from '../../api/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { unlink } from "@react-native-seoul/kakao-login";

const WIDTH = Dimensions.get("window").width;

const DeleteAccount = ({navigation}:any) => {
  const { state, resetUser } = useAppContext();
  const userData = state.user
  
  const execDeleteAccount = () => {
    AsyncStorage.getItem("user_auth").then((user:any) => {
      console.log("asyncstorage get user then")

      const user_data = JSON.parse(user)
      
      // console.log("user.sns_user_key : ", user_data.sns_user_key)
      // console.log("user.sns_type : ", user_data.sns_type)
      // console.log("user[access_token] : ", user_data.access_token)
      if(user_data && user_data.sns_user_key && user_data.sns_type ){
        console.log("asycn user : ", user)
        const params = {
          sns_user_key: user_data.sns_user_key,
          sns_type: user_data.sns_type,
          access_token: user_data.access_token,
          resetUser: resetUser
        }

        if(user_data.sns_type == '10'){
          const unlinkKakao = async (): Promise<void> => {
            const message = await unlink();
            console.log("unlink message : ", message)
  
          };
          unlinkKakao()
          delete_account(params, navigation)
        }else if(user_data.sns_type == '20'){
          console.log("naver delete account")
          delete_account(params, navigation)
        }
        else if(user_data.sns_type == '30'){
          console.log("naver delete account")
          delete_account(params, navigation)
        }

      }
      else{
        console.log("asyncstorage get user then else")
        navigation.navigate("AuthScreens")
      }
    })
  }

  const deleteAccount = () => {

    Alert.alert(
      "MRI", 
      "탈퇴하시겠습니까?",
      [
        {text: '예', onPress: () => execDeleteAccount(), style: 'cancel'},
        {text: '아니오', onPress: () => {} },
      ]
      
    )
    // console.log("deleteAccount() ")
    
  }

  const cancleProcees = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.accountSection}>
          <View style={styles.accountTitleWrapper}>
            <Text style={styles.accountTitleText}>계정</Text>
          </View>
          <View style={styles.accountInfoWrapper}>
            <Text style={styles.accountText}>{userData?.email}</Text>
          </View>
        </View>
        <View style={styles.warningMessageWrapper}>
          <Text style={styles.warningMessageText}>탈퇴하시겠습니까?</Text>
        </View>
        <View style={styles.buttonGroupSection}>
          <View style={[styles.buttonGroupWrapper, {width: (WIDTH/1.3)}]}>
            <TouchableOpacity style={styles.buttonWrapper}
              onPress = { () => deleteAccount()  }>
              <Text style={styles.buttonText}>탈퇴하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonWrapper}
              onPress = { () => cancleProcees() }>
              <Text style={styles.buttonText}>취소하기</Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.warningMessageText}>정말 탈퇴하시겠습니까?</Text> */}
        </View>
      </View>
    </View>
  );
}

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff'
  },
  contentWrapper: {
    padding: 25,
    marginTop: 25
  },

  accountSection: {
    display: 'flex', 
    flexDirection: 'row'
  },
  accountTitleWrapper: {
    width: 60 
  },
  accountTitleText: {
    fontSize: 18
  },
  accountInfoWrapper: {
    flex: 1,
  },
  accountText: {
    fontSize: 20
  },
  warningMessageWrapper: {
    marginVertical: 20  
  },
  warningMessageText: {
    fontSize: 22
  },
  buttonGroupSection: {
    marginVertical: 50
  },
  buttonGroupWrapper:{
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  buttonWrapper: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 20 
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center'
  }

})
