import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { getListOrder } from "../../../service/order";
import { ElementCustom } from "../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import Itemorder from "../itemorder";
import Itemstore from "../itemstore";
class CancelOrder extends Component {
  render() {
    const { name, navigation } = this.props;
    return name === "OrderUser" ? (
      <Itemorder TYPE={4} navigation={navigation} name={name} />
    ) : (
      <Itemstore TYPE={4} navigation={navigation} name={name} />
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
// )(CancelOrder);
export default CancelOrder;
