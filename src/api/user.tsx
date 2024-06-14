import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert, BackHandler, DevSettings } from "react-native"
import { apiServerUrl } from '../config'
import { StackActions, NavigationActions } from 'react-navigation'


type loginRequestParams = {
  access_token: string,
  sns_type: string,
  sns_user_key: string,
  success?: any,
  auto_login: boolean,
  callback?: any
  setUser: any
}


type signUpRequestParams = {
  access_token: string,
  sns_type: string,
  sns_user_key: string,
  email?: string,
  name?: string,
  grade?: string,
}

type updateProfileRequestParams = {
  access_token: string,
  sns_type: string,
  sns_user_key: string,
  success?: any,
  callback?: any,
  setUser: any,
  email?: string,
  name?: string,
  grade?: string,
}

type deleteAccountRequestParams = {
  sns_user_key: string,
  sns_type: string,
  access_token: string,
  resetUser: () => void
}

export const sns_login = async (params:loginRequestParams, navigation:any) => {

  // const loginCallback = async (userResult:any) => {
    
  //   console.log("userResult: ", userResult)
  //   console.log("navigation", navigation)
  //   if(!userResult){
  //     Alert.alert("서버 응답 오류입니다");
  //     return;
  //   }
  //   if(userResult.is_member =="N"){
  //     console.log("user none move to signup")
  //     navigation.navigate("SignUp");
  //   }
  //   else if(userResult.is_member == "Y"){
  //     console.log("user exist")
  //     if(userResult.user.status && userResult.user.status == "10"){
  //       if(!params.auto_login){
  //         const user_auth = {
  //           access_token: params.access_token,
  //           sns_type: params.sns_type,
  //           sns_user_key: params.sns_user_key
  //         }
  //         AsyncStorage.setItem("user_auth", JSON.stringify(user_auth))
          
  //       }
        
  //       const user_state = {
  //         email : userResult.user.email,   
  //         grade : userResult.user.grade,   
  //         username : userResult.user.name,   
  //         sns_type : params.sns_type,   
  //       }
  //       // setUser(user_state)
  //       navigation.navigate("TabNavigator");
  //       // setUser(user_state)
  //     }else{
  //       navigation.navigate("UnauthorizedUser");
  //     }
  //   }
  // }

  console.log("api handle sns login()2")
  console.log("sns_login parmas : ", params);
  // console.log("params : ", params)
  // let data:loginRequestParams = {access_token: "", sns_type:"", sns_user_key:"" }
  // data.access_token = params.access_token;
  // data.sns_type = params.sns_type;
  // data.sns_user_key = params.sns_user_key;
  
  try {
    return await fetch(apiServerUrl + "/user/sns_login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": serverAuthToken
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((json) => {
        const userResult = json
        console.log("sns_login userResult : ", userResult)
        if(!userResult){
          Alert.alert("서버 응답 오류입니다");
          return;
        }
        if(userResult.is_member =="N"){
          console.log("user none move to signup")
          // AsyncStorage.removeItem("user_auth")
          delete params['setUser']
          navigation.navigate("AuthScreens", {screen:"SignUp", params:params});
        }
        else if(userResult.is_member == "Y"){
          console.log("user exist")
          if(userResult.user.status && userResult.user.status == "10"){
            // if(!params.auto_login){
              const user_auth = {
                access_token: params.access_token,
                sns_type: params.sns_type,
                sns_user_key: params.sns_user_key
              }
              AsyncStorage.setItem("user_auth", JSON.stringify(user_auth))
              
            // }
            
            const user_state = {
              email : userResult.user.email,   
              grade : userResult.user.grade,   
              username : userResult.user.name,   
              sns_type : params.sns_type,   
              id: userResult.user.id
            }
            console.log("user_state : ", user_state)
            // setUser(user_state)
            params.setUser(user_state)
            navigation.replace("TabScreens");
            // navigation.dispatch(
            //   StackActions.replace('TabScreens')
            // );
            
            // setUser(user_state)
          }else{
            navigation.replace("UnauthorizedUser");
          }
        }
        // loginCallback(json)
        // return json
      })
      .catch((error) => {
        console.log("/user/sns_login response error : ", error)
        Alert.alert("서버 요청 응답 에러입니다.")
      });
    }
    catch(error){
      console.log("sns login error : ", error)
    }
}

export const sns_signup = (params: signUpRequestParams, navigation:any) => {
  // let data:signUpRequestParams = {
  //   access_token: "", sns_type:"", sns_user_key:"",
  //   email: "", name: "", grade: ""
  // }
  let data = params;

  return fetch(apiServerUrl + "/user/sns_signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Authorization": serverAuthToken
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log("sns signup api call json res : ", json)
      if(json.status && json.status=='success'){
        Alert.alert(
          "MRI",
          "회원가입이 완료되었습니다",
          [{text: '예', onPress: () => navigation.navigate("UnauthorizedUser"), style: 'cancel'}]
        )
        
      }else{
        Alert.alert("서버 응답 오류입니다")
      }
      
      // return json
    })
    .catch((error) => {});

}

export const update_profile = (params: updateProfileRequestParams, navigation:any) => {
  let data = params;

  return fetch(apiServerUrl + "/user/update_user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Authorization": serverAuthToken
    },
    body: JSON.stringify(data),
  })
    .then((res) => 
      res.json()
    )
    .then((json) => {
      console.log("sns signup api call json res : ", json)
      if(json.status && json.status=='success'){
        Alert.alert(
          "MRI", 
          "회원정보가 수정되었습니다",
          [{ text: "확인", onPress: () => navigation.navigate("Profile") }]
        )
        const userResult = json.user
        params.setUser(userResult);
        
      }else{
        Alert.alert("서버 응답 오류입니다")
      }
    })
    .catch((error) => {
      console.log("update_user request error : ", error)
    });

}


const processEnd = (navigation:any) => {
  setTimeout(() => {
    navigation.reset({
      routes: [{ name: "AuthScreens" }]
    });    
  }, 100)
}

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'Splash'})],
  key: null,
});

export const delete_account = (params: deleteAccountRequestParams, navigation:any) => {
  // let data:signUpRequestParams = {
  //   access_token: "", sns_type:"", sns_user_key:"",
  //   email: "", name: "", grade: ""
  // }
  let data = params;

  return fetch(apiServerUrl + "/user/delete_user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Authorization": serverAuthToken
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log("sns delete account api call json res : ", json)
      params.resetUser()
      AsyncStorage.removeItem("user_auth")
      
      Alert.alert(
        "MRI 회원탈퇴",
        "탈퇴하였습니다.\n",
        [
          {
            text: "OK",
            onPress: () => processEnd(navigation),
            // onPress: ,
            style: "cancel",
          },
        ]
      )
      
    })
    .catch((error) => {});

}


