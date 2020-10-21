
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, TouchableHighlight } from 'react-native';
import { GetListCTV } from "../../../service/account";
import Modal from 'react-native-modal';
import { Getwithdrawal } from "../../../service/rose";
import { changePass } from "../../../service/auth";
import { UpdateInforAccount } from "../../../service/account";

import moment from "moment";
var numeral = require("numeral");
import {
    sizeWidth,
    sizeFont,
    sizeHeight,
} from "../../../utils/helper/size.helper"
class UserChildren extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rose: [],
            data: [],
            loading: false,
            isModalVisible: false,
            formatUser: false,
            formatBank: false,
            usernam: '',
            stk: '',
            tentk: '',
            tennh: '',
            phone: '',
            passnew: '',
            address: '',
            male: '',
            passold: '',
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


    toggleModal1 = () => {
        this.setState({ formatUser: !this.state.formatUser })
    }

    render() {
        const { data, modalVisible, Rose, usernam, passold, passnew, phone, address } = this.state;
        const { username } = this.props;
        return (
            <View>
                {data.map((Val, key) => {
                    console.log("this iss val", Val);
                    return (
                        <View>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            style={{ width: 50, height: 50 }}
                                            source={require('../../../assets/images/info.png')}
                                        />
                                        <Text style={{ fontSize: 16 }}>Thông tin cá nhân</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={this.toggleModal1}
                                    >
                                        <Image
                                            style={{ width: 60, height: 60 }}
                                            source={require('../../../assets/images/info2.png')}
                                        />
                                    </TouchableOpacity>
                                    <Modal isVisible={this.state.formatUser} style={{
                                        backgroundColor: 'white',
                                        flex: 0.8, alignItems: 'center', justifyContent: 'center', margin: 25
                                    }}
                                        onBackdropPress={() => this.setState({ formatUser: false })}
                                    >
                                        <View style={{ flex: 1, marginTop: 20 }}>
                                            <TextInput style={{ borderColor: '#AAAAAA', borderWidth: 1 }}
                                                onChangeText={(text) => this.setState({ username: text })}
                                                placeholder="Họ và tên"
                                            />
                                            {/* <TextInput style={{ borderColor: '#AAAAAA', borderWidth: 1 }}
                                                onChangeText={(text) => this.setState({ male: text })}
                                                placeholder="Giới tính"
                                            /> */}
                                            <TextInput style={{ borderColor: '#AAAAAA', borderWidth: 1 }}
                                                onChangeText={(text) => this.setState({ phone: text })}
                                                placeholder="Email"
                                            />
                                            <TextInput style={{ borderColor: '#AAAAAA', borderWidth: 1 }}
                                                onChangeText={(text) => this.setState({ address: text })}
                                                placeholder="Địa chỉ"
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row', alignItems: 'center', backgroundColor: '#149CC6',
                                                    width: sizeWidth(55), justifyContent: 'center', marginTop: 20
                                                }}
                                                onPress={() => {
                                                    this.setState({
                                                        formatUser: !this.state.formatUser,
                                                    },
                                                        async () => {
                                                            await UpdateInforAccount({
                                                                USERNAME: username,
                                                                USER_CTV: username,
                                                                NAME: usernam,
                                                                ADDRESS: address,
                                                                EMAIL: phone,
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
                                <View>
                                    <View style={styles.content}>
                                        <Text>Họ và tên:</Text>
                                        <Text>{Val.FULL_NAME}</Text>
                                    </View>

                                    <View style={styles.content}>
                                        <Text>Giới tính:</Text>
                                        <Text>{Val.GENDERNAME}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text>Email:</Text>
                                        <Text>{Val.EMAIL}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text>Địa chỉ:</Text>
                                        <Text>{Val.ADDRESS}</Text>
                                    </View>
                                </View>

                            </View>







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
)(UserChildren);

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
