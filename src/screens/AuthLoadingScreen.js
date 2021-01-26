import React, { memo, useEffect, useState } from 'react';
import {
  View, Image, ImageBackground, StyleSheet
} from 'react-native';
import *  as Font from 'expo-font';
import { getItem } from '../services/deviceStorage';

const AuthLoadingScreen = ({ navigation }) => {
  const [image, setImage] = useState(false);
  useEffect(() => {
    // Create an scoped async function in the hook
    async function loadUserMail() {
      const user = await getItem({ key: 'token' });

      if (user) {
        // User is logged in
        navigation.navigate('Dashboard');
      } else {
        // User is not logged in
        navigation.navigate('HomeScreen');
      }
    }

    (async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
      });
    })();

    // Execute the created function directly
    setTimeout(() => {
      setImage(true);
    }, 1200);
    setTimeout(() => {
      loadUserMail();
    }, 1800);
    // loadUserMail();
  }, []);

  const icon = image ? require('../../assets/mekwhite.png') : require('../../assets/splash.gif');

  return (
    <View style={styles.container}>
      <Image resizeMode="center" style={styles.logo} source={icon} />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#000000'
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default memo(AuthLoadingScreen);
