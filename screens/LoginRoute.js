import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Login } from '../components';

export default class LoginRoute extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Login navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: "#f5f5f5",
  }
});
