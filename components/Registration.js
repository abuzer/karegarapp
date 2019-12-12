import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Input, TextLink, Loading } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';


class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
      loading: false
    };
    this.signupUser = this.signupUser.bind(this);
    this.onLSignupFail = this.onLSignupFail.bind(this);
  }

  signupUser() {
    const { email, name, password, password_confirmation } = this.state;
    console.log(password_confirmation);
    this.setState({ loading: true })
    // const { navigate } = this.props.navigation;

    console.log('hoho');
    // NOTE Post to HTTPS only in production
    axios.post("http://karigar.greelogix.com/api/register", {
      email: email,
      name: name,
      password: password
    })
      .then((response) => {

        if (response.data.status == "success") {
          this.setState({ loading: false })
          deviceStorage.saveItem("id_token", response.data.access_token);
          this.props.navigation.navigate('App');
          // this.props.newJWT(response.data.access_token);
        } else {
          this.setState({ loading: false, error: 'Signup Failed', })
          alert(response.data.message);
        }

      })
      .catch((error) => {
        this.setState({ loading: false })
        alert(error);

      });
  }
  onLSignupFail() {
    this.setState({
      error: 'Signup Failed',
      loading: false
    });
  }

  render() {


    const { email, password, name, password_confirmation, error, loading } = this.state;
    const { form, section, errorTextStyle, imageThumbnail } = styles;
    if (loading) {
      return (
        <View style={form}>

          <Loading size={'large'} />
        </View>
      );
    } else {
      return (

        <View style={form}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>

            <Image style={imageThumbnail} source={require('../../assets/logo.jpg')} />
          </View>
          <View style={section}>
            <Input
              placeholder="name"
              label="Name"
              value={name}
              onChangeText={name => this.setState({ name })}
            />
          </View>
          <View style={section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <View style={section}>
            <Input
              secureTextEntry
              placeholder="confirm password"
              label="Confirm Password"
              value={password_confirmation}
              onChangeText={password_confirmation => this.setState({ password_confirmation })}
            />
          </View>


          <Text style={errorTextStyle}>
            {error}
          </Text>


          <Button title="Signup" onPress={this.signupUser} />

        </View>


      )
    };
  }
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
    marginTop: 15,
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  imageThumbnail: {

    width: 100,
    height: 100,

  }
});

export { Registration };
