import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/Auth/Login'
import SignUp from '../screens/Auth/SignUp'
import UnauthorizedUser from '../screens/Auth/UnauthorizedUser'

type AuthNavigatorParamsList = {
  Login: undefined
  SignUp: undefined,
  UnauthorizedUser: undefined
}

const AuthStack = createStackNavigator<AuthNavigatorParamsList>()

const Navigator = () => {
  
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Login" component={Login}/>
      <AuthStack.Screen name="SignUp" component={SignUp}/>
      <AuthStack.Screen name="UnauthorizedUser" component={UnauthorizedUser}/>
    </AuthStack.Navigator>
  );
}

export default Navigator;