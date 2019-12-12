//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
// import all basic components
import AppHeader from '../components/AppHeader';

export default class how_it_works extends Component {
    //Screen1 Component

    constructor(props) {
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);

    }

    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <AppHeader title="How it works?" navigation={this.props.navigation} />
                <View style={styles.MainContainer}>
                    <View style={styles.secCont}>
                        <View style={styles.secContChil}>
                            <Text style={styles.textStyle}>Step 1</Text>

                        </View>
                        <View style={styles.secContChilBottom}>
                            <Text style={styles.textStyleSec}>Contact Us</Text>
                        </View>

                    </View>
                    <View style={styles.secCont}>
                        <View style={styles.secContChil}>
                            <Text style={styles.textStyle}>Step 2</Text>

                        </View>
                        <View style={styles.secContChilBottom}>
                            <Text style={styles.textStyleSec}>Supervisor and Karigar will arrive</Text>
                        </View>

                    </View>
                    <View style={styles.secCont}>
                        <View style={styles.secContChil}>
                            <Text style={styles.textStyle}>Step 3</Text>

                        </View>
                        <View style={styles.secContChilBottom}>
                            <Text style={styles.textStyleSec}>Job has been done</Text>
                        </View>

                    </View>
                    <View style={styles.secCont}>
                        <View style={styles.secContChil}>
                            <Text style={styles.textStyle}>Step 4</Text>

                        </View>
                        <View style={styles.secContChilBottom}>
                            <Text style={styles.textStyleSec}>Give your Feed Back & Pay the Case</Text>
                        </View>

                    </View>

                </View >
            </View >
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flexDirection: "column",
        flex: 1,
        paddingHorizontal: 15,
        // alignItems: 'center',
        // backgroundColor: "red",
        // justifyContent: 'center',
        marginTop: 0,
        backgroundColor: "#f5f5f5",
    },
    secCont: {
        flex: 1,

        // flexDirection: "row",
    },
    secContChil: {
        alignItems: "center",
        justifyContent: "center",
        flex: 0.7,
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: "#ffca08",
        borderWidth: 1,
        marginTop: 5,
    },
    secContChilBottom: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,

    },
    textStyle: {
        fontSize: 24,
        fontWeight: "bold",

    },
    textStyleSec: {
        justifyContent: "center",
        fontSize: 18,
        textAlign: "center",
    }
});