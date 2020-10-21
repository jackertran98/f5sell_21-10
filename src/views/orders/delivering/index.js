import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import { connect } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Itemorder from "../itemorder";
import Itemstore from "../itemstore";
class DeliveringOrder extends Component {
  render() {
    const { name, navigation } = this.props;
    return name === "OrderUser" ? (
      <Itemorder TYPE={3} navigation={navigation} name={name} />
    ) : (
      <Itemstore TYPE={3} navigation={navigation} name={name} />
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
//   // mapStateToProps,
//   // mapDispatchToProps
// )(DeliveringOrder);
export default DeliveringOrder;
