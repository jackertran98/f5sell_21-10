import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../utils/helper/size.helper";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  touch: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#999",
    borderBottomWidth: 1,
    paddingVertical: sizeHeight(2),
  },
  container: { marginTop: sizeHeight(1) },
  viewTouch: {
    width: sizeWidth(95),
    alignSelf: "center",
    marginTop: sizeHeight(2),
  },
  text: {
    fontSize: sizeFont(4),
  },
});

export default styles;
