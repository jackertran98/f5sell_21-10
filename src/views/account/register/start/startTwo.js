import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, TouchableHighlightComponent } from 'react-native'
import ComponentTextInput from '../../../../components/search'
import { connect } from 'react-redux';
import IconComponets from '../../../../components/icon';
import { sizeFont } from '../../../../utils/helper/size.helper';
import StartThu from '../../../../action/authAction';
import { getShopInfo } from '../../../../service/products'
class StartTwo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            startThu: '',
        }
    }
    componentDidMount() {
        getShopInfo({
            USERNAME: '',
            IDSHOP: this.state.idshop,
        })
            .then((result) => {
                console.log(result)
                if (result.data.ERROR === "0000") {
                    this.setState({ idshop: result.data.USER_CODE },
                    );
                } else {
                    this.setState({ loading: false });
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    }
    render() {
        console.log(this.state.startThu)
        return (
            <ImageBackground
                source={require('../../../../assets/images/stacktwo.png')}
                style={styles.container}
            >
               
                    <TouchableOpacity
                        style={styles.button2}
                        onPress={() => {
                            this.setState({ loading: true }, async () => {
                                await getShopInfo({
                                    IDSHOP: this.state.startThu,
                                    USERNAME: '',
                                })
                                    .then((res) => {
                                        if (res.data.ERROR == "0000") {
                                            this.props.navigation.popToTop();
                                            this.props.navigation.navigate("Account",{
                                                discription:res.data.SHOP_DES
                                            });
                                        }
                
                                        else {
                                            Alert.alert('Thông báo','Không tồn tại mã shop')
                                        }
                                    })
                                    .catch((err) => {
                                    });
                                this.setState({ loading: false });
                            });
                        }}
                    >
                        <IconComponets
                            color={"#fff"}
                            size={sizeFont(7)}
                            name="angle-right"
                            light
                        />
                    </TouchableOpacity>
                    <ComponentTextInput
                        style={styles.inputext}
                        placeholder="Nhập mã shop"
                        placeholderTextColor=""
                        type="name"
                        onChangeText={(text) => this.setState({ startThu: text })}
                    />
               
            </ImageBackground>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStartThu: (data) => {
            dispatch(StartThu(data))
        }
    }
}
export default connect(null, mapDispatchToProps)(StartTwo);
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height: 700,
        alignItems: "center",
        width: 395,
    },
    button2: {
        borderRadius: 50,
        top: '30%',
        width: '30%',
        alignItems: "center",
        backgroundColor: "#149CC6",
        padding: 5
    },
    inputext: {
        top: '14%',
    }
})
