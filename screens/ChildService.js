import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import { Button, Loading } from '../components/common/';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage.js';
import AppHeader from '../components/AppHeader';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
var thumbnailWidth = (width / 3) - 80;
import PlaceOrder from "./place_order";

export default class ChildService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jwt: '',
            error: "",
            loading: true,
            services: {},
            service_id: 0,
        }
        this.newJWT = this.newJWT.bind(this);
        this.deleteJWT = deviceStorage.deleteJWT.bind(this);
        this.loadJWT = deviceStorage.loadJWT.bind(this);
        this.loadServices = this.loadServices.bind(this);
        this.placeOrderScreen = this.placeOrderScreen.bind(this);


        this.loadJWT().then(() => {
            // console.log(res)
            // this.setState({ loading: false });
            this.loadServices();
        });

    }
    newJWT(jwt) {
        this.setState({
            jwt: jwt
        });
    }
    placeOrderScreen = (id, child_services_count) => {
        console.log("aaa");
        console.log(id);
        if (child_services_count) {
            this.props.navigation.navigate("ChildService", {
                service_id: id
            })
        } else {
            this.props.navigation.navigate("PlaceOrder", {
                service_id: id
            })
        }

    }
    componentDidMount() {

        // Instead of navigator.geolocation, just use Geolocation.
        var service_id = this.props.navigation.getParam('service_id');
        this.setState(
            {
                service_id: service_id
            })
    }
    loadServices = () => {
        console.log("Services loading")

        // console.log(this.state.jwt)
        let service_id = this.state.service_id;
        if (!service_id)
            return;
        const headers = {
            Authorization: 'Bearer ' + this.state.jwt,
        };
        var url = "http://karigar.greelogix.com/api/services/?service_id=" + service_id
        axios({
            method: 'GET',
            url: url,
            headers: headers,
        }).then(response => {
            console.log(response);
            if (response.data.status == "error") {
                this.setState({
                    error: response.data.message,
                    loading: false,
                });
                return;
            }
            this.setState({
                services: response.data.services,
                loading: false,
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                error: error.message,
                loading: false,
            });
        });
    }


    render() {

        const { loading, services, error } = this.state;
        const { container, itemCont, errorText, titleText, imageThumbnail } = styles;
        // console.log(services);
        if (loading) {
            return (
                <View style={container}>
                    <AppHeader title="Services" navigation={this.props.navigation} />
                    <Loading size={'large'} />
                </View>
            );
        } else if (typeof services != 'undefined' && services.length) {
            return (

                <ScrollView style={container}>
                    <AppHeader title="Services" navigation={this.props.navigation} />
                    <FlatList
                        style={{ padding: 5, flex: 1 }}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                        data={services}
                        renderItem={({ item }) => (

                            <View style={itemCont} >
                                <TouchableOpacity onPress={() => {
                                    this.placeOrderScreen(item.id, item.child_services_count)
                                }}>
                                    <Image style={imageThumbnail} source={{ uri: item.image }} />
                                    <Text style={titleText}>{item.name}</Text>
                                </TouchableOpacity>
                            </View>

                        )}
                    />



                </ScrollView>
            );
        }
        else {
            return (
                <View style={container}>
                    <AppHeader title="Services" navigation={this.props.navigation} />

                    <View>
                        <Text style={errorText}> {error} </Text>
                    </View>

                </View>
            );
        }

    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",

    },
    itemCont: {
        flex: 0.27,
        flexDirection: 'row',
        margin: 5,
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#ffca08",
        borderWidth: 2,
        paddingVertical: 15,
    },
    titleText: {
        // alignSelf: 'center',
        // flex: 1,
        textAlign: "center",
        color: 'black',
        fontSize: 12,
        marginTop: 5,
    },
    errorText: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    },
    imageThumbnail: {

        width: thumbnailWidth,
        height: height / (height / thumbnailWidth),
        alignSelf: "center"

    }
};