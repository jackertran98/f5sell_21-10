import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView,RefreshControl } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import { getListOrder } from '../../../service/order';
import Loading from '../../../components/loading';

class ShopOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: moment()
                .add(-200, "day")
                .format("DD/MM/YYYY"),
            endTime: moment(new Date()).format("DD/MM/YYYY"),
            Data: [],
            isDatePickerVisible: false,
            inDateEndPicker: false,
            loading: true,
            refreshing: false,
            selectedValue: 'Tất cả',
            refreshing:false,
        }
    }

    showDatePicker1 = () => {
        this.setState({
            isDatePickerVisible: true,
        })
    };
    hideDatePicker1 = () => {
        this.setState({
            isDatePickerVisible: false,
        })
    };
    handleConfirm1 = (date) => {
        this.setState({
            startTime: moment(date).format("DD/MM/YYYY")
        })

        this.hideDatePicker1();
    };


    showDatePicker2 = () => {
        this.setState({
            inDateEndPicker: true,
        })
    };
    hideDatePicker2 = () => {
        this.setState({
            inDateEndPicker: false,
        })
    };
    handleConfirm2 = (date) => {
        this.setState({
            endTime: moment(date).format("DD/MM/YYYY")
        })

        this.hideDatePicker2();
    };
    onRefresh = () => {
         getListOrder({
            USERNAME: this.props.username,
            USER_CTV: this.props.username,
            START_TIME: '',
            END_TIME: '',
            STATUS: '',
            PAGE: 1,
            NUMOFPAGE: 200,
            IDSHOP: "ABC123",
        })
          .then((result) => {
            if (result.data.ERROR === "0000") {
              this.setState({ data: result.data.INFO }, () => {});
            } else {
              this.setState({ loading: false }, () => {
                this.message = setTimeout(() => {
                  AlertCommon("Thông báo", result.data.RESULT, () => null);
                }, 10);
              });
            }
          })
          .catch((error) => {
            this.setState({ loading: false });
          });
      };
    handleLoad =  () => {
         getListOrder({
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
                console.log("get list Order",res);
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
    }
    componentDidMount() {
        this.handleLoad();
    }
    checkColor=(a)=>{
        if(a=='Đã tiếp nhận'){
            return <Text style={{backgroundColor:'#E1AC06',padding:4,color:'#FFFFFF',paddingLeft:15,paddingRight:15}}>Đã tiếp nhận</Text>
        }else if (a=='Đã hủy'){
            return <Text style={{backgroundColor:'#FF0000',padding:4,color:'#FFFFFF',paddingLeft:35,paddingRight:35}}>Đã hủy</Text>
        }else if(a=='Đang xử lý'){
            return <Text style={{backgroundColor:'#149CC6',padding:4,color:'#FFFFFF',paddingLeft:15,paddingRight:15}}>Đang xử lý</Text>

        }else if(a=='Đang chuyển'){
            return <Text style={{backgroundColor:'#149CC6',padding:4,color:'#FFFFFF',paddingLeft:15,paddingRight:15}}>Đang chuyển</Text>
        }else{
            return <Text style={{backgroundColor:'#279907',padding:4,color:'#FFFFFF',paddingLeft:15,paddingRight:15}}>Hoàn thành</Text>
        }
    }
    render() {
        const { selectedValue, Data,loading } = this.state;
        console.log("DATA_CODEORDER", Data)
        return (
            <View style={{marginBottom:sizeHeight(30)}}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                    <View style={styles.confix}>
                        <TouchableOpacity
                            onPress={this.showDatePicker1}
                        >
                            <Text>Bắt đầu</Text>
                            <Text>{this.state.startTime}</Text>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={this.state.isDatePickerVisible}
                            mode="date"
                            onConfirm={this.handleConfirm1}
                            onCancel={this.hideDatePicker1}
                        />
                    </View>

                    <Image
                        style={{ width: 50, height: 50, marginRight: 40 }}
                        source={require('../../../assets/images/lich.png')}
                    />
                    <View style={styles.confix}>
                        <TouchableOpacity
                            onPress={this.showDatePicker2}
                        >
                            <Text>Kết thúc</Text>
                            <Text>{this.state.endTime}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={this.state.inDateEndPicker}
                            mode="date"
                            onConfirm={this.handleConfirm2}
                            onCancel={this.hideDatePicker2}
                        />
                    </View>

                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../../../assets/images/lich.png')}
                    />
                </View>
                <View style={styles.confix1}>

                    <View style={styles.confix2}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue) => this.setState({ selectedValue: itemValue })}
                        >
                            <Picker.Item label="Tất cả" value="0" />
                            <Picker.Item label="Đã tiếp nhận" value="Đã tiếp nhận" />
                        </Picker>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ loading: true }, async () => {
                                    await getListOrder({
                                        USERNAME: '',
                                        USER_CTV: '',
                                        START_TIME: this.state.startTime,
                                        END_TIME: this.state.endTime,
                                        STATUS: selectedValue,
                                        PAGE: 1,
                                        NUMOFPAGE: 10,
                                        IDSHOP: "ABC123",
                                    })
                                        .then((res) => {
                                            console.log("loc res",res)
                                            if (res.data.ERROR == "0000") {
                                                this.setState({
                                                    Data: res.data.INFO
                                                })
                                            } else {
                                                alert('Thông báo','Không có dữ liệu');
                                            }
                                        })
                                        .catch((err) => {
                                        });
                                    this.setState({ loading: false });
                                });
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: "center",
                                    backgroundColor: '#149CC6',
                                    padding: 10,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                }}
                            >
                                Lọc
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 3, backgroundColor: '#B8C4C4', marginTop: sizeHeight(5) }}></View>
                <Text style={{ fontSize: 18, paddingLeft: 5 }}>Tổng số đơn hàng: <Text style={{ fontWeight: "bold" }}>{Data.length} đơn</Text></Text>
                <View style={{ height: 3, backgroundColor: '#B8C4C4' }}></View>
                {loading?<Loading />:<ScrollView
                        refreshControl={
                            <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this.handleLoad()}
                            />
                          }
                >
                    {Data.length === 0 ? null : Data.map((Val, key) => (
                        <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("DetailOrder",{
                            ID:Val.CODE_ORDER
                        })
                          }
                          key={key}
                        >
                            <View style={{ borderColor: '#B8C4C4', borderWidth: 1, margin: 10, padding: 5 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontWeight: "bold"}}>
                                            Mã ĐH: {Val.CODE_ORDER}{" "}
                                        </Text>
                                    </View>
                                    <View>
                                        {this.checkColor(Val.STATUS_NAME)}
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>CTV:{Val.FULL_NAME_CTV}</Text>
                                    <Text style={{ marginLeft: sizeWidth(5) }}>Mã CTV: {Val.USER_CODE}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('../../../assets/images/clock.png')}
                                        style={{ width: sizeWidth(5), height: sizeHeight(5), }}
                                    />
                                    <Text>
                                        {Val.CREATE_DATE}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', borderColor: 'black', borderWidth: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            source={require('../../../assets/images/human.png')}
                                            style={{ width: sizeWidth(5), height: sizeHeight(5), }}
                                        />
                                        <Text style={{ color: '#F97932' }}>{Val.FULLNAME_RECEIVER}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: sizeWidth(5) }}>
                                        <Image
                                            source={require('../../../assets/images/phone.png')}
                                            style={{ width: sizeWidth(5), height: sizeHeight(5), }}
                                        />
                                        <Text style={{ color: '#F97932' }}>{Val.MOBILE_RECCEIVER}</Text>
                                    </View>
                                </View>
                                <View style={{ paddingTop: 7 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Tổng tiền: <Text style={{ color: '#F90000' }}>{numeral(Val.TOTAL_MONEY).format("0,0")}</Text></Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>}
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        status: state.authUser.status,
        authUser: state.authUser.authUser,
        username: state.authUser.username,
    };
};
const styles = StyleSheet.create({
    confix: {
        fontSize: 15,
        borderColor: '#E1AC06',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 2,
        borderRadius: 15,
    },
    confix1: {
        marginTop: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    confix2: {
        borderColor: '#E1AC06',
        borderWidth: 2,
        width: sizeWidth(40),
        height: sizeHeight(7),
        borderRadius: 15,
    }
})

export default connect(
    mapStateToProps,
    null
)(ShopOrder);
