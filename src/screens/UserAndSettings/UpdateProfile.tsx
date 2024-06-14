import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import RNGestureHandlerButton from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerButton';
import { sns_signup } from '../../api/user'
import { useAppContext } from '../../provider/RootProvider';
import { update_profile } from '../../api/user'
import UserNavigator from '../../navigator/UserNavigator';
import { Colors } from '../../constant/ui';
// import { useNavigation } from "@react-navigation/native"

const WIDTH = Dimensions.get("window").width;

type signUpParams = {
  access_token: string,
  sns_type: string,
  sns_user_key: string,
  email?: string,
  name: string,
  grade: string
}


const UpdateProfile = ({navigation}:any) => {
  const {state, setUser} = useAppContext();
  

  const [name, setName] = useState(state.user?.username);
  const [grade, setGrade] = useState(state.user?.grade);

  const [submitReady, setSubmitReady] = useState(false);
  const [isShowNameValidationFailMessage, setShowNameValidationFailMessage] = useState(false);

  // const [isNameValid, setNameValid] = useState(false);
  
  const gradeData = [
    {text:'고1', value:'10'}, 
    {text:'고2', value:'11'}, 
    {text:'고3', value:'12'}
  ]
  
  const GradeButton = (props:any) => (
    <View style={ [styles.gradeButton, props.value == grade ? {borderColor:Colors.Main} : null ] }>
      <TouchableOpacity onPress = { () => setGrade(props.value) }>   
        <Text style={ [styles.buttonText, props.value == grade ? {color:Colors.Main} : null ] }>
          {props.text}</Text>
      </TouchableOpacity>
    </View>
  )
  
  const handleUsernameInput = (text: string) => {
    setName(text);
  }
  const handleGradeInput = (value: string) => {
    // Alert.alert("sel value : ", value)
    setGrade(value);
  }
  useEffect(() => {
    if(state.user){
      setName(state.user.username)
      setGrade(state.user.grade)
    }
  }, [])
  useEffect(() => {
    if(name == null || name ==undefined){
      return;
    }
    
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/; 
    
    if(name.length > 0 && !regex.test(name) && isShowNameValidationFailMessage == false){
      console.log("fail name : ", name)
      if(submitReady){
        setSubmitReady(false)
      }
      setShowNameValidationFailMessage(true)
    }else if(name.length > 1 && regex.test(name) && isShowNameValidationFailMessage == true){
      if(!submitReady){
        setSubmitReady(true)
      }
      setShowNameValidationFailMessage(false)
    }
    
    if(name.length > 1 && submitReady == false) {
      setSubmitReady(true)
    }else if(name.length < 2 && submitReady==true){
      setSubmitReady(false)
    }
  }, [name])

  const submitUpdate = async () => {
    // const navigation = useNavigation();
    // navigation.
    AsyncStorage.getItem("user_auth").then((user:any) => {
      const user_data = JSON.parse(user)

      const params = {
        sns_user_key: user_data.sns_user_key,
        sns_type: user_data.sns_type,
        access_token: user_data.access_token,
        username: name,
        grade: grade,
        setUser: setUser
      }
      console.log("update profile nav : ", navigation)
      update_profile(params, navigation)
    })
    // const params:signUpParams = {
    //   access_token: routeParams.access_token,
    //   sns_type: routeParams.sns_type,
    //   sns_user_key: routeParams.sns_user_key,
    //   name : name,
    //   grade : grade
    // }
    // if(routeParams.email && routeParams.email !=''){
    //   params.email = routeParams.email;
    // }
    // console.log("signup userResult : ", result)  
    // if(result.status && result.status =="success"){
    //   navigation.navigate("UnauthorizedUser");
    // }
    // else{
    //   Alert.alert("응답 오류 발생 ")
    // }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.topSection}>
          <View>
            <Text style={styles.title}>정보수정</Text>
          </View>
          <View>
            <View style={styles.topDescriptionWrapper}>
              <Text style={styles.topDescriptionText}>기본정보를</Text>
              <Text style={styles.topDescriptionText}>수정해주세요</Text>
            </View>
          </View>
        </View>
        <View style={styles.mainSection}>
          <View style={styles.inputSection}>
            <View>
              <Text style={styles.infoText}>이름</Text>
            </View>
            <View style={styles.textInputWtapper}>
              <TextInput style={styles.textInput} 
                maxLength={20}
                value={name}
                placeholder={'이름을 입력해주세요'}
                placeholderTextColor="rgb(212,212,212)"
                onChangeText = { (text:string) => handleUsernameInput(text) } 
                />
            </View>  
            { isShowNameValidationFailMessage==true ? 
              (<View style={{ marginVertical: 15}}>
                <Text style={{ color: 'red' }}>이름을 올바르게 입력해주세요</Text>
              </View>)
              : null
            }
          </View>
          <View style={styles.inputSection}>
            <View>
              <Text style={styles.infoText}>학년</Text>
            </View>
            <View style={styles.buttonGronpSection}>
               <FlatList 
                style={{display: 'flex' }}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={gradeData}
                renderItem={({item}:any) => (
                  <GradeButton text={item.text} value={item.value} onPress = { () => handleGradeInput(item.value) } 
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                // keyExtractor={(item:any, index:number) => index}
              />
            </View>
          </View>
          <View style={styles.buttonInputSection}>
          {/* <View style={ [styles.gradeButton, props.value == grade ? {borderColor:Colors.Main} : null ] }>     */}
            {/* <View style={{ width: (WIDTH/2) -70, borderWidth: 2 }}> */}
              <TouchableOpacity style={[styles.mainButton, {borderWidth:1, borderColor:'rgb(199,205,210)', backgroundColor: '#fff'}] }
                onPress= { (  ) => { navigation.goBack() } } 
              >
                <Text style={styles.cancleButtonText}>취소</Text> 
              </TouchableOpacity>
            {/* </View> */}
            {/* <View style={{ width: (WIDTH/2) - 70, borderWidth: 2}}> */}
              <TouchableOpacity style={[styles.mainButton, {backgroundColor: Colors.Main}] }
                onPress= { (  ) => { submitUpdate() } } 
              >
                <Text style={styles.updateButtonText}>완료</Text> 
              </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
      </View>
    </View>
  );
}

export default UpdateProfile;

export const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex:1
  },
  title:{
    fontSize: 30,
  },
  topDescriptionWrapper: {
    marginVertical: 10
  },
  topDescriptionText: {
    fontSize: 16,
    color: 'rgb(63, 63, 63)'
  },
  contentWrapper: {
    display:'flex',
    flex:1,
    flexDirection: 'column',
  },
  topSection:{
    // fontSize: 30
    // height: 100,
    marginHorizontal: 20,
    marginTop: 60,
    display: 'flex',
    justifyContent: 'center',
  },
  mainSection: {
    flex: 1,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40
  },
  inputSection: {
    margin: 20
  },
  buttonInputSection: {
    marginHorizontal: 20,
    marginVertical: 50,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-end'
    // position:'absolute'

  },
  infoText:{
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
    color: 'rgb(35, 35, 35)'
  },
  textInputWtapper: {
    // color: 'rgb(236, 236, 236)'
    height: 48,
    backgroundColor:'red'
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgb(216, 216, 216)',
    backgroundColor: '#fff',
    height: 48,
    color: 'rgb(35, 35, 35)',
    // color: 'black',
    paddingHorizontal: 15,
    // borderColor: 'gray'
  },
  mainButton:{
    // backgroundColor: 'rgb(216, 216, 216)',
    height: 54,
    marginVertical: 20,
    display: 'flex',
    justifyContent: 'center',
    width: (WIDTH/2) - 40
    // flex: 1
  },
  cancleButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color:'rgb(128,128,128)',
  },
  updateButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color:'#fff',
  },
  buttonGronpSection: {
    display:'flex',
    // flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
  },
  gradeButton: {
    height: 48,
    borderWidth: 1,
    borderColor: 'rgb(216, 216, 216)',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: (WIDTH/3) -30,
  },
  buttonText: {
    textAlign: 'center',
    // height: 60,
    textAlignVertical: 'center',
    color: 'rgb(128, 128, 128)',
    borderRadius: 5
  },
})