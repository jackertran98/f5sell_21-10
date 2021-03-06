import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, TextInput } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import { getDetailOrdered } from '../../service/order';
import { listStores, updateOrder } from '../../service/order';
var numeral = require("numeral");
import { handleMoney } from "../../components/money";

class OrderMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Data: [],
            List: [],
            loading: false,
            setSelectedValue: '',
            inDateEndPicker: false,
            selectedValue: 'Tất cả',
            startTime: moment()
                .add(-100, "day")
                .format("DD/MM/YYYY"),
            endTime: '',
            city:
                this.props.authUser.CITY == null
                    ? ""
                    : {
                        NAME: this.props.authUser.CITY,
                        MATP: this.props.authUser.CITY_ID,
                    },
            district:
                this.props.authUser.DISTRICT == null
                    ? ""
                    : {
                        NAME: this.props.authUser.DISTRICT,
                        MAQH: this.props.authUser.DISTRICT_ID,
                    },
            districChild:
                this.props.authUser.WARD == null
                    ? ""
                    : {
                        NAME: this.props.authUser.WARD,
                        XAID: this.props.authUser.WARD_ID,
                    },
        }
    }
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
    handleLoad = async () => {
        const { ID } = this.props.route.params;
        await getDetailOrdered({
            USERNAME: this.props.username,
            CODE_ORDER: ID,
            IDSHOP: "ABC123",
        })
            .then((res) => {
                console.log("this getDetailOrdered", res);
                if (res.data.ERROR == "0000") {
                    this.setState({
                        Data: res.data,
                        loading: true
                    })
                } else {
                    this.showToast(res);
                }
            })
            .catch((err) => {
            });
        await listStores({
            USERNAME: this.props.username,
            CODE_ORDER: ID,
            IDSHOP: "ABC123",
        })
            .then((res) => {
                console.log("this is listStores", res)
                if (res.data.ERROR == "0000") {
                    this.setState({
                        List: res.data.INFO,
                        loading: true
                    })
                } else {
                    this.showToast(res);
                }
            })
            .catch((err) => {
            });
    }
    // Data 
    // ADDRESS_RECEIVER: "Hà nội việt nam"
    // CREATE_DATE: "23/09/2020 16:10:19"
    // DISTCOUNT: null
    // EMAIL: "viettv@neo.vn"
    // ERROR: "0000"
    // EXTRA_SHIP: null
    // FULLNAME_RECEIVER: "f5sell"
    // FULL_NAME_CTV: "f5sell"
    // ID_CITY: "01"
    // ID_CODE_ORDER: "X43WFOD4"
    // ID_DISTRICT: "001"
    // MESSAGE: "SUCCESS"
    // MOBILE: "123456"
    // MOBILE_RECEIVER: "123456789"
    // NOTE: null
    // PAYED: "0"
    // REASON_SURCHARGE: null
    // RESULT: "Lấy đơn hàng chi tiết thành công"
    // STATUS: "1"
    // STATUS_EDIT: 0
    // STATUS_NAME: "Đã tiếp nhận"
    // SURCHARGE: "0"
    // TIME_RECEIVER: null
    // TOTAL_COMMISSION: "1650"
    // USER_CODE: "YU2L0E"
    // USER_COMMISSION: "0"


    // List
    // CODE_PRODUCT: "FCGVHB"
    // COMISSION_PRODUCT: "0"
    // COMMISSION: 1
    // COMMISSION_PRICE: "1650"
    // COMMISSION_PRODUCT: "0"
    // DISCOUNT: null
    // ID: "4"
    // ID_CODE_ORDER: "X43WFOD4"
    // ID_PRODUCT_PROPERTIES: "0"
    // IMAGE_COVER: "https://bizweb.dktcdn.net/thumb/1024x1024/100/321/400/products/stives-apricot-scrub-acne-control-283g.jpg"
    // MONEY: "165000"
    // NOTE: null
    // NUM: "1"
    // OD_PRODUCT_PROPERTIES: null
    // PRICE: "165000"
    // PRODUCT_COMMISSION: "0"
    // PRODUCT_NAME: "TẨY TẾ BÀO CHẾT NGỪA MỤN HÀNG MƠ  STIVES APRICOT SCRUB ACNE CONTROL 283G USA NEW LOOK"
    // PROPERTIES: null
    // STATUS_EDIT: 0
    handleNumber = (item) => {
        const { status, authUser } = this.props;
        var resutl = {
            AMOUNT: "",
            PRICE: "",
            CODE_PRODUCT: "",
            MONEY: "",
            BONUS: "",
            ID_PRODUCT_PROPERTIES: "",
        };
        for (let i = 0; i < item.length; i++) {
            resutl.AMOUNT = resutl.AMOUNT + item[i].NUM + "#";
            resutl.CODE_PRODUCT = resutl.CODE_PRODUCT + item[i].CODE_PRODUCT + "#";
            resutl.PRICE = resutl.PRICE + item[i].PRICE + "#";
            resutl.MONEY =
                resutl.MONEY +
                handleMoney(status, item[i], authUser) * parseInt(item[i].NUM) +
                "#";
            resutl.BONUS = resutl.BONUS + item[i].PRICE_PROMOTION + "#";
            resutl.ID_PRODUCT_PROPERTIES =
                resutl.ID_PRODUCT_PROPERTIES + item[i].ID_PRODUCT_PROPERTIES + "#";
        }
        resutl.BONUS = resutl.BONUS.substring(0, resutl.BONUS.length - 1);
        resutl.AMOUNT = resutl.AMOUNT.substring(0, resutl.AMOUNT.length - 1);
        resutl.CODE_PRODUCT = resutl.CODE_PRODUCT.substring(
            0,
            resutl.CODE_PRODUCT.length - 1
        );
        resutl.MONEY = resutl.MONEY.substring(0, resutl.MONEY.length - 1);
        resutl.PRICE = resutl.PRICE.substring(0, resutl.PRICE.length - 1);
        resutl.ID_PRODUCT_PROPERTIES = resutl.ID_PRODUCT_PROPERTIES.substring(
            0,
            resutl.ID_PRODUCT_PROPERTIES.length - 1
        );
        return resutl;
    };
    handleBook = () => {
        const {
            city,
            district,
            address,
            List
        } = this.state;
        var result = this.handleNumber(List);
        console.log("this is watting", result);
        console.log("thiss iss lisst", List);
        // const List = {
        //     CODE_PRODUCT: "FCGVHB",
        //     COMISSION_PRODUCT: "0",
        //     COMMISSION: null,
        //     COMMISSION_PRICE: null,
        //     COMMISSION_PRODUCT: "0",
        //     DISCOUNT: "0",
        //     ID: "4",
        //     ID_CODE_ORDER: "QLAV78LZ",
        //     ID_PRODUCT_PROPERTIES: "0",
        //     MONEY: "660000",
        //     NOTE: null,
        //     NUM: "4",
        //     OD_PRODUCT_PROPERTIES: null,
        //     PRICE: "165000",
        //     PRODUCT_COMMISSION: "0",
        //     PROPERTIES: null,
        //     STATUS_EDIT: 0,
        // }

        this.setState({
            loading: true,
        },
            async () => {
                var result;
                if (List.length != 0) {
                    result = await this.handleNumber(List);
                }
                console.log("this is result", result);
                updateOrder({
                    USERNAME: this.props.authUser.USERNAME,
                    CODE_PRODUCT: result.CODE_PRODUCT,
                    AMOUNT: result.NUM,
                    PRICE: result.PRICE,
                    MONEY: result.MONEY,
                    BONUS: result.COMMISSION_PRODUCT,
                    FULL_NAME: this.props.username,
                    MOBILE_RECEIVER: "123456",
                    ID_CITY: city.MATP,
                    ID_DISTRICT: district.MAQH,
                    ADDRESS: address,
                    CODE_ORDER: result.ID_CODE_ORDER,
                    STATUS: 2,
                    EXTRA_SHIP: "10000",
                    TIME_RECEIVER: '31/05/2019 14:00:00',
                    NOTE: 'this is note my admin',
                    DISTCOUNT: '',
                    IDSHOP: "ABC123",
                })
                    .then((result) => {
                        console.log("this is updateOrder", result);
                        if (result.data.ERROR == "0000") {
                            this.setState(
                                {
                                    loading: false,
                                    message: result.data.RESULT,
                                }
                            );
                        } else {
                            this.setState(
                                {
                                    loading: false,
                                    message: result.data.RESULT,
                                }
                            );
                        }
                    })
                    .catch((error) => {
                        console.log("err file ware");
                    });
            })
    };
    componentDidMount() {
        this.handleLoad();
    }
    render() {
        const { selectedValue, Data, loading, List, message, setSelectedValue } = this.state;
        console.log("this is data", List);
        // console.log("this is List", List);
        const { ID } = this.props.route.params;
        var sumMoney = 0;

        const handleTotlaMoney = () => {
            if (List.length != 0) {
                for (let i = 0; i < List.length; i++) {
                    sumMoney +=
                        parseFloat(List[i].MONEY);
                }
                return sumMoney;
            } else { }
        }
        const sumAllMoney = () => {
            return sumMoney + parseFloat(Data.EXTRA_SHIP);
        }
        return (
            <View style={{ marginBottom: 20 }}>
                <ScrollView>
                    <View style={{ height: sizeHeight(5), flexDirection: 'column', justifyContent: 'center', paddingLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Mã HĐ: {Data.ID_CODE_ORDER}</Text>
                    </View>
                    <View style={{ height: 35, paddingLeft: 10, backgroundColor: '#149CC6', justifyContent: 'center' }}>
                        <Text style={{ color: '#fff' }}>Thông tin CTV</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text>{Data.FULL_NAME_CTV}</Text>
                        <Text>Mã CTV: {Data.USER_CODE}</Text>
                        <Text>Số điện thoại: {Data.MOBILE}</Text>
                        <Text>Email: {Data.EMAIL}</Text>
                    </View>
                    <View style={{ height: 35, backgroundColor: '#149CC6', justifyContent: 'center' }}>
                        <Text style={{ color: '#fff' }}>Nội dung đơn hàng</Text>
                    </View>
                    <View>
                        {List.length === 0 ? null : List.map((Val, key) => (
                            <View>
                                <View>
                                    <View style={{ flexDirection: 'row', borderColor: '#CBD3D3', borderWidth: 1, margin: 5 }}>
                                        <View style={{ width: sizeWidth(30), borderRightColor: '#CBD3D3', borderRightWidth: 1, height: sizeHeight(20), alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                source={{ uri: Val.IMAGE_COVER }}
                                                style={{ width: sizeWidth(20), height: sizeHeight(10) }}
                                            />
                                        </View>
                                        <View style={{ width: sizeWidth(70), padding: 5 }}>
                                            <Text>{Val.PRODUCT_NAME}</Text>
                                            <Text>Đơn giá: {numeral(Val.PRICE).format("0,0")} đ</Text>
                                            <Text>Số lượng: {Val.NUM}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: sizeWidth(30) }}>

                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', width: sizeWidth(70), padding: 10, justifyContent: 'space-between' }}>
                                    <Text>Thành tiền</Text>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>
                                        {numeral(handleTotlaMoney()).format("0,0")}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', width: sizeWidth(70), padding: 10, paddingTop: 0, justifyContent: 'space-between' }}>
                                    <Text>Phí vận chuyển</Text>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>{numeral(Data.EXTRA_SHIP).format("0,0")}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', width: sizeWidth(70), padding: 10, paddingTop: 0, justifyContent: 'space-between' }}>
                                    <Text>Tổng tiền thanh toán</Text>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>{numeral(sumAllMoney()).format("0,0")}</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                    <View>
                        <View style={styles.status}>
                            <View style={styles.status1}><Text>Người nhận</Text></View>
                            <View style={styles.status2}><Text>{Data.FULLNAME_RECEIVER}</Text></View>
                        </View>
                        <View style={styles.status}>
                            <View style={styles.status1}><Text>Số điện thoại</Text></View>
                            <View style={styles.status2}><Text>{Data.MOBILE_RECEIVER}</Text></View>
                        </View>
                        <View style={styles.status}>
                            <View style={styles.status1}><Text>Địa chỉ</Text></View>
                            <View style={styles.status2}><Text>{Data.ADDRESS_RECEIVER}</Text></View>
                        </View>
                    </View>
                    <View style={{ height: 35, backgroundColor: '#149CC6', marginTop: sizeHeight(5), justifyContent: 'center' }}>
                        <Text style={{ color: '#fff' }}>Tình trạng đơn hàng</Text>
                    </View>


                    {/* trạng thái */}
                    <View style={{ padding: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text>Trạng thái: </Text>
                            <View style={{ backgroundColor: '#E1AC06', marginLeft: 5, alignItems: 'center', borderRadius: 15 }}>
                                <Picker
                                    selectedValue={setSelectedValue}
                                    style={{ height: 30, width: sizeWidth(40), color: 'white' }}
                                    onValueChange={(itemValue) => this.setState({ setSelectedValue: itemValue })}
                                >
                                    <Picker.Item label="Đã tiếp nhận" value="1" />
                                    <Picker.Item label="Hủy" value="2" />

                                </Picker>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, }}>
                            <Text>Thời gian dự kiến nhận hàng: </Text>
                            <View style={styles.confix15}>
                                <TouchableOpacity
                                    onPress={this.showDatePicker2}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                >
                                    <Image
                                        source={require('../../assets/images/lich.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <Text style={{ fontSize: 12 }}>{this.state.endTime}</Text>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={this.state.inDateEndPicker}
                                    mode="date"
                                    onConfirm={this.handleConfirm2}
                                    onCancel={this.hideDatePicker2}
                                />
                            </View>
                        </View>
                        <View>
                            <Text>Ghi chú: </Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                                style={{ borderBottomColor: "#4B4C4B", borderWidth: 1, borderRadius: 5 }}
                            />
                        </View>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                            <TouchableOpacity
                                onPress={() => { this.handleBook() }}
                                style={{
                                    borderWidth: 1, borderColor: '#E1AC06', paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10
                                    , backgroundColor: '#E1AC06', alignItems: 'center', borderRadius: 10
                                }}
                            >
                                <Text>Cập nhật</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
    },
    status: {
        flexDirection: 'row',
        borderRadius: 50,
    },
    status1: {
        width: sizeWidth(40),
        borderColor: '#CCCECE',
        borderWidth: 1,
    },
    status2: {
        width: sizeWidth(60),
        borderColor: '#CCCECE',
        borderWidth: 1,
    },
    confix15: {
        width: sizeWidth(40),
        borderColor: '#E1AC06',
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,

    }
})

export default connect(
    mapStateToProps,
    null
)(OrderMain);
