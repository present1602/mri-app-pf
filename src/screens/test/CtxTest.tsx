import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {useAppContext} from '../../provider/RootProvider'

interface User {
  email: string,
  username: string
  grade: string
  sns_type: string
}
const CtxTest = () => {
  const [email, setEmail] = useState('email val')
  const [uname, setUname] = useState('user val')
  const [jval, setVal] = useState('json str')

  const {state, setUser} = useAppContext();

  useEffect(() => {
    // const {state} = useAppContext();
    const tempUser: User = {
      "email": "changeem",
      "username": "changekc",
      "grade": "10",
      "sns_type": "K",
    };

    setUser(tempUser);
    setVal(JSON.stringify(state))
  }, [])

 return (
   <View style={{ backgroundColor:'#fff', flex:1}}>
      <Text style={{fontSize:20, padding:20}}>context test</Text>
      <Text>{jval}</Text>
      {/* <Text>email : {email}</Text>
      <Text>user : {uname}</Text> */}
   </View>
 );
};

export default CtxTest