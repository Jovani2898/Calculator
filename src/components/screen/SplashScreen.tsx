import React from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LottieView
        source={require('../../assets/SplashScreenAnimation.json')}
        loop={false}
        resizeMode="contain"
        autoSize
        autoPlay
      />
    </View>
  );
};
