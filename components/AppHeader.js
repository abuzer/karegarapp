import React, { Component } from "react";
import { Button, Icon, Header, Left, Body, Right, Title } from 'native-base';
import { StatusBar, View, Image, TouchableOpacity } from "react-native";

import { DrawerActions } from 'react-navigation-drawer';

export default class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);

    }

    toggleDrawer = () => {
        //Props to open/close the drawer
        console.log("toggle drawer");
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    };
    render() {
        return (

            <Header style={{ backgroundColor: "#ffca08", color: "#000" }}>
                <Left >
                    <TouchableOpacity onPress={this.toggleDrawer}>

                        <Image
                            source={require('../../assets/drawer.png')}
                            style={{ width: 25, height: 25, marginLeft: 5 }}
                        />
                    </TouchableOpacity>
                </Left>
                <Body >
                    <Title style={{ color: "#000", }}>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>

        )

    }
}

