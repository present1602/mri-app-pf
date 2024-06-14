import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
// import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';
import HTML from "react-native-render-html";

const ArticleLoadTest = () => {
  const [res, setRes] = useState('init s')
  const [html, setHtml] = useState('')

  const aid = "A10191230"
  const server = "http://test.ryencatchers.com:5010/"
  const requestUrl = server + 'article/' + aid
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMzM5NjYwOCwianRpIjoiYzI1MTEzNmItNGViYy00NmQxLWJkMjQtZmZmMGJkYTdiMjk4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjIzMzk2NjA4LCJleHAiOjE2MjU5ODg2MDh9.7MShHEIcw5lkjsyLCS5W17grWlY3LR7oHDdicdjiqeU"
  
  const getData = async () => {
    await fetch(requestUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      // body: JSON.stringify(params),
    }).then((res) => res.json())
    .then(res => {
      console.log("resjson : ", res)
      const contentFormat = res.body.data.content_format
      console.log("contentFormat : ", contentFormat)
      setHtml(contentFormat)
    })


  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <View>
      <Text>article load2</Text>
      <Text>res : {res}</Text>
      {/* <Text style={{ fontSize: 20 }}> */}
        <HTML source={{ html: html }} contentWidth={300} tagsStyles={{ins:{borderWidth:1, borderColor:'black'}}}/>
      {/* </Text> */}
      {/* <Text>tt: { ReactHtmlParser(html) }</Text> */}

    </View>
  );
}

export default ArticleLoadTest;