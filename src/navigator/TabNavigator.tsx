import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNavigator from './HomeNavigator';
// import OCRNavigator from './OCRNavigator';
import Entry from '../screens/Entry/Entry'
// import Cropper from '../screens/OCR/Cropper'
import UserNavigator from './UserNavigator';
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CommonActions } from '@react-navigation/native';


type TabNavigatorParamsList = {
  HomeScreens : undefined,
  Entry : undefined,
  UserScreens: undefined,
  OCRScreens: undefined,
}
const TabStack = createBottomTabNavigator<TabNavigatorParamsList>()

interface TabContainerProps {
  focused?: boolean
  children?: any
  label?: string
  // iconImage: string
  // iconImageActive: string
}

// const icon_images ={
//   user: {
//   }
// }

// const imgHome = 'home_icon_active.png'
// const imgHomeActive = 'home_icon_active.png'
// const imgOCR = 'search_icon_active.png'
// const imgOCRActive = 'search_icon_active.png'
// const imgUser = 'user_icon_active.png'
// const imgUserActive = 'user_icon_active.png'


const TabContainer: React.FunctionComponent<TabContainerProps> = ({
  children,
  label,
  focused,
}) => (
  <>
    {focused ? (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        {children}
      </View>
    ) : (
      <View
        style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
      >
        {children}
      </View>
    )}
  </>
)





const TabNavigator = ({navigation, route}:any) => {
  
  // const tabBarListeners = () => ({
  //   tabPress: () => navigation.navigate("Profile"),
  // });

  
  return (
    <TabStack.Navigator 
      initialRouteName="Entry"
      // initialRouteName="HomeScreens"
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 62,
        }
      }}

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let label, iconName: string

          switch (route.name) {
            case 'HomeScreens':
              // label = 'Home'
              iconName = 'home'
              break
            case 'Entry':
              // label = 'OCR'
              iconName = 'search'
              break
            case 'UserScreens':
              // label = 'User'
              iconName = 'user'
              break
            default:
              return null
          }
          return (
            <TabContainer label={label} focused={focused}>
              <Icon
                name={iconName}
                color= {focused ? "black": "gray"}
                size={20}
              />
            </TabContainer>
          )
        },
      })}
      >
      <TabStack.Screen name="HomeScreens" 
      component={HomeNavigator} 
        />
      <TabStack.Screen name="Entry" component={Entry} 
        />
      <TabStack.Screen name="UserScreens" component={UserNavigator} 
        listeners={{
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                routes: [
                  {
                    name: 'UserScreens',
                  }
                ]
              })
            )
          },
        }}
        />
    </TabStack.Navigator>
  );
}

export default TabNavigator;