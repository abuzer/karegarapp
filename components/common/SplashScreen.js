import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
  const { form, section, errorTextStyle, imageThumbnail } = styles;

  return (
    <View style={form}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>

        <Image style={imageThumbnail} source={require('../../../assets/logo.jpg')} />
      </View>


    </View>
  );
};

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

export { SplashScreen };
