import * as React from "react";
import { createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet, TextInput, Image, Easing } from "react-native";
import Rose from "../../views/rose/listItem/index";
import { COLOR } from "../../utils/color/colors";

import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../utils/helper/size.helper";
import Notification from "../../views/notification";
import Subchilditem from "../../views/rose/subchilditem";
import getwithdawal from "../../views/rose/subchilditem/getwithdawal";

import {
  HeaderLeftComponet,
  HeaderRightComponet,
} from "../../components/header";
import { connect } from "react-redux";
import { Badge, Text } from "react-native-paper";

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
  const { status, navigation, route, authUser, listItem, countNotify } = props;
  console.log({ props });
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return status === '' ? null : (
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
        name="Rose"
        component={Rose}
        options={({ route }) => ({
          title: "Hoa hồng",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: sizeHeight(8),
            color: 'white',
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: 'white',

          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../../assets/images/list.png')}
                style={{
                  width: 25,
                  height: 22,
                  marginLeft: 10
                }}
              />

            </TouchableOpacity>

          ),
        })}
      />


      <HomeStack.Screen
        name="Thông báo"
        component={Notification}
        options={{
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("Rose")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => null}
              name="list"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Chi tiết hoa hồng theo CTV"
        component={Subchilditem}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="Yêu cầu thanh toán"
        component={getwithdawal}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
        }}
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
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHomeStack);
