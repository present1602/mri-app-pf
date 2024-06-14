import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import QuestionScreen from '../screens/QuestionGroup/QuestionScreen'

type HomeNavigatorParamsList = {
  Home: undefined,
  QuestionScreen: undefined
}
const HomeStack = createStackNavigator<HomeNavigatorParamsList>()

const HomeNavigator = () => {
  
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="QuestionScreen" 
        component={QuestionScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;