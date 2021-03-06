import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, RefreshControl } from 'react-native';
import { sizeHeight, sizeWidth } from '../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");

import { ReportCTV } from "../../../../service/account";
import { size } from 'lodash';

class UserReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Data: [],
            loading: false,
    }
}
    handLoad = () => {
        ReportCTV({
            USERNAME: this.props.username,
            USER_CTV: this.props.username,
            YEAR: 2020,
            MOTH: '',
            PAGE: '1',
            NUMOFPAGE: '10',
            IDSHOP: 'ABC123'
        })
            .then((res) => {
                this.setState({
                    Data: res.data.INFO
                })
            })
            .catch((err) => {

            })
    }
    componentDidMount() {
        this.handLoad();
    }

    render() {
        const { Data } = this.state;
        const { authUser, status } = this.props;
        console.log("this is auth", authUser);

        return (
            <View >
                <View style={{padding:10}}>
                    <Text style={{fontWeight:'bold'}}>Tên CTV: {authUser.FULL_NAME}</Text>
                    <Text style={{fontWeight:'bold'}}>Mã user: {authUser.USERNAME}</Text>
                    <Text style={{fontWeight:'bold'}}>Số điện thoại: {authUser.MOBILE}</Text>
                    <Text style={{fontWeight:'bold'}}>Email: {authUser.EMAIL}</Text>
                </View>

                <View style={{ height: 5, backgroundColor: '#BFC4C4' }}></View>

                <View style={{marginTop:20}}>
                    <ScrollView horizontal={true}>
                        <View style={{flexDirection:'column'}}>
                            <View style={[styles.mainUser,styles.custom,styles.customTop]}>
                                <Text style={styles.row1}>STT</Text>
                                <Text style={styles.row2}>Thời gian tạo</Text>
                                <Text style={styles.row3}>Thời gian hoàn thành</Text>
                                <Text style={styles.row4}>Mã HĐ</Text>
                                <Text style={styles.row5}>Doanh thu</Text>
                                <Text style={styles.row6}>Hoa hồng</Text>
                                <Text style={styles.row7}>Chi tiết</Text>
                            </View>
                            <View>
                                {Data.map((val, key) => {
                                    return (
                                        <View style={[styles.mainUser,styles.custom]}>
                                            <Text style={styles.row1}>{key}</Text>
                                            <Text style={styles.row2}>{val.CREATE_DATE}</Text>
                                            <Text style={styles.row3}>{val.FN_TIME}</Text>
                                            <Text style={styles.row4}>{val.CODE_ORDER}</Text>
                                            <Text style={styles.row5} >{numeral(val.SUM_MONEY).format("0,0")} đ</Text>
                                            <Text style={styles.row6}>{numeral(val.SUM_COMMISSION).format("0,0")} đ</Text>
                                            <Text style={styles.row7}>Chi tiết</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>
                    <View>
                    </View>
                </View>
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
    mainUser:{
        flexDirection:'row',
    },
    row1:{
        paddingTop:sizeHeight(1.5),
        textAlign:'center',
        width:sizeWidth(10),
        borderRightColor:'#E1AC06',
        borderRightWidth:1,
    },
    row2:{
        paddingTop:sizeHeight(0.5),
        textAlign:'center',
        width:sizeWidth(30),
        borderRightColor:'#E1AC06',
        borderRightWidth:1,
    },
    row3:{
        paddingTop:sizeHeight(0.5),
        textAlign:'center',
        width:sizeWidth(30),
        borderRightColor:'#E1AC06',
        borderRightWidth:1,
    },
    row4:{
        paddingTop:sizeHeight(1.5),
        textAlign:'center',
        width:sizeWidth(30),
        borderRightColor:'#E1AC06',
        borderRightWidth:1,
    },
    row5:{
        paddingTop:sizeHeight(1.5),
        textAlign:'center',
        width:sizeWidth(30),
        borderRightColor:'#E1AC06',
        borderRightWidth:1,
    },
    row6:{
        paddingTop:sizeHeight(1.5),
        textAlign:'center',
        width:sizeWidth(30),
        borderRightColor:'#E1AC06',
        borderRightWidth:1,
    },
    row7:{
        paddingTop:sizeHeight(1.5),
        textAlign:'center',
        width:sizeWidth(20),
        borderRightColor:'#E1AC06',
        borderRightWidth:1,
    },
    custom:{
        borderBottomColor:'#E1AC06',
        borderBottomWidth:1,
        
    },
    customTop:{
        borderTopColor:'#E1AC06',
        borderTopWidth:1,
    }
})

export default connect(
    mapStateToProps,
    null
)(UserReport);
