/* eslint-disable global-require */
import React, { memo, useEffect } from 'react';
import {
  TouchableOpacity, StyleSheet, Text, View, Image
} from 'react-native';

import { Container, Content, Thumbnail } from 'native-base';
import UserAvatar from 'react-native-user-avatar';
import Background from '../components/Background';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { removeItem, getItem } from '../services/deviceStorage';
import {
  QUIZ_TYPES,
} from '../core/constraint';

const logoutUser = async ({ navigation }) => {
  await removeItem({
    key: 'user',
  });

  navigation.navigate('LoginScreen');
};

const moveQuizSecreen = async ({ navigation }) => {
  navigation.navigate('QuizScreen', { type: QUIZ_TYPES.QUIZ_GAME });
};

const moveBasicQuizSecreen = async ({ navigation }) => {
  navigation.navigate('QuizBasicScreen', { type: QUIZ_TYPES.QUIZ_BASIC });
};

const moveBlankInFillsScreen = async ({ navigation }) => {
  navigation.navigate('QuizScreen', { type: QUIZ_TYPES.FILL_IN_BLANKS });
};

const moveSettingsScreen = async ({ navigation }) => {
  navigation.navigate('SettingsScreen');
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
        <Content style={styles.background}>
          <Image source={require('../../assets/logo.png')} style={{ width: 275 }} resizeMode="contain" />


          { member.nameSurname
&&  <Paragraph> <UserAvatar size= {100}  name={member.nameSurname} bgColor="#1266F1" />  </Paragraph>}
          <Paragraph>
            {member.nameSurname}
          </Paragraph>
          <Paragraph>
            {member.email}
          </Paragraph>
          <Button mode="outlined" onPress={() => moveQuizSecreen({ navigation })}>
            Mücadeleci 😱
          </Button>
          <Button mode="outlined" onPress={() => moveBasicQuizSecreen({ navigation })}>
            Antreman Modu 🥸
          </Button>
          <Button mode="outlined" onPress={() => moveBlankInFillsScreen({ navigation })}>
            Boşluk Doldurma 🧐
          </Button>
          <Button mode="outlined" onPress={() => moveSettingsScreen({ navigation })}>
            Ayarlar
          </Button>
          <Button mode="outlined" onPress={() => logoutUser({ navigation })}>
            Çıkış Yap 🧐
          </Button>
        </Content>

      </Background>
    </Container>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default memo(Dashboard);
