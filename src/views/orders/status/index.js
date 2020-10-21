import React, { Component, PureComponent } from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import SearchComponent from "../../../components/search";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import IconComponets from "../../../components/icon";
import styles from "../style";
import { COLOR } from "../../../utils/color/colors";
import ItemCommon from "../../../components/itemFlat";

class StatusOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  render() {
    const { search } = this.state;
    const { onSetStatus } = this.props.route.params;
    return (
      <View style={styles.containerCommon}>
        <SearchComponent
          name="search"
          color="#fff"
          size={sizeFont(6)}
          value={search}
          placeholder={"Tìm kiếm"}
          onChangeText={(text) => this.setState({ search: text })}
          style={{}}
          isIcon={false}
        />
        <View style={styles.viewTouchCommon}>
          <ItemCommon
            title="- None -"
            name="chevron-right"
            onPress={() => {
              onSetStatus("");
              this.props.navigation.goBack();
            }}
          />
          <ItemCommon
            title="Đã hoàn thành"
            name="chevron-right"
            onPress={() => {
              ///alert("0");
              onSetStatus(0);
              this.props.navigation.goBack();
            }}
          />
          <ItemCommon
            title="Đã tiếp nhận"
            name="chevron-right"
            onPress={() => {
              onSetStatus(1);
              this.props.navigation.goBack();
            }}
          />
          <ItemCommon
            title="Đang xử lý"
            name="chevron-right"
            onPress={() => {
              onSetStatus(2);
              this.props.navigation.goBack();
            }}
          />
          <ItemCommon
            title="Đang vận chuyển"
            name="chevron-right"
            onPress={() => {
              onSetStatus(3);
              this.props.navigation.goBack();
            }}
          />
          <ItemCommon
            title="Đã huỷ"
            name="chevron-right"
            onPress={() => {
              onSetStatus(4);
              this.props.navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  }
}
export default StatusOrder;
