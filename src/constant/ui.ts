
import { Dimensions} from 'react-native'


export const HEIGHT = Dimensions.get("window").height
export const WIDTH = Dimensions.get("window").width

enum Colors {
  'Main'= 'rgb(42,127,245)',
  'DeepBlack'= 'rgb(25,25,25)', 
  'DeepMain'= 'rgb(47, 117, 213)',
  'WramMain' = 'rgb(22,103,206)'
}

export {Colors}