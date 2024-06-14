import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import RNGestureHandlerButton from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerButton';
import { Colors } from '../../constant/ui'
import { sns_signup } from '../../api/user'
import { useAppContext } from '../../provider/RootProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const SignUp = ({route, navigation}:any) => {
  // const {state, setUser} = useAppContext();

  console.log("signup sign up route.params : ", route.params)


  const [name, setName] = useState("");
  const [grade, setGrade] = useState("10");

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
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/; 
    if(name == ""){
      if(submitReady){
        setSubmitReady(false)
      }
      if(isShowNameValidationFailMessage){
        setShowNameValidationFailMessage(false)
      }
    }
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

  const submitSignUp = async () => {
    // const navigation = useNavigation();
    // navigation.
    const routeParams = route.params
    
    const params:signUpParams = {
      access_token: routeParams.access_token,
      sns_type: routeParams.sns_type,
      sns_user_key: routeParams.sns_user_key,
      name : name,
      grade : grade
    }
    if(routeParams.email && routeParams.email !=''){
      params.email = routeParams.email;
    }
    console.log("signup submit params : ", params)
    sns_signup(params, navigation);
    // console.log("signup userResult : ", result)  
    // if(result.status && result.status =="success"){
    //   navigation.navigate("UnauthorizedUser");
    // }
    // else{
    //   Alert.alert("응답 오류 발생 ")
    // }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.topSection}>
          <View>
            <Text style={styles.title}>회원가입</Text>
          </View>
          <View>
            <View style={styles.topDescriptionWrapper}>
              <Text style={styles.topDescriptionText}>MRI 회원이 되기 위해</Text>
              <Text style={styles.topDescriptionText}>기본정보를 입력해주세요</Text>
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
          <View style={styles.inputSection}>
          {/* <View style={ [styles.gradeButton, props.value == grade ? {borderColor:Colors.Main} : null ] }>     */}
            <TouchableOpacity style={[styles.mainButton, submitReady ? {backgroundColor: Colors.Main} : null] }
              onPress= { (  ) => { submitSignUp() } } 
            >
              <Text style={styles.mainButtonText}>완료</Text> 
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignUp;

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
    backgroundColor: 'rgb(216, 216, 216)',
    height: 54,
    marginVertical: 20,
    display: 'flex',
    justifyContent: 'center'
  },
  mainButtonText: {
    textAlign: 'center',
    fontSize: 20,
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