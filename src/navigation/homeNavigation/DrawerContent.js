import React, { Component } from 'react'
import { StyleSheet, View, Image, Alert } from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
import Icon from '../../components/icon/index'
import { AUTH, USER_NAME } from "../../utils/asynStorage/store";
import { _retrieveData } from "../../utils/asynStorage";

import {
    Avatar,
    Title,
    Drawer,
    Text,
} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _removeData } from "../../utils/asynStorage";
import { TOKEN } from "../../utils/asynStorage/store";
import { connect } from "react-redux";
import { LogOut } from "../../action/authAction";
import { countNotify } from "../../action/notifyAction";
import { color } from 'react-native-reanimated';

class DrawerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlertOption: false,
            data:12
        };  
    }
    show = () => {
        return Alert.alert(
            "Đăng xuất",
            "Bạn chắc chắn muốn đăng xuất?",
            [
                {
                    text: "Cancel",
                    style: "destructive",
                },
                {
                    text: "OK",
                    onPress: () => {
                        Promise.all(_removeData(TOKEN));
                        this.props.countNotify(0);
                        this.props.LogOut();
                    },
                    style: "default",
                },
            ],
            { cancelable: false }
        );
    };
    handleLoad = async () => {
        await _retrieveData(USER_NAME)
            .then((res)=>{
                this.setState({
                    data:res
                })
            })
    }
    componentDidMount(){
        this.handleLoad();
    }
    render() {
        const {authUser}=this.props;
        const {data}=this.state;
        return (
            <View>
                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: "#E1AC06", height: 100, alignItems: "center", paddingLeft: 10 }}
                    onPress={() => { }}
                >
                    <Avatar.Image
                        source={{
                            uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                        }}
                        size={50}
                    />
                    <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                    <Title style={{fontSize:20,color:'white'}}>{authUser.USERNAME}</Title>

                    </View>

                </TouchableOpacity>
                <Drawer.Section>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image 
                            source={require('../../assets/images/info.png')}
                            style={{width:30,height:30}}
                            />
                        )}
                        label={({ focused, color }) =><Text style={{color:'#E1AC06',fontSize:16,fontWeight:'bold'}}>Thông tin CTV</Text>}
                        onPress={() => { this.props.navigation.navigate('Thông tin CTV') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image 
                            source={require('../../assets/images/report.png')}
                            style={{width:30,height:30}}
                            />
                        )}
                        label={({ focused, color }) =><Text style={{color:'#E1AC06',fontSize:16,fontWeight:'bold'}}>Chính sách</Text>}
                        
                        onPress={() => { this.props.navigation.navigate('Chính sách') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image 
                            source={require('../../assets/images/chinh.png')}
                            style={{width:30,height:30}}
                            />
                        )}
                        
                        label={({ focused, color }) =><Text style={{color:'#E1AC06',fontSize:16,fontWeight:'bold'}}>Báo cáo</Text>}
                        
                        onPress={() => { this.props.navigation.navigate('report') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image 
                            source={require('../../assets/images/teach.png')}
                            style={{width:30,height:30}}
                            />
                        )}
                        
                        label={({ focused, color }) =><Text style={{color:'#E1AC06',fontSize:16,fontWeight:'bold'}}>Đào tạo</Text>}

                        onPress={() => { this.props.navigation.navigate('Đào tạo') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image 
                            source={require('../../assets/images/new.png')}
                            style={{width:30,height:30}}
                            />
                        )}
                        
                        label={({ focused, color }) =><Text style={{color:'#E1AC06',fontSize:16,fontWeight:'bold'}}>Tin tức, sự kiện</Text>}

                        onPress={() => { this.props.navigation.navigate('Tin tức-sự kiện') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image 
                            source={require('../../assets/images/logo.png')}
                            style={{width:30,height:30}}
                            />
                        )}
                        label={({ focused, color }) =><Text style={{color:'#E1AC06',fontSize:16,fontWeight:'bold'}}>Giới thiệu F5 Shop</Text>}

                        onPress={() => { this.props.navigation.navigate('Giới thiệu') }}
                    />
                </Drawer.Section>
                {this.props.status === ""  ? (
                    <TouchableOpacity style={{ flexDirection: 'row', height: 100, alignItems: "center", justifyContent: 'center' }}
                        onPress={() => {
                            this.setState({ showAlertOption: true });
                            this.props.navigation.navigate('signin')
                            
                        }}
                    >
                        <Text style={{ color: '#E1AC06',fontSize:16,fontWeight:'bold' }}>Đăng nhập</Text>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity style={{ flexDirection: 'row', height: 100, alignItems: "center", justifyContent: 'center' }}
                        onPress={() => {
                            this.setState({ showAlertOption: true });
                            this.show();
                        }}
                    >
                        <Image

                        />
                        <Text style={{ color: 'red',fontSize:16,fontWeight:'bold' }}>Đăng xuất</Text>
                    </TouchableOpacity>
                    )}
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        LogOut: (data) => dispatch(LogOut(data)),
        countNotify: (text) => dispatch(countNotify(text)),
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        status: state.authUser.status,
        authUser: state.authUser.authUser,
    }
}
const styles = StyleSheet.create({
    bottomDrawerSection: {
        marginTop: 25,
        borderBottomColor: 'white',
    },
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawerContent);
