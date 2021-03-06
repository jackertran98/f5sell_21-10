import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Itemorder from "../itemorder";
import Itemstore from "../itemstore";
class CompletedOrder extends Component {
  render() {
    const { navigation, name } = this.props;
    return name === "OrderUser" ? (
      <Itemorder TYPE={0} navigation={navigation} name={name} />
    ) : (
      <Itemstore TYPE={5} navigation={navigation} name={name} />
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     status: state.authUser.status,
//     authUser: state.authUser.authUser,
//     username: state.authUser.username,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CompletedOrder);
export default CompletedOrder;
