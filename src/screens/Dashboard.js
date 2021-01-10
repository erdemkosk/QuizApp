/* eslint-disable global-require */
import React, { memo, useEffect } from 'react';
import {
  TouchableOpacity, StyleSheet, Text, View, Image
} from 'react-native';

import { Container, Thumbnail } from 'native-base';
import UserAvatar from 'react-native-user-avatar';
import Background from '../components/Background';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { removeItem, getItem } from '../services/deviceStorage';

const logoutUser = async ({ navigation }) => {
  await removeItem({
    key: 'user',
  });

  navigation.navigate('LoginScreen');
};

const moveQuizSecreen = async ({ navigation }) => {
  navigation.navigate('QuizScreen');
};

const Dashboard = ({ navigation }) => {
  const [member, setMember] = React.useState(0);
  useEffect(() => {
    // Create an scoped async function in the hook
    async function loadUser() {
      const value = await getItem({ key: 'user' });
      const response = JSON.parse(value);
      setMember(response);
    }
    // Execute the created function directly
    loadUser();
  }, []);

  return (
    <Container>
      <Background>
        <Image source={require('../../assets/logo.png')} style={{ width: 275 }} resizeMode="contain" />

        { member.nameSurname
   && <UserAvatar size={100} name={member.nameSurname} bgColor="#1266F1" />}
        <Paragraph>
          {member.nameSurname}
        </Paragraph>
        <Paragraph>
          {member.email}
        </Paragraph>
        <Button mode="outlined" onPress={() => moveQuizSecreen({ navigation })}>
          Oyuna Başla
        </Button>
        <Button mode="outlined" onPress={() => logoutUser({ navigation })}>
          Çıkış Yap
        </Button>
      </Background>
    </Container>
  );
};

export default memo(Dashboard);
