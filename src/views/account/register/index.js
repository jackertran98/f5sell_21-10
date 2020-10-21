import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { COLOR } from "../../../utils/color/colors";
import { sizeFont } from "../../../utils/helper/size.helper";


export default class Register extends Component {
  
  render() {
    const { navigation,discription} = this.props;

    return (
      
      <View style={styles.container}>
        <View style={styles.viewTitle}>
            <Text style={{textAlign:'center',fontWeight:'bold',color:'#4B4C4B',textOverflow:'ellipsis '}}>F5 Sell</Text>
        <Text>
        { ((discription).length > 250) ? 
    (((discription).substring(0,249)) + '...') : 
    discription }
        </Text>
        </View>
        <TouchableOpacity
          style={styles.touchRegister}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.textSignin}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={[
            styles.touchRegister,
            { backgroundColor: COLOR.BUTTON_SIGN_UP},
          ]}
        >
          <Text style={styles.textSignin}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
