import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, requireNativeComponent, Dimensions } from 'react-native';
// import Map from './app/Map'
const { height, width } = Dimensions.get("screen");
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const MAP_API_KEY = "AIzaSyBraI5NIFR3EoymF-h7QJccyrz-Xyi7ypU";
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
const GMap = requireNativeComponent('GMap')

export default class MyNativeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: '',
            error: "",
            loading: true,
            lat: 0.0,
            long: 0.0,
            address: "",
            userLat: "",
            userLong: "",

        };

        this.getAddress = this.getAddress.bind(this);

    }
    componentDidMount() {
        this.requestLocationPermission();
        // Instead of navigator.geolocation, just use Geolocation.

        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords);
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    userLat: position.coords.latitude,
                    userLong: position.coords.longitude,

                })
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
                // requestLocationPermission();
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );


    }
    async requestLocationPermission() {
        const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            alert("You've access for the location");
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Cool Location App required Location permission',
                        'message': 'We required Location permission in order to get device location ' +
                            'Please grant us.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You've access for the location");
                } else {
                    console.log("You don't have access for the location");
                }
            } catch (err) {
                console.log(err)
            }
        }
    };
    getAddress = () => {
        var userLat = this.state.userLat;
        var userLong = this.state.userLong;
        var NY = {
            lat: userLat,
            lng: userLong
        };
        this.setState({
            lat: userLat,
            long: userLong,


        })
        Geocoder.geocodePosition(NY).then(res => {
            // res is an Array of geocoding object (see below)
            console.log(res)
            let address = res[0];
            // if (address) {
            this.setState({ address: address.formattedAddress })
            // }
            // console.log(address.formattedAddress)
        }).catch(err => console.log(err))
    }

    render() {

        return (
            <GMap
                style={StyleSheet.absoluteFillObject}
                initialRegion={{
                    latitude: this.state.lat,
                    longitude: this.state.long,
                    longitudeDelta: LONGITUDE_DELTA,
                    latitudeDelta: LATITUDE_DELTA,
                }}
            />
        );
    }
}