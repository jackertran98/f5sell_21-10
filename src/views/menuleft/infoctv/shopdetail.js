
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, TouchableHighlight } from 'react-native';
import { GetListCTV } from "../../../service/account";
import Modal from 'react-native-modal';
import { Getwithdrawal } from "../../../service/rose";
import { changePass } from "../../../service/auth";
import { UpdateInforAccount } from "../../../service/account";
import ImagePicker from 'react-native-image-picker';
import moment from "moment";
import UserChildren from "./usechildren";
import BankChildren from "./bankchildren";
var numeral = require("numeral");
import {
    sizeWidth,
    sizeFont,
    sizeHeight,
} from "../../../utils/helper/size.helper"
class Shopdetail extends Component {
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
            photo: null,

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
        UpdateInforAccount({
            USERNAME: this.props.username,
            USER_CTV: this.props.username,
            AVATAR: this.state.photo,
            IDSHOP: 'ABC123'
        }).then((res) => {

        })
            .catch((err) => {

            })

    }
    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
            }
        })
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    };
    toggleModal1 = () => {
        this.setState({ formatUser: !this.state.formatUser })
    }
    toggleModal2 = () => {
        this.setState({ formatBank: !this.state.formatBank })
    }
    render() {
        const { data, modalVisible, Rose, usernam, passold, passnew, phone, address, photo } = this.state;
        const { username } = this.props;
        return (
            <View>
                {data.map((Val, key) => {
                    return (
                        <View>
                            <View style={{ backgroundColor: '#E1AC06', height: sizeHeight(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{Val.FULL_NAME}</Text>
                                    <Text style={{ color: 'white' }}>Mã user: {Val.USER_CODE}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        onPress={this.handleChoosePhoto}
                                    >
                                        <View style={{width:80,height:80,borderRadius: 50, 
                                            borderColor:'black',borderWidth:1.5,justifyContent:'center',alignItems:'center',borderStyle:'dashed'}}>
                                            <Image
                                                source={photo === null ? require('../../../assets/images/camera.png') : { uri: photo.uri }}
                                                style={{ width: 65, height: 65, borderRadius: 50, backgroundColor: 'white' }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <UserChildren />
                            </View>

                            <View>
                                <BankChildren />
                            </View>
                            <View style={{ height: 4.5, backgroundColor: '#AAAAAA' }}></View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomColor: '#AAAAAA', borderBottomWidth: 4.5, height: 60 }}>
                                <Image
                                    source={require('../../../assets/images/monney.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                                <Text style={{ fontSize: 16 }}>Số dư hoa hồng hiện tại <Text style={{ color: '#FF5C03', fontSize: 20, fontWeight: 'bold' }}>
                                    {Rose.length === 0 ? 0 : numeral(Rose[0].BALANCE).format("0,0")}đ
                                    </Text></Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('detailrose')
                                    }}
                                >
                                    <Image
                                        source={require('../../../assets/images/right.png')}
                                        style={{ width: 50, height: 50 }}
                                    />
                                </TouchableOpacity>
                            </View>



                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <View>
                                        <TouchableOpacity onPress={this.toggleModal}
                                            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#149CC6', width: sizeWidth(55), margin: 10 }}
                                        >
                                            <Image
                                                source={require('../../../assets/images/setup.png')}
                                                style={{ width: 45, height: 45 }}
                                            />
                                            <Text style={{ color: 'white' }}>Đổi mật khẩu</Text>
                                        </TouchableOpacity>

                                        <Modal isVisible={this.state.isModalVisible} style={{
                                            backgroundColor: 'white',
                                            flex: 0.8, alignItems: 'center', justifyContent: 'center', marginTop: sizeHeight(30), padding: 20
                                        }}
                                            onBackdropPress={() => this.setState({ isModalVisible: false })}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text>Mật khẩu cũ: </Text><TextInput style={{ borderColor: '#AAAAAA', borderWidth: 2 }}
                                                    onChangeText={(text) => this.setState({ passold: text })}
                                                />
                                                <Text>Mật khẩu mới: </Text><TextInput style={{ borderColor: '#AAAAAA', borderWidth: 2 }}
                                                    onChangeText={(text) => this.setState({ passnew: text })}
                                                />
                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row', alignItems: 'center', backgroundColor: '#149CC6',
                                                        width: sizeWidth(55), justifyContent: 'center', marginTop: 20
                                                    }}


                                                    onPress={() => {
                                                        this.setState({
                                                            isModalVisible: !this.state.isModalVisible,
                                                        },
                                                            async () => {
                                                                await changePass({
                                                                    OLD_PWD: passold,
                                                                    NEW_PWD: passnew,
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
                                <View>
                                    <TouchableOpacity

                                        onPress={() => {
                                            console.log("abc")
                                        }}
                                        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF5C03', width: sizeWidth(37), margin: 10, paddingLeft: 10 }}
                                    >
                                        <Text style={{ color: 'white' }}>Cập nhật số dư</Text>
                                        <Image
                                            source={require('../../../assets/images/pen.png')}
                                            style={{ width: 45, height: 45 }}
                                        />
                                    </TouchableOpacity>
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
)(Shopdetail);

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
