
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, TouchableHighlight } from 'react-native';
import { GetListCTV } from "../../../service/account";
import Modal from 'react-native-modal';
import { Getwithdrawal } from "../../../service/rose";
import { UpdateInforAccount } from "../../../service/account";
import moment from "moment";
var numeral = require("numeral");
import {
    sizeWidth,
    sizeFont,
    sizeHeight,
} from "../../../utils/helper/size.helper"
class BankChildren extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rose: [],
            data: [],
            loading: false,
            formatBank: false,
            usernam: '',
            stk: '',
            tentk: '',
            tennh: '',
            phone: '',
            passnew: '',
            address: '',
            male: '',
            endTime: moment(new Date()).format("DD/MM/YYYY"),

        }
    }
    componentDidMount() {
        GetListCTV({
            USERNAME: this.props.username,
            SEARCH: '',
            ID_CITY: '',
            I_PAGE: 1,
            NUMOFPAGE: 25,
            IDSHOP: "ABC123",
        })
            .then((res) => {
                if (res.data.ERROR == "0000") {
                    this.setState({
                        data: res.data.INFO
                    })
                } else {
                    this.showToast(res);
                }
            })
            .catch((err) => {
                this.setState({ data: [] })
                alert('Không có dữ liệu')
            });
        Getwithdrawal({
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
    toggleModal2 = () => {
        this.setState({ formatBank: !this.state.formatBank })
    }
    render() {
        const { data, modalVisible, Rose, usernam, passold, passnew, phone, address } = this.state;
        const { username } = this.props;
        return (
            <View>
                {data.map((Val, key) => {
                    return (
                        <View>
                            <View>
                                <View style={{ height: 4.5, backgroundColor: '#AAAAAA' }}></View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            style={{ width: 60, height: 60 }}
                                            source={require('../../../assets/images/bank.png')}
                                        />
                                        <Text style={{ fontSize: 16 }}>Tài khoản ngân hàng</Text>
                                    </View>

                                    <View>


                                        <TouchableOpacity
                                            onPress={this.toggleModal2}
                                        >
                                            <Image
                                                style={{ width: 60, height: 60 }}
                                                source={require('../../../assets/images/info2.png')}
                                            />
                                        </TouchableOpacity>
                                        <Modal isVisible={this.state.formatBank} style={{
                                            backgroundColor: 'white',
                                            flex: 0.8, alignItems: 'center', justifyContent: 'center', margin: 25
                                        }}
                                            onBackdropPress={() => this.setState({ formatBank: false })}
                                        >
                                            <View style={{ flex: 1, marginTop: 20 }}>
                                                <TextInput style={{ borderColor: '#AAAAAA', borderWidth: 1,marginBottom:15 }}
                                                    onChangeText={(text) => this.setState({ stk: text })}
                                                    placeholder="Số tài khoản"
                                                />
                                                <TextInput style={{ borderColor: '#AAAAAA', borderWidth: 1,marginBottom:15 }}
                                                    onChangeText={(text) => this.setState({ tentk: text })}
                                                    placeholder="Tên tài khoản"
                                                />
                                                <TextInput style={{ borderColor: '#AAAAAA', borderWidth: 1,marginBottom:15 }}
                                                    onChangeText={(text) => this.setState({ tennh: text })}
                                                    placeholder="Tên ngân hàng"
                                                />
                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row', alignItems: 'center', backgroundColor: '#149CC6',
                                                        width: sizeWidth(55), justifyContent: 'center', marginTop: 20
                                                    }}
                                                    onPress={() => {
                                                        this.setState({
                                                            formatBank: !this.state.formatBank,
                                                        },
                                                            async () => {
                                                                await UpdateInforAccount({
                                                                    USERNAME: username,
                                                                    USER_CTV: username,
                                                                    STK: stk,
                                                                    TENTK: tentk,
                                                                    TENNH: tennh,
                                                                    IDSHOP: 'ABC123'
                                                                })
                                                                    .then((res) => {
                                                                        Alert.alert('Thông báo', `${res.data.RESULT}`)
                                                                    })
                                                                    .catch((err) => {
                                                                    });
                                                            }
                                                        )
                                                    }}>
                                                    <Text style={{ padding: 10 }}>Cập nhật</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Modal>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={styles.content}>
                                    <Text>Số tài khoản:</Text>
                                    <Text>{Val.FULL_NAME}</Text>
                                </View>

                                <View style={styles.content}>
                                    <Text>Tên tài khoản:</Text>
                                    <Text>{Val.GENDERNAME}</Text>
                                </View>
                                <View style={styles.content}>
                                    <Text>Ngân hàng, chi nhánh:</Text>
                                    <Text>{Val.PHONE}</Text>
                                </View>
                            </View>
                            <View style={{ height: 4.5, backgroundColor: '#AAAAAA' }}></View>
                        </View>


                    )
                })}

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


export default connect(
    mapStateToProps,
    null
)(BankChildren);

const styles = StyleSheet.create({
    content: {
        height: sizeHeight(5),
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        alignItems: 'center'
    }
})
