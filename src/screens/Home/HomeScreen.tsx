import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QuestionHistory from './QuestionHistory/QuestionHistory'
import TestSearch from './TestSearch/TestSearch'
import { Colors } from '../../constant/ui'
import { useAppContext } from '../../provider/RootProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {

  const {state, setUser} = useAppContext();
  
  const [activeTab, setActiveTab] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState('')

  const setView = (activeTab: number) => {
    switch(activeTab){
      case 1:
        return ( <QuestionHistory /> )
        // break;
      case 2:
        return ( <TestSearch /> )
        // break;
      default:
        return;
    }
  }

  const tabData = [
    {tabKey: 1, text: '최근 풀어본 문제'},
    {tabKey: 2, text: '모의고사별 문제'}
  ]
  const handleMenuTabEvent = (tabKey:number) => {
    setActiveTab(tabKey)
  }
  
  const TabComponent = ({data}:any) => {
    console.log("props tabcomponent data : ", data)
    console.log("activeTab tabcomponent : ", activeTab)
    return (
      <View style={ activeTab==data.tabKey ? [styles.topTabWrapper, styles.tabActive] : styles.topTabWrapper }
        key = {data.tabKey}>
        <TouchableOpacity onPress = { () => { handleMenuTabEvent(data.tabKey) } }>
          <Text style={ activeTab==data.tabKey ? [styles.tabText, styles.tabTextActive] : styles.tabText }>
            {data.text}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>  
      <View style={styles.top}>
        { tabData.map((data) => {
            return (
              <TabComponent data = {data} key={data.tabKey}/>
            ) 
          })  
        }
      </View>
      <View style={ styles.contentWrapper }>
        { setView(activeTab) }
        {/* <View style={{ backgroundColor:'red', flex: 1}}>
          <Text>aaaa</Text>
        // </View> */}
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    height: 62,
  },
  contentWrapper: {
    flex: 1,
  },
  baseBackground: {
    backgroundColor: '#fff'
  },
  topTabWrapper: {
    // display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:32,
    // flexGrow: 1
  },
  tabActive: {
    color: Colors.Main,
    borderBottomColor: Colors.Main,
    borderBottomWidth: 2
  },
  tabText:{
    fontSize: 15
  },
  tabTextActive: {
    color: Colors.Main
  },
  itemTop:{
    color: 'rgb(128,128,128)',
    fontSize: 12
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 5,
    padding: 15
  },
  itemContentWrapper: {
    flex: 1
  },
  imageEventArea: {
    padding: 5
  },
  moveIconArea: {
    width: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionText:{
    fontSize: 14
  }
})
