import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Input, TextLink, Loading } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import auth from '@react-native-firebase/auth';
import { Item, Input as MyInput, Icon, Button as StyledButton } from 'native-base';

import { firebase } from "@react-native-firebase/auth";
import PhoneInput from 'react-native-phone-input';

export default class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 60,
      name: "",
      confirmResult: "",
      phoneNumber: '',
      password: '',
      error: '',
      verificationCode: "",
      loading: false,
      isResendEnabled: true,
      resendCodeTrigger: false,
      userConfirmed: false,
      message: "",
    };

    this.startCountDownTimer = this.startCountDownTimer.bind(this);
    this.onLSignupFail = this.onLSignupFail.bind(this);
    this.clearCountDownTimer = this.clearCountDownTimer.bind(this);
  }
  componentDidMount() {
    this.authSubscription = auth().onAuthStateChanged((user) => {
      console.log("user signed in")
      console.log(user)
      // return;
      if (user) {
        this.setState({ userConfirmed: true });
        console.log("user is")
      }
    });
  }

  componentDidUpdate() {
    if (this.state.timer === 1) {
      this.clearCountDownTimer();
    }
  }

  componentWillUnmount() {
    this.clearCountDownTimer();
  }


  saveNewPassword = () => {
    this.setState({ loading: true })
    const { phoneNumber, password } = this.state;

    let email = phoneNumber + "@karigar.com";
    axios.post("http://karigar.greelogix.com/api/reset_password", {
      phone_number: phoneNumber,
      password: password
    })
      .then((response) => {

        if (response.data.status == "success") {
          this.setState({ loading: false });
          deviceStorage.saveItem("id_token", response.data.access_token);
          this.props.navigation.navigate('AppHome');
          // this.props.newJWT(response.data.access_token);
        } else {
          // return console.log(response.data);
          this.setState({ loading: false, error: 'Password Reset Failed', })
          alert(response.data.message);
        }

      })
      .catch((error) => {
        this.setState({ loading: false, error: error.toString() })
        console.log(error);

      });
  }
  onRegisterWithPhone = () => {
    this.setState({ loading: true })
    const { phoneNumber } = this.state;
    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then((confirmResult) => {
        this.setState({ loading: false })
        this.setState({ message: "Please wait we will verify your phone number." })
        console.log(confirmResult)
        this.startCountDownTimer();
        this.setState({ confirmResult });

      })
      .catch((error) => {
        const { code, message } = error;
        console.log(message)
        this.setState({ loading: false, error: message })

      });
  }
  startCountDownTimer = () => {
    this.setState({ timer: 60 })
    this.interval = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
      1000
    );
  }
  clearCountDownTimer = () => {
    this.setState({ timer: 0 })
    this.setState({ isResendEnabled: false })
    clearInterval(this.interval);
  }


  onLSignupFail() {
    this.setState({
      error: 'Signup Failed',
      loading: false
    });
  }

  render() {


    const { phoneNumber, userConfirmed, password, confirmResult, verificationCode, name, error, loading } = this.state;
    const { form, section, errorTextStyle, imageThumbnail } = styles;
    if (loading) {
      return (
        <View style={form}>

          <Loading size={'large'} />
        </View>
      );
    } else if (userConfirmed) {
      return (
        <View style={form}>
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>

              <Image style={imageThumbnail} source={require('../../assets/logo.jpg')} />
            </View>
            <View style={{ marginVertical: 5, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 24, color: "#0065b3", fontWeight: "bold" }}>
                Password Reset
              </Text>

            </View>
            <View style={section}>
              <View style={[styles.containerStyle, { paddingHorizontal: 10 }]}>
                <Item style={{ borderBottomWidth: 0 }}>
                  <Icon active name='md-lock' android="md-lock" />
                  <MyInput
                    secureTextEntry
                    placeholder="New Password"
                    label="Password"
                    value={password}
                    onChangeText={password => this.setState({ password })} />
                </Item>
              </View>
            </View>


            <Text style={errorTextStyle}>
              {error}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <View style={{
                flex: 1,
                marginRight: 5,
              }}>
                <Button color="#3A8F41" title={"Save"} onPress={this.saveNewPassword} />

              </View>
              {/* <View style={{
              flex: 1,
              marginLeft: 5,
            }}>

              <Button title="Confirm" onPress={this.onVerificationCode} />
            </View> */}
            </View>
            {/* <Button title="Confirm" onPress={this.onVerificationCode} /> */}
          </View>
        </View>

      )
    } else {
      return (
        <View style={form}>

          <View style={{ justifyContent: "center", alignItems: "center" }}>

            <Image style={imageThumbnail} source={require('../../assets/logo.jpg')} />
          </View>



          <View style={section}>
            <View style={[styles.containerStyle, { paddingHorizontal: 10 }]}>
              <Item style={{ borderBottomWidth: 0 }}>
                <Icon active name='md-phone-portrait' />
                <PhoneInput
                  flagStyle={styles.labelStyle}
                  textStyle={styles.inputStyle}
                  textProps={{ placeholder: '300 1234567' }}
                  ref={ref => {
                    this.phone = ref;
                  }}
                  onChangePhoneNumber={(res) => {
                    // console.log(res);
                    if (this.phone.getValue()) {
                      this.setState({ phoneNumber: this.phone.getValue() })
                    }
                  }}
                  autoFormat={true}
                  initialCountry="pk" />
              </Item>
            </View>
          </View>

          <Text style={styles.messageText}>
            {this.state.message}
          </Text>



          <StyledButton style={{ borderWidth: 0, height: 60, backgroundColor: "#0065b3", justifyContent: "center", alignItems: "center", borderRadius: 6, borderColor: "#ffca08" }} transparent onPress={this.onRegisterWithPhone} >
            <Text style={{ color: "#fff", fontSize: 24 }}>
              Reset Password
                  </Text>
          </StyledButton>
          <Text style={errorTextStyle}>
            {error}
          </Text>

          {/* <Button title="Signup" onPress={this.onRegisterWithPhone} /> */}

        </View >

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
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    marginTop: 15,
    borderRadius: 6,
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  messageText: {
    alignSelf: 'center',
    fontSize: 18,
  },
  imageThumbnail: {
    borderRadius: 100,
    width: 150,
    height: 150,

  },
  containerStyle: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelStyle: {


    fontSize: 8,
    // paddingLeft: 20,
    // marginLeft: 20,
    // // paddingRight: 20,
    // marginRight: 40,
    // flex: 0.10,
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    // flex: 3,

  }
});


