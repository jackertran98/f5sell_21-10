import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "../style";
import SearchComponent from "../../../components/search";
import { sizeFont } from "../../../utils/helper/size.helper";
import ItemCommon from "../../../components/itemFlat";

export default class StatusBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  render() {
    const { search } = this.state;
    const { onSetStatus, TYPE, STATUS } = this.props.route.params;

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
          {/** <ItemCommon
            title="- None -"
            name="chevron-right"
            onPress={() => {
              onSetStatus("");
              this.props.navigation.goBack();
            }}
          /> */}
          {TYPE === 1 ? (
            <View>
              <ItemCommon
                title="Đang xử lý"
                name="chevron-right"
                onPress={() => {
                  onSetStatus(2);
                  this.props.navigation.goBack();
                }}
              />
              <ItemCommon
                title="Huỷ đơn hàng"
                name="chevron-right"
                onPress={() => {
                  onSetStatus(4);
                  this.props.navigation.goBack();
                }}
              />
            </View>
          ) : null}
          {TYPE === 2 ? (
            <View>
              <ItemCommon
                title="Đang chuyển"
                name="chevron-right"
                onPress={() => {
                  onSetStatus(3);
                  this.props.navigation.goBack();
                }}
              />
              <ItemCommon
                title="Huỷ đơn hàng"
                name="chevron-right"
                onPress={() => {
                  onSetStatus(4);
                  this.props.navigation.goBack();
                }}
              />
            </View>
          ) : null}
          {TYPE === 3 && STATUS === "Đang chuyển" ? (
            <View>
              <ItemCommon
                title="Đã giao hàng"
                name="chevron-right"
                onPress={() => {
                  onSetStatus(7);
                  this.props.navigation.goBack();
                }}
              />
              <ItemCommon
                title="Đã hoàn thành"
                name="chevron-right"
                onPress={() => {
                  onSetStatus(0);
                  this.props.navigation.goBack();
                }}
              />
              <ItemCommon
                title="Huỷ đơn hàng"
                name="chevron-right"
                onPress={() => {
                  onSetStatus(4);
                  this.props.navigation.goBack();
                }}
              />
            </View>
          ) : null}
          {TYPE === 7 ? (
            <View>
              <ItemCommon
                title="Đã hoàn thành"
                name="chevron-right"
                onPress={() => {
                  onSetStatus(0);
                  this.props.navigation.goBack();
                }}
              />
              <ItemCommon
                title="Huỷ đơn hàng"
                name="chevron-right"
                onPress={() => {
                  onSetStatus(4);
                  this.props.navigation.goBack();
                }}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
