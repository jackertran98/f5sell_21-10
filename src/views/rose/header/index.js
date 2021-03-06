import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
  TextInput,
  Animated,
  ScrollView,
  Button
} from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import styles from "./styles";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../../utils/color/colors";
import IconComponets from "../../../components/icon";
class HeaderHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleScreen = (text, title, type) => {
    const { navigation } = this.props;
    navigation.navigate(text, { TITLE: title, TYPE: type });
  };
  render() {
    const {
      navigation,
      search,
      see,
      handleSearch,
      loadingSearch,
      onBlurs,
      onFocuss,
      onChange,
      loadingSear,
      deleteSearch,
      authUser,
    } = this.props;
    return (
      <View>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={COLOR.HEADER}
          //translucent
        />
        {authUser.GROUPS==='3'?(
        <View style={{ margin: sizeHeight(1) }} >
          <View style={{ height: 100, width: '100%' }}>
            <Text style={{ height: 40, borderRadius: 5, backgroundColor: '#222220', color: 'white', textAlign: 'center', paddingTop: 8, fontSize: 16 }}>
              Số dư hoa hồng hiện tại
                </Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image
                  source={require('../../../assets/images/monney.png')}
                  style={{
                    height: 40,
                    width: 40
                  }}
                />
                <Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingTop: 8, paddingLeft: 5 }}>
                  5.000.000 đ
                 </Text>
              </View>
            </View>
          </View>
        </View>):null}
        <View style={{height:5,backgroundColor:'#E1AC06'}}></View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderHome);