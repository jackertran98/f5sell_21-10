import React, { useState } from "react";
import { createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet, TextInput, Image, View,Easing } from "react-native";
import Order from "../../views/ordermain";
import { COLOR } from "../../utils/color/colors";
import DetailOrder from "../../views/ordermain/detailorder";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../utils/helper/size.helper";
import { valueSearch } from "../../action/notifyAction";
import Notification from "../../views/notification";

import {
  HeaderLeftComponet,
  HeaderRightComponet,
} from "../../components/header";
import { connect } from "react-redux";

const HomeStack = createStackNavigator();

const configNavigation = {
  // animation: "spring",
  // config: {
  //   stiffness: 1000,
  //   damping: 500,
  //   mass: 7,
  //   overshootClamping: true,
  //   restDisplacementThreshold: 0.01,
  //   restSpeedThreshold: 0.01,
  // },
  animation: "timing",
  config: {
    duration: 300,
    easing: Easing.bezier(0, 0.25, 0.5, 0.75, 1),
  }
}

MyHomeStack = (props) => {


  const { status, navigation, route, authUser, listItem, countNotify, searchProduct } = props;
  console.log({ props });
  const [value, setvalue] = useState('')
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <HomeStack.Navigator
      screenOptions={{
        transitionSpec: {
          open: configNavigation,
          close: configNavigation,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

      }}
    >
      <HomeStack.Screen
        name="Order"
        component={Order}
        options={({ route }) => ({
          title: "Đơn hàng",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: sizeHeight(8),
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",

          },
          // headerTitle: () => {
          //   return (
          //     <TextInput
          //       placeholder="Tìm kiếm"
          //       returnKeyType="search"
          //       onChangeText={(text) => setvalue(text)}
          //       onSubmitEditing={() => valueSearch(value)}
          //       style={{
          //         height: 40,
          //         paddingLeft: 15,
          //         width: '90%',
          //         borderColor: 'white',
          //         borderWidth: 1,
          //         backgroundColor: 'white',
          //         marginLeft: sizeWidth(5),
          //       }}
          //     />
          //   )
          // },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../../assets/images/list.png')}
                style={{
                  width: 28,
                  height: 28,
                  marginLeft: sizeWidth(5)
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => {
            return (
              <View style={{ marginRight: 10 }}>
                <HeaderLeftComponet
                  navigation={navigation}
                  onPress={() => navigation.navigate("Thông báo", {
                    NAME: "Order",
                  })}
                  name="bell"
                  size={sizeFont(6)}
                  color="#fff"
                />
              </View>
            );
          },
        })}
      />
      <HomeStack.Screen
        name="DetailOrder"
        component={DetailOrder}
        options={({ route }) => ({
          title: "Chi tiết đơn hàng",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: sizeHeight(8),
          },
          headerTitleAlign:"center",
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: '#fff',
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row" }}>
                <HeaderLeftComponet
                  navigation={navigation}
                  onPress={() => navigation.navigate("Thông báo")}
                  name="bell"
                  size={sizeFont(6)}
                  color="#fff"
                />
              </View>
            );
          },
        })}
      />
      <HomeStack.Screen
        name="Thông báo"
        component={Notification}
        options={({ route }) => ({
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          // headerLeft: () => (
          //   <HeaderLeftComponet
          //     navigation={navigation}
          //     onPress={() => navigation.navigate(route.params.NAME)}
          //     name="chevron-left"
          //     size={sizeFont(6)}
          //     color="#fff"
          //   />
          // ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => null}
              name="list"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    listItem: state.order.listItem,
    countNotify: state.notify.countNotify,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    valueSearch: (text) => dispatch(valueSearch(text))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHomeStack);
