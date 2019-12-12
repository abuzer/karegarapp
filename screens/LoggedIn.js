import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { Button, Loading } from '../components/common/';
import KG_Services from './KG_Services';

import axios from 'axios';

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      services: {},
      error: '',
    };
  }

  componentDidMount() {
    const headers = {
      Authorization: 'Bearer ' + this.props.jwt,
    };
    axios({
      method: 'GET',
      url: 'http://karigar.greelogix.com/api/services',
      headers: headers,
    })
      .then(response => {
        console.log(response);
        this.setState({
          services: response.data.services,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: 'Error retrieving data',
          loading: false,
        });
      });
  }
  render() {
    const { container, emailText, errorText } = styles;
    const { loading, services, error } = this.state;

    if (loading) {
      return (
        <View style={container}>
          <Loading size={'large'} />
        </View>
      );
    } else if (typeof services != 'undefined' && services.length) {
      return <KG_Services deleteJWT={this.props.deleteJWT} items={services} />;
    } else {
      return (
        <View style={container}>
          <View>
            <Text style={errorText}> {error} </Text>
          </View>
          <Button onPress={this.props.deleteJWT}> Log Out </Button>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  emailText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red',
  },
};
