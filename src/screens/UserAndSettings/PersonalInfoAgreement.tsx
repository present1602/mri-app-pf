import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHtml from "react-native-render-html";
import { apiServerUrl } from '../../config';


const PersonalInfoAgreement = () => {
  const [htmlContent, setHtmlContent] = useState('')
  
  const loadContent = async () => {
    await fetch(apiServerUrl + '/user/privacy_policy', {
      method: "GET",
      headers: {
        Accept: "application/json",
        // "Content-Type": "application/json",
        // "Authorization": serverAuthToken
      },
    })
    // .then((res) => console.log("res1 : ", res))
    
    .then((res) => res.json())
    .then((json) => {
      if(json.result == 'success' && json.data){
        setHtmlContent(json.data.privacy_policy)
      }
    })
  }
  useEffect(() => {
    loadContent()
  })

  return (
    <ScrollView style={{padding: 15}}>
      <RenderHtml html = {htmlContent} />
    </ScrollView>
  );
}

export default PersonalInfoAgreement;