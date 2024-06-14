import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Linking, TouchableOpacity, Alert } from 'react-native';
import WebView from 'react-native-webview';
import { useQuestionContext } from '../../../provider/QuestionProvider';
import RenderHtml from "react-native-render-html";
import QuestionContent from './QuestionContent'
import MultipleQuestionContent from './MultipleQuestionContent'
import { Colors, HEIGHT, WIDTH } from '../../../constant/ui';
import { assetsServerUrl } from '../../../config';
import ImageComponent from '../../../component/Image/ImageComponent'


const QuestionAndSolution = () => {
  const {questionState} = useQuestionContext()
  
  const bs_question_count = questionState.questionData.bs_question_count;

  const questionData = questionState.questionData.data
  const formulaData = questionData.formula
  const bsSolutionData = questionData.bs_solution
  const videoUrl = questionData.article.video_url

  const formulaImagePath = formulaData.formula_image_path;
  const formulaSolutionImagePath = formulaData.formula_solution_image_path;

  console.log("bs_question_count : ", bs_question_count)

  return (
    
    <View style={ styles.container }>
      <View style={{ minHeight: HEIGHT - 100 }}>
        <View style={ styles.titleWrapper }>
          <Text style={ styles.title }>문제</Text>
        </View>
        <View style={styles.sectionContentWrapperWithTopBorder}>
          { bs_question_count == 1 ?
              <QuestionContent />
              :
              <MultipleQuestionContent />
          }
        </View>
      </View>
      
       { (formulaSolutionImagePath || formulaImagePath )
          && 
          ( <View>
                <View style={ styles.titleWrapper }>
                  <Text style={ styles.title }>문제풀이</Text>
                </View>
                <View style={ styles.sectionContentWrapper }>
                  {formulaImagePath && 
                    <View style={{marginVertical: 20}}>
                      <View style={{display:'flex', flexDirection: 'row', alignContent: 'center' }}>
                        <View style={ styles.subTitleMarker }/>
                        <View style={{marginHorizontal: 10}}>
                          <Text style={{ fontSize: 18}}>공식</Text>
                        </View>
                      </View>
                      <View >
                        <ImageComponent uri={`${assetsServerUrl}/upload/${formulaImagePath}`} />
                      </View>
                    </View>
                  }

                  {formulaSolutionImagePath && 
                    <View style={{marginVertical: 20}}>
                      <View style={{display:'flex', flexDirection: 'row', alignContent: 'center' }}>
                        <View style={ styles.subTitleMarker }/>
                        <View style={{marginHorizontal: 10}}>
                          <Text style={{ fontSize: 18}}>공식적용</Text>
                        </View>
                      </View>
                      {/* <View style={{height: 500, marginVertical: 10}}> */}
                      <View >
                        <ImageComponent uri={`${assetsServerUrl}/upload/${formulaSolutionImagePath}`} />
                        {/* { loadImage(`${assetsServerUrl}/upload/${formulaImagePath}` ) } */}
                        {/* <Image source= {{ uri: `${assetsServerUrl}/upload/${formulaImagePath}` }} 
                          resizeMode='contain' 
                          width={300} height={200}
                          style={{width:(WIDTH- 20), height:200}}
                        /> */}
                      </View>
                    </View>
                  }
              </View>
            </View>
          )
        }
        { bsSolutionData.length > 0 &&
            <View>
              <View style={ styles.titleWrapper }>
                <Text style={ styles.title }>해설</Text>
              </View>
              <View style={ styles.sectionContentWrapper }>
                {
                  bsSolutionData.map((el:any, index:number) => {
                    return (
                      <View style={{marginVertical: 20}}
                        key={Math.random() }>
                        <View style={{display:'flex', flexDirection: 'row', alignContent: 'center' }}>
                          <View style={ styles.subTitleMarker }/>
                          <View style={{marginHorizontal: 10}}>
                            <Text style={{ fontSize: 18}}>해설 {index+1}</Text>
                          </View>
                        </View>
                        <View>
                          <ImageComponent uri={`${assetsServerUrl}/upload/${el.image_path}`} />
                          {/* <Image source= {{ uri: `${assetsServerUrl}/upload/${el.image_path}` }} 
                            style={{height: '100%'}}
                          /> */}
                        </View>
                      </View>
                    )
                  })
                }

              </View>
            </View>
        }

        {
          videoUrl && 
          ( 
            <View style={{ backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 20}}>
              <TouchableOpacity
                onPress={() => Linking.openURL(videoUrl)}
                >
                <View style={ styles.playVideoButtonWrapper}>
                  <View>
                    <Image source={ require('../../../assets/img/play_icon.png')} />
                  </View>
                  <View>
                    <Text style={{ color: Colors.WramMain, fontSize: 15, padding: 7 }}>해설영상</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        }

      
    </View>
  );
}

export default QuestionAndSolution;

export const styles = StyleSheet.create({
  subTitleMarker: {
    borderRightWidth: 2,
    borderRightColor: 'rgb(122,122,122)',
    height: 20,
    alignSelf: 'center'
  },
  container: {
    flex:1, 
  },
  titleWrapper: {
    marginBottom: 10,
    marginTop: 35,
    color: Colors.DeepBlack,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  title: {
    fontSize: 24,
  },
  sectionContentWrapperWithTopBorder:{
    backgroundColor:'#fff',
    flex:1, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  sectionContentWrapper:{
    backgroundColor:'#fff',
    flex:1, 
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  playVideoButtonWrapper: {
    display: 'flex', 
    height: 50,
    justifyContent: 'center', 
    alignItems:'center',
    borderWidth: 1, 
    borderColor: Colors.Main, 
    borderRadius: 2, 
    flex: 1, 
    marginTop: 25, 
    marginBottom: 40,
    flexDirection: 'row' 
  },
})