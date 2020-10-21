import { COLOR } from "../../../utils/color/colors";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../utils/helper/size.helper";
import { size } from "lodash";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  touchRegister: {
    backgroundColor: COLOR.BUTTON_SIGN_IN,
    paddingVertical: sizeHeight(2),
    width: sizeWidth(80),
    marginTop: sizeHeight(2),
    borderRadius:50,
  },
  textSignin: {
    color: "#fff",
    textAlign: "center",
    fontSize: sizeFont(4),
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewTitle: {
    height:sizeHeight(20),
    width:sizeWidth(88),
    borderRadius:10,
    borderColor:'#FCF5F5',
    backgroundColor:'#FCF5F5',
    fontSize: sizeFont(4),
    padding: 5,
  },
});

export default styles;
