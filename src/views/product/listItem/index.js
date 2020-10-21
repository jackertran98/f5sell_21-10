import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  SectionList,
  StatusBar,
  TextInput,
  Animated,
} from "react-native";
import { _retrieveData } from "../../../utils/asynStorage";
import IconComponets from "../../../components/icon";
import _ from "lodash";
import { Image } from "react-native-elements";
import {getListOrder} from "../../../service/order";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import {Getwithdrawal} from "../../../service/rose";
import { COLOR } from "../../../utils/color/colors";
import styles from "./style";
import { connect } from "react-redux";
import { handleMoney } from "../../../components/money";
import Loading from "../../../components/loading";
var numeral = require("numeral");
import moment from "moment";


class ListProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      stickyHeaderIndices: [0, 1, 2, 0],
      scrollY: new Animated.Value(0),
      commission: '',
      Data:[],
      Rose:[],
      endTime: moment(new Date()).format("DD/MM/YYYY"),
    };
    this.count = 0;
  }
  handLoading =()=> { 
    this.setState({loading:true},async ()=>{
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
                  Data: res.data.INFO,
                  loading:false
              })
          } else {
              this.showToast(res);
          }
      })
      .catch((err) => {
      });
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
          console.log("roseeee",res); 
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
    })
  }
  componentDidMount(){
    this.handLoading();
  }
  handleScreen = (text, title, type) => {
    const { navigation } = this.props;
    navigation.navigate(text, { TITLE: title, TYPE: type });

  };

  render() {
    const {
      data,
      refreshing,
      navigation,
      onRefreshing,
      status,
      authUser,
    } = this.props;
    const {Data,loading,Rose} =this.state;
    return (
      <View style={{marginBottom:sizeHeight(5)}}>
        <View style={{ margin: sizeHeight(1) }} >
          {authUser.GROUPS === "3" ? (
            <View style={{ height: 100, width: '100%' }}>
              <Text style={{ height: 40, borderRadius: 5, backgroundColor: '#149CC6', color: 'white', textAlign: 'center', paddingTop: 8, fontSize: 16 }}>
                Số đơn hàng đang chờ xử lý hiện tại
                </Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                {loading===false?<View style={{ flex: 1, flexDirection: 'row' }}>
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
                </View>:<Loading />}
                <View>
                  <TouchableOpacity
                    onPress={()=>{
                        
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
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                      source={require('../../../assets/images/monney.png')}
                      style={{
                        height: 40,
                        width: 40
                      }}
                    />
                    {status === "" ? (<Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingTop: 8, paddingLeft: 5 }}>0 đ</Text>) : (
                      <Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingTop: 8, paddingLeft: 5 }}>
                        {Rose.length===0?0:numeral(Rose[0].BALANCE).format("0,0")}đ
                      </Text>
                    )}
                  </View>
                  <View>
                    <TouchableOpacity
                      
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
        </View>
        <View style={{ marginTop: sizeHeight(1) }}>
          <Animated.SectionList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              {
                useNativeDriver: false,
              }
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefreshing}
              />
            }
            sections={data}
            contentContainerStyle={{ paddingBottom: sizeHeight(25) }}
            keyExtractor={(item, index) => {
              return index;
            }}
            renderItem={({ item, section, index }) => {
              if (index == section.INFO.length - 1) {
                this.count = 0;
              }

              return this.count == 0 ? (
                <View
                  style={{
                    borderBottomWidth: 6,
                    borderBottomColor: COLOR.COLOR_BOTTOM,
                    paddingLeft: sizeWidth(2.5),
                  }}
                >
                  <FlatList
                    data={section.INFO}
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
              ) : null;
            }}
            stickySectionHeadersEnabled={true}
            renderSectionHeader={({ section: { PARENT_NAME, ID } }) => (
              <View style={styles.viewHeader}>
                <Text style={styles.title}>{PARENT_NAME} </Text>
                <TouchableOpacity
                  style={styles.touchViewMore}
                  onPress={() => {
                    navigation.navigate("ChildListItem", {
                      name: PARENT_NAME,
                      ID: ID,
                    });
                  }}
                >
                  <Text style={styles.textViewMore}>Xem tất cả</Text>
                  <IconComponets
                    size={sizeFont(4)}
                    color={"#166CEE"}
                    name="chevron-right"
                  />
                </TouchableOpacity>
              </View>
            )}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts);
