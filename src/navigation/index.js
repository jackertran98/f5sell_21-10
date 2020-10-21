import React, { useState, useEffect } from "react";
import {Easing} from "react-native";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/FontAwesome5Pro";
import MyHomeStack from "./homeNavigation";
import OrderStack from "./orderNavigation";
import MyProductStack from "./productNavigation";
import { connect } from "react-redux";
import { sizeWidth, sizeFont } from "../utils/helper/size.helper";
import RoseNavigation from '../navigation/roseNavigation'
import DrawerContent from '../navigation/homeNavigation/DrawerContent'
import StartNavigation from './startNavigation';
import Signin from '../views/account/register/signin/index'
import SignUp from '../views/account/register/signup/index'
import { _retrieveData } from '../utils/asynStorage'
import { TOKEN } from '../utils/asynStorage/store'
import SplashScreen from "../views/splashScreen";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const configNavigation ={
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
const AppStack = (props) => {
  
  return (
    <Tab.Navigator
      // initialRouteName="account"
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Home") {
            return (
              <Icon
                name={"home"}
                size={sizeFont(6)}
                color={color}
                solid
              />
            );
          } else if (route.name == "order") {
            return (
              <Icon
                name={"shopping-bag"}
                size={sizeFont(6)}
                color={color}
                solid
              />
            );
          }
          else if (route.name == "product")
            return (
              <Icon name={"dropbox"} size={sizeFont(6)} color={color} />
            );
          else if (route.name == "rose")
            return (
              <Icon name={"wallet"} size={sizeFont(6)} color={color} />
            );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#E1AC06",
        inactiveTintColor: "#969696",
        tabStyle: {
          backgroundColor: "white",

        },
        labelStyle: {
          flex: 1,
          fontSize: 13,
        },
        labelPosition: "below-icon",
        style: {
          paddingTop: 10,
          height: '8%',
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={MyHomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="order"
        component={OrderStack}
        options={{ title: "Đơn hàng" }}
      />
      <Tab.Screen
        name="product"
        component={MyProductStack}
        options={{ title: "Sản phẩm" }}
      />
      <Tab.Screen
        name="rose"
        component={RoseNavigation}
        options={{ title: "Hoa hồng" }}
      />
    </Tab.Navigator>
  )
}
const DrawerNavigator = (props) => (
  
  <Drawer.Navigator
    initialRouteName="home"
    drawerContent={props => <DrawerContent {...props} />}
  >
    <Drawer.Screen
      title='Home'
      component={AppStack}
      name="home"
    />
  </Drawer.Navigator>
)
function AppNavigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          transitionSpec: {
            open: configNavigation,
            close: configNavigation,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Tab.Screen name="SplashScreen" component={SplashScreen} />
        <Tab.Screen name="screenHome" component={DrawerNavigator} />
        <Tab.Screen name="screen1Login" component={StartNavigation} />
        <Tab.Screen name="signin" component={Signin} />
        <Tab.Screen name="SignUp" component={SignUp} />
        <Tab.Screen name="startOne" component={StartNavigation} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = (state) => {
  console.log('ádfsadfsdf', state);
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigation);
