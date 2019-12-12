//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
// import all basic components
import AppHeader from '../components/AppHeader';

export default class packages extends Component {
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
            <View >
                <AppHeader title="Packages" navigation={this.props.navigation} />
                <View style={styles.MainContainer}>
                    <Text style={{ fontSize: 23 }}> Packages </Text>
                </View >
            </View >
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
});