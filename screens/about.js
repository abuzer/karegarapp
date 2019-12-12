//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
// import all basic components
import AppHeader from '../components/AppHeader';

export default class about extends Component {
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
                <AppHeader title="About Us" navigation={this.props.navigation} />
                <View style={styles.MainContainer}>
                    <View style={styles.secCont}>
                        <View style={styles.secContChil}>
                            <Text style={styles.textStyle}>We Are?</Text>

                        </View>
                        <View style={styles.secContChilBottom}>
                            <Text style={styles.textStyleSec}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus varius turpis, in consectetur sapien volutpat sit amet. Mauris pellentesque euismod augue ut cursus. Maecenas facilisis tincidunt pellentesque. Vivamus ullamcorper dignissim mauris, nec dictum odio facilisis non. Etiam in iaculis arcu, sed venenatis massa.
                            </Text>
                        </View>

                    </View>
                    <View style={styles.secCont}>
                        <View style={styles.secContChil}>
                            <Text style={styles.textStyle}>Our Vision</Text>

                        </View>
                        <View style={styles.secContChilBottom}>
                            <Text style={styles.textStyleSec}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus varius turpis, in consectetur sapien volutpat sit amet. Mauris pellentesque euismod augue ut cursus. Maecenas facilisis tincidunt pellentesque. Vivamus ullamcorper dignissim mauris, nec dictum odio facilisis non. Etiam in iaculis arcu, sed venenatis massa.
                            </Text>
                        </View>

                    </View>
                    <View style={styles.secCont}>
                        <View style={styles.secContChil}>
                            <Text style={styles.textStyle}>Our Aim</Text>

                        </View>
                        <View style={styles.secContChilBottom}>
                            <Text style={styles.textStyleSec}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus varius turpis, in consectetur sapien volutpat sit amet. Mauris pellentesque euismod augue ut cursus. Maecenas facilisis tincidunt pellentesque. Vivamus ullamcorper dignissim mauris, nec dictum odio facilisis non. Etiam in iaculis arcu, sed venenatis massa.
                            </Text>
                        </View>

                    </View>
                    <View style={styles.secCont}>
                        <View style={styles.secContChil}>
                            <Text style={styles.textStyle}>Why Us</Text>

                        </View>
                        <View style={styles.secContChilBottom}>
                            <Text style={styles.textStyleSec}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus varius turpis, in consectetur sapien volutpat sit amet. Mauris pellentesque euismod augue ut cursus. Maecenas facilisis tincidunt pellentesque. Vivamus ullamcorper dignissim mauris, nec dictum odio facilisis non. Etiam in iaculis arcu, sed venenatis massa.
                            </Text>
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
        backgroundColor: "#f5f5f5",
        marginTop: 0,
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
        flex: 2,

    },
    textStyle: {
        fontSize: 18,
        fontWeight: "bold",

    },
    textStyleSec: {
        justifyContent: "center",
        fontSize: 12,
        textAlign: "center",
    }
});