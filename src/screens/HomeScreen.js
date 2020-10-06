import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import BottomNavigator from '../components/BottomNavigator';

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Firebase Login</Header>

    <Paragraph>
      This template supports Firebase authorization out of the box.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Sign Up
    </Button>
    <BottomNavigator />
  </Background>
);

export default memo(HomeScreen);
