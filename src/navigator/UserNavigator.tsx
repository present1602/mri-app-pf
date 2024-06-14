import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import User from '../screens/UserAndSettings/Profile';
import Profile from '../screens/UserAndSettings/Profile';
import UpdateProfile from '../screens/UserAndSettings/UpdateProfile';
import Settings from '../screens/UserAndSettings/Settings';
import TermsAndConditions from '../screens/UserAndSettings/TermsAndConditions';
import PersonalInfoAgreement from '../screens/UserAndSettings/PersonalInfoAgreement';
import DeleteAccount from '../screens/UserAndSettings/DeleteAccount';


type UserNavigatorParamsList = {
  Profile: undefined,
  UpdateProfile: undefined,
  Settings: undefined,
  TermsAndConditions: undefined,
  PersonalInfoAgreement: undefined,
  DeleteAccount: undefined
}

const UserStack = createStackNavigator<UserNavigatorParamsList>()

const UserNavigator = ({navigation}:any) => {
  
  return (
    // <UserStack.Navigator headerMode="none">
    <UserStack.Navigator headerMode="screen" initialRouteName="Profile">
      <UserStack.Screen name="Profile" component={Profile}
        options={{ headerShown: false }}/>
      <UserStack.Screen name="UpdateProfile" component={UpdateProfile}
        options={{ headerShown: false }} />
        {/* options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => { navigation.goBack() }}
            />
          ),
        }} */}
      <UserStack.Screen name="Settings" component={Settings}
        options={{title: '설정'}} />
      <UserStack.Screen name="TermsAndConditions" component={TermsAndConditions}
        options={{title: '이용약관'}} />
      <UserStack.Screen name="PersonalInfoAgreement" component={PersonalInfoAgreement}
        options={{title: '개인정보취급방침'}} />
      <UserStack.Screen name="DeleteAccount" component={DeleteAccount}
        options={{title: '회원탈퇴'}} />
    </UserStack.Navigator>
  );
}

export default UserNavigator;