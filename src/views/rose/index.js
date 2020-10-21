import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Platform,
  TextInput,
  ScrollView,
  RefreshControl,
  SectionList,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import HeaderHome from "./header";
import { COLOR } from "../../utils/color/colors";
import { HeaderRightComponet } from "../../components/header";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../utils/helper/size.helper";
import { connect } from "react-redux";
import { LoginPhone, UpdateDivice, GetProfile } from "../../action/authAction";
import { _retrieveData } from "../../utils/asynStorage";
import { AUTH, USER_NAME } from "../../utils/asynStorage/store";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom, AlertCommon } from "../../components/error";
import ListProducts from "./listItem";
import IconComponets from "../../components/icon";
import Modal from "react-native-modal";
import SplashScreen from "react-native-splash-screen";
import {
  getListSubProducts,
  getListProducts,
  getListProductDetails,
  getListSubChildProducts,
  getParentsItem,
} from "../../service/products";
import { GetListCTV } from "../../service/account";
import SearchComponent from "./search";
import { getListNotify } from "../../service/notify";
import { countNotify } from "../../action/notifyAction";
//const unsubscribe;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      refreshing: false,
      search: "",
      loadingSearch: false,
      message: "",
      dataSub: [],
      showModal: false,
    };
    this.see = false;

    this.message;
    this.refs.viewHome;
    //this._unsubscribe;
  }
  handleSearch = async () => {
    await getListSubProducts({
      USERNAME: this.props.username == "" ? null : this.props.username,
      ID_PARENT: null,
      IDSHOP: "ABC123",
      SEARCH_NAME: this.state.search,
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          for (let i = 0; i < result.data.DETAIL.length; i++) {
            result.data.DETAIL[i].data = result.data.DETAIL[i].INFO;
          }
          this.setState(
            {
              data: result.data.DETAIL,
            },
            () => {
              this.setState({ loadingSearch: false });
            }
          );
        } else {
          this.setState(
            {
              loadingSearch: false,
            },
            () => {
              this.message = setTimeout(
                () => AlertCommon("Thông báo", result.data.RESULT, () => null),
                10
              );
            }
          );
        }
      })
      .catch((error) => {
        this.setState({ loadingSearch: false });
      });
  };
  handleLoad = async () => {
    var resultArray = [];
    const data = await _retrieveData(USER_NAME)
      .then(async (result) => {
        if (result) {
          await this.props
            .GetProfile({
              IDSHOP: "ABC123",
              USER_CTV: result.substr(1).slice(0, -1),
              USERNAME: result.substr(1).slice(0, -1),
            })
            .then((result) => { })
            .catch((error) => {
              this.setState({ loading: false });
            });
          getListNotify({
            USERNAME: result.substr(1).slice(0, -1),
            PAGE: 1,
            NUMOFPAGE: 5,
            IDSHOP: "ABC123",
          })
            .then((result) => {
              if (result.data.ERROR === "0000") {
                this.props.countNotify(result.data.SUM_NOT_READ);
              } else {
              }
            })
            .catch((error) => {
            });
          await getListSubProducts({
            USERNAME: result.substr(1).slice(0, -1),
            ID_PARENT: null,
            IDSHOP: "ABC123",
            SEARCH_NAME: this.state.search,
          })
            .then((result) => {
              if (result.data.ERROR == "0000") {
                for (let i = 0; i < result.data.DETAIL.length; i++) {
                  result.data.DETAIL[i].data = result.data.DETAIL[i].INFO;

                  //resultArray.push(result.data.DETAIL[i]);
                }
                this.setState(
                  {
                    data: result.data.DETAIL,
                  },
                  () => {
                    this.setState({ loading: false });
                  }
                );
              } else {
                this.setState({ loading: false }, () =>
                  AlertCommon("Thông báo", result.data.RESULT, () => null)
                );
              }
            })
            .catch((error) => {
              this.setState({ loading: false });
            });
        } else {
          await getListSubProducts({
            USERNAME: null,
            ID_PARENT: null,
            IDSHOP: "ABC123",
            SEARCH_NAME: this.state.search,
          })
            .then((result) => {
              if (result.data.ERROR == "0000") {
                for (let i = 0; i < result.data.DETAIL.length; i++) {
                  result.data.DETAIL[i].data = result.data.DETAIL[i].INFO;

                  //resultArray.push(result.data.DETAIL[i]);
                }
                this.setState(
                  {
                    data: result.data.DETAIL,
                  },
                  () => {
                    this.setState({ loading: false });
                  }
                );
              } else {
                this.setState({ loading: false }, () =>
                  AlertCommon("Thông báo", result.data.RESULT, () => null)
                );
              }
            })
            .catch((error) => {
              this.setState({ loading: false });
            });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };
  async componentDidMount() {
    this.handleLoad();
    const { navigation } = this.props;
    navigation.setParams({
      onPressOne: () => navigation.navigate("NewItem"),
    });
    navigation.setParams({
      onPressTwo: () => null,
    });
    navigation.setParams({
      onPressThree: () => null,
    });
  }

  onRefreshing = () => {
    this.handleLoad();
  };
  componentWillUnmount() {
    // this._unsubscribe();
    clearTimeout(this.message);
  }
  onFocus = () => {
    this.see = true;
  };
  onBlur = () => {
    this.see = false;
  };
  onChange = (text) => {
    this.setState({ search: text });
  };
  loadingSear = () => {
    this.setState({
      loadingSearch: true,
    });
  };
  deleteSearch = () => {
    this.setState({ search: "" });
  };
  render() {
    const {
      loading,
      data,
      refreshing,
      search,
      loadingSearch,
      showModal,
      dataSub,
    } = this.state;
    return loading ? (
      <Spinner
        visible={loading}
        animation="fade"
        customIndicator={<ElementCustom />}
        overlayColor="#ddd"
      />
    ) : (

        <ScrollView>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Spinner
              visible={loadingSearch}
              customIndicator={<ElementCustom />}
            //overlayColor="#ddd"
            />
            <StatusBar
              barStyle={"light-content"}
              backgroundColor={COLOR.HEADER}
            //translucent
            />
            <HeaderHome />
            <ListProducts
              data={data}
              refreshing={refreshing}
              navigation={this.props.navigation}
              onRefreshing={this.onRefreshing}
              search={this.state.search}
              see={this.see}
              handleSearch={this.handleSearch}
              loadingSearch={this.state.loadingSearch}
              onBlurs={this.onBlur}
              onFocuss={this.onFocus}
              onChange={this.onChange}
              loadingSear={this.loadingSear}
              deleteSearch={this.deleteSearch}
            />
          </View>
        </ScrollView>

      );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LoginPhone: (data) => dispatch(LoginPhone(data)),
    UpdateDivice: (data) => dispatch(UpdateDivice(data)),
    GetProfile: (data) => dispatch(GetProfile(data)),
    countNotify: (text) => dispatch(countNotify(text)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

/**status = 0 ==> đã hoàn thành
status = 1 ==> đã tiếp nhận
status = 2 ==> đang xử lý
status = 3 ==> đang vận chuyển
status = 4 ==> đã hủy  */
