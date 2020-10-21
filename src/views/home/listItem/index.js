import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { _retrieveData } from "../../../utils/asynStorage";
import { getListOrder } from "../../../service/order"
import _ from "lodash";
import { Image } from "react-native-elements";
import Loading from '../../../components/loading';

import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import styles from "./style";
import { connect } from "react-redux";
import { handleMoney } from "../../../components/money";
import { Getwithdrawal } from "../../../service/rose";
import moment from "moment";
var numeral = require("numeral");

class ListProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyHeaderIndices: [0, 1, 2, 0],
      scrollY: new Animated.Value(0),
      Data: [],
      loading: false,
      Rose: [],
      endTime: moment(new Date()).format("DD/MM/YYYY"),
      loading: true,
      search:'',
    };
  }
  handleLoad = async () => {
    await getListOrder({
      USERNAME: '',
      USER_CTV: '',
      START_TIME: '',
      END_TIME: '',
      STATUS: '',
      PAGE: 1,
      NUMOFPAGE: 200,
      IDSHOP: "ABC123",
    })
      .then((res) => {
        if (res.data.ERROR == "0000") {
          this.setState({
            Data: res.data.INFO
          })
        } else {
          this.showToast(res);
        }
      })
      .catch((err) => {
      });
  }
  handleLoad1 = async () => {
    await Getwithdrawal({
      USERNAME: this.props.username,
      USER_CTV: this.props.username,
      START_TIME: "01/01/2018",
      END_TIME: this.state.endTime,
      PAGE: 1,
      NUMOFPAGE: 10,
      IDSHOP: "ABC123",
    })
      .then((res) => {
        console.log("roseeee", res);
        if (res.data.ERROR == "0000") {
          this.setState({
            Rose: res.data.INFO
          })
        } else {
          this.showToast(res);
        }
      })
      .catch((err) => {
      });
  }
  componentWillReceiveProps=(nextProps,nextState)=>{
    if(this.props.search!=nextProps.search){
      this.setState({
          search:this.props.search
      })
    }
  }
  componentDidMount() {
    this.handleLoad();
    this.handleLoad1();
  }
  handleScreen = (text, title, type) => {
    const { navigation } = this.props;
    navigation.navigate(text, { TITLE: title, TYPE: type });
  };
  render() {
    const {
      data,
      navigation,
      status,
      authUser,
    } = this.props;
    const { Data, Rose, loading,search } = this.state;
    return (
      <View>

        <View style={{ margin: sizeHeight(1) }} >
          {authUser.GROUPS === "3" ? (
            <View style={{ height: 100, width: '100%' }}>
              <Text style={{ height: 40, borderRadius: 5, backgroundColor: '#149CC6', color: 'white', textAlign: 'center', paddingTop: 8, fontSize: 16 }}>
                Số đơn hàng đang chờ xử lý hiện tại
                </Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                {loading === true ? <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Image
                    source={require('../../../assets/images/monney.png')}
                    style={{
                      height: 40,
                      width: 40
                    }}
                  />
                  <Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingTop: 8, paddingLeft: 5 }}>
                    {Data.length} đơn
                      </Text>
                </View> : <Loading />}
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ loading: false }, async () => {
                        await this.handleLoad1();
                        this.setState({ loading: true })
                      })
                    }}
                  >
                    <Image
                      source={require('../../../assets/images/reload.png')}
                      style={{
                        height: 40,
                        width: 40
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>) : (
              <View style={{ height: 100, width: '100%' }}>
                <Text style={{ height: 40, borderRadius: 5, backgroundColor: '#149CC6', color: 'white', textAlign: 'center', paddingTop: 8, fontSize: 16 }}>
                  Số dư hoa hồng hiện tại
                     </Text>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  {loading ? <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                      source={require('../../../assets/images/monney.png')}
                      style={{
                        height: 40,
                        width: 40
                      }}
                    />
                    {status === "" ? (<Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingTop: 8, paddingLeft: 5 }}>0 đ</Text>) : (
                      <Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingTop: 8, paddingLeft: 5 }}>
                        {Rose.length === 0 ? 0 : numeral(Rose[0].BALANCE).format("0,0")} đ
                      </Text>
                    )}
                  </View> : <Loading />}
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ loading: false }, async () => {
                          await this.handleLoad1();
                          this.setState({ loading: true })
                        })
                      }}
                    >
                      <Image
                        source={require('../../../assets/images/reload.png')}
                        style={{
                          height: 40,
                          width: 40
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          <View style={{ height: 5, backgroundColor: '#F1F2F2' }}></View>

        </View>
        <View style={{ paddingLeft: 5, paddingRight: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: sizeFont(4.5) }}>Sản phẩm hot</Text>
            <Text style={{ fontSize: sizeFont(4.5) }}
              onPress={() => this.props.navigation.push('Product') }
            >Xem thêm</Text>
          </View>
          <FlatList
            data={data.INFO}
            horizontal={true}
            renderItem={({ item, index }) => {
              this.count = this.count + 1;
              return (
                <TouchableOpacity
                  style={styles.touchFlatListChild}
                  onPress={() =>
                    navigation.navigate("DetailProducts", {
                      ID_PRODUCT: item.ID_PRODUCT,
                      NAME: "Home",
                    })
                  }
                >
                  <View
                    style={{
                      width: "100%",
                      height: sizeHeight(15),
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.IMAGE_COVER }}
                      PlaceholderContent={<ActivityIndicator />}
                      resizeMode="contain"
                      style={styles.imageSize}
                    />
                  </View>
                  <Text style={styles.textName}>
                    {_.truncate(item.PRODUCT_NAME, {
                      length: 12,
                    })}{" "}
                  </Text>
                  <Text style={styles.textPrice}>
                    {numeral(
                      handleMoney(status, item, authUser)
                    ).format("0,0")} đ
                          </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.ID_PRODUCT.toString()}
          />
        </View>

      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    search:state.notify.searchproduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts);
