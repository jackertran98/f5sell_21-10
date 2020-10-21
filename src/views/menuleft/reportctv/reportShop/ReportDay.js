import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, RefreshControl, Alert } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import { ReportDefault } from "../../../../service/account";
class ReportDay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            selectMonth: 10,
            selectYear: 2020,
        }
    }
    handLoad = () => {
        ReportDefault({
            USERNAME: this.props.username,
            YEAR: this.state.selectYear,
            MONTH: this.state.selectMonth,
            REPORT_TYPE: '3',
            IDSHOP: 'ABC123'
        })
            .then((result) => {
                if(result.data.ERROR=='0000'){
                    this.setState({
                        data: result.data.INFO
                    })
                }else{
                    Alert.alert('Thông báo','Không có dữ liệu')
                    
                }
            })
    }
    componentDidMount() {
        this.handLoad();
    }
    componentDidUpdate(prevProps) {
        if (this.state.selectMonth !== prevProps.selectMonth &&
            this.state.selectYear !== prevProps.selectYear) {
            this.handLoad();
        }
    }
    render() {
        const { selectYear, selectMonth, data } = this.state;
        return (
            <View >
                <View>
                    <View style={styles.container}>
                        <View style={{ borderColor: '#E1AC06', borderWidth: 2,borderRadius:10 }}>
                            <Picker
                                selectedValue={selectYear}
                                style={{ height: 35, width: sizeWidth(27) }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectYear: itemValue })}
                            >
                                <Picker.Item label="2019" value="2019" />
                                <Picker.Item label="2020" value="2020" />
                            </Picker>
                        </View>
                        <View style={{ borderColor: '#E1AC06', borderWidth: 2,borderRadius:10 }}>
                            <Picker
                                selectedValue={selectMonth}
                                style={{ height: 35, width: sizeWidth(20) }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectMonth: itemValue })}
                            >
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="6" value="6" />
                                <Picker.Item label="7" value="7" />
                                <Picker.Item label="8" value="8" />
                                <Picker.Item label="9" value="9" />
                                <Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                            </Picker>
                        </View>
                    </View>
                </View>
                <ScrollView horizontal={true}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={[styles.mainUser, styles.custom, styles.customTop]}>
                            <Text style={styles.row1}>Ngày</Text>
                            <Text style={styles.row2}>Số lượng ĐH</Text>
                            <Text style={styles.row4}>Tổng doanh số</Text>
                            <Text style={styles.row5}>Hoa hồng</Text>
                            <Text style={styles.row6}>Thực thu</Text>
                        </View>
                        <View>
                            {data.map((val, key) => {
                                return (
                                    <View style={[styles.mainUser, styles.custom]}>
                                        <Text style={styles.row1}>{val.DAY}</Text>
                                        <Text style={styles.row2}>{val.TOTAL_ORDER}</Text>
                                        <Text style={styles.row4}>{numeral(val.TOTAL_TT).format("0,0")}</Text>
                                        <Text style={styles.row5} >{numeral(val.TOTAL_COMMISSION).format("0,0")}</Text>
                                        <Text style={styles.row6}>{numeral(val.TOTAL_MONEY).format("0,0")}</Text>
                                    </View>
                                )
                            })}
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
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding:10,
    },
    mainUser: {
        flexDirection: 'row',
    },
    row1: {
        paddingTop: sizeHeight(1),
        height: sizeHeight(5),
        textAlign: 'center',
        width: sizeWidth(12),
        borderRightColor: '#E1AC06',
        borderRightWidth: 1,
    },
    row2: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#E1AC06',
        borderRightWidth: 1,
    },
    row3: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#E1AC06',
        borderRightWidth: 1,
    },
    row4: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#E1AC06',
        borderRightWidth: 1,
    },
    row5: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#E1AC06',
        borderRightWidth: 1,
    },
    row6: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#E1AC06',
        borderRightWidth: 1,
    },
    row7: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(20),
        borderRightColor: '#E1AC06',
        borderRightWidth: 1,
    },
    custom: {
        borderBottomColor: '#E1AC06',
        borderBottomWidth: 1,

    },
    customTop: {
        borderTopColor: '#E1AC06',
        borderTopWidth: 1,
    }
})

export default connect(
    mapStateToProps,
    null
)(ReportDay);
