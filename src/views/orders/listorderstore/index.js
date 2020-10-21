import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
var numeral = require("numeral");
import styles from "./style";
import IconComponets from "../../../components/icon";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { isIphoneX } from "react-native-iphone-x-helper";
import moment from "moment";
import { sum } from "lodash";
export default class ListOrderedStore extends PureComponent {
  state = {
    refreshing: false,
  };
  render() {
    const {
      data,
      navigation,
      onEndReached,
      loading,
      onMomentumScrollBegin,
      onRefresh,
      authUser,
      TYPE,
      name,
    } = this.props;
    console.log("onMomentumScrollBegin", TYPE, data);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={data.length == 0 ? null : data}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: sizeHeight(5),
              }}
            >
              <Text>Chưa có đơn hàng</Text>
            </View>
          )}
          keyExtractor={(item) => item.ID}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{ paddingBottom: sizeHeight(5) }}
          scrollToOverflowEnabled={0.5}
          onEndReached={onEndReached}
          onMomentumScrollBegin={onMomentumScrollBegin}
          extraData={this.props}
          ListFooterComponent={() => {
            return loading ? (
              <ActivityIndicator size={sizeFont(7)} color="red" />
            ) : null;
          }}
          renderItem={({ item, index }) => {
            var sums = item.PRICE;
            return (
              <TouchableOpacity
                style={styles.touchView}
                onPress={() =>
                  navigation.navigate("DetailOrderStore", {
                    CODE_ORDER: item.CODE_ORDER,
                    TYPE: TYPE,
                    NAME: name,
                  })
                }
              >
                {TYPE === 0 ? null : (
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#999",
                      paddingBottom: sizeHeight(1),
                      flexDirection: "row",
                    }}
                  >
                    <Text style={styles.textCommon}>Kho:</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.viewChild,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Text style={styles.textCode}>Mã ĐH: {item.CODE_ORDER} </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <IconComponets
                      name="stopwatch"
                      size={sizeFont(5)}
                      color={"#666"}
                    />
                    <Text style={styles.textStatus}>
                      {moment(item.CREATE_DATE, "DD/MM/YYYY h:mm:ss").format(
                        "H:mm"
                      ) +
                        " " +
                        moment(item.CREATE_DATE, "DD/MM/YYYY").format(
                          "DD/MM/YYYY"
                        )}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    borderBottomColor: "#DDD",
                    borderBottomWidth: 2,
                    flexDirection: "row",
                    paddingBottom: sizeHeight(2),
                    //paddingVertical: sizeHeight(1),
                  }}
                >
                  <FlatList
                    data={item.DETAIL_ORDER}
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            width: sizeWidth(93),
                            marginTop: sizeHeight(1),
                          }}
                        >
                          <Image
                            source={{ uri: item.img }}
                            style={{
                              width: sizeWidth(15),
                              height: sizeHeight(10),
                              flex: 1,
                            }}
                            resizeMode="contain"
                          />
                          <View style={{ marginLeft: sizeWidth(2.5), flex: 4 }}>
                            <View style={styles.viewProduct}>
                              <Text style={{ fontSize: sizeFont(3.7) }}>
                                {item.name}{" "}
                              </Text>
                            </View>
                            <View style={styles.viewProduct}>
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  fontSize: sizeFont(4),
                                }}
                              >
                                {item.model}{" "}
                              </Text>
                            </View>
                            <View style={styles.viewProduct}>
                              <Text>Thuộc tính</Text>
                              <Text
                                style={{
                                  color: COLOR.BUTTON,
                                  fontSize: sizeFont(4),
                                }}
                              >
                                {item.prop}
                              </Text>
                            </View>
                            <View style={styles.viewProduct}>
                              <Text>Đơn giá thu KH</Text>
                              <Text
                                style={{
                                  color: COLOR.BUTTON,
                                  fontSize: sizeFont(4),
                                }}
                              >
                                {numeral(sums).format("0,0")}
                                {" VNĐ"}
                              </Text>
                            </View>
                            <View style={styles.viewProduct}>
                              <Text>Số lượng</Text>
                              <Text
                                style={{
                                  color: COLOR.BUTTON,
                                  fontSize: sizeFont(4),
                                }}
                              >
                                x{item.num}{" "}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                    keyExtractor={(item) => item.model}
                  />
                </View>
                <View style={styles.viewChild}>
                  <Text
                    style={styles.textStore}
                    onPress={() =>
                      navigation.navigate("DetailsOrdered", {
                        CODE_ORDER: item.CODE_ORDER,
                        TYPE: TYPE,
                        NAME: name,
                      })
                    }
                  >
                    Đơn đại lý
                  </Text>
                  <Text style={styles.textCommon}>
                    {item.UNIT === 1 ? "Kho thu tiền" : "Shop thu tiền"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
