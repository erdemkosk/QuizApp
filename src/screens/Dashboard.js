/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  TouchableOpacity, StyleSheet, Text, View, Image
} from 'react-native';

import { Container, Content, Thumbnail } from 'native-base';
import UserAvatar from 'react-native-user-avatar';
import Background from '../components/Background';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { removeItem, getItem } from '../services/deviceStorage';
import { getMember } from '../controllers/member';
import {
  QUIZ_TYPES,
} from '../core/constraint';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      id: '',
      member: {},

    };
  }

  componentDidMount = () => {
    this.loadToken();
  }

  loadToken = async () => {
    const value = await getItem({ key: 'token' });
    const response = JSON.parse(value);
    this.setState({
      token: response.token,
      id: response.id,
    });
    await this.loadMember();
  }

  loadMember = async () => {
    const member = await getMember({ id: this.state.id, token: this.state.token });

    this.setState({
      member,
    });
  }

   logoutUser = async () => {
     await removeItem({
       key: 'token',
     });

     this.props.navigation.navigate('LoginScreen');
   };

   moveQuizSecreen = async () => {
     this.props.navigation.navigate('QuizScreen', { type: QUIZ_TYPES.QUIZ_GAME });
   };

   moveBasicQuizSecreen = async () => {
     this.props.navigation.navigate('QuizBasicScreen', { type: QUIZ_TYPES.QUIZ_BASIC });
   };

   moveBlankInFillsScreen = async () => {
     this.props.navigation.navigate('QuizScreen', { type: QUIZ_TYPES.FILL_IN_BLANKS });
   };

   moveSettingsScreen = async () => {
     this.props.navigation.navigate('SettingsScreen');
   };

   render() {
     return (
       <Container>
         <Background>
           <Content style={styles.background}>
             <Image source={require('../../assets/logo.png')} style={{ width: 275 }} resizeMode="contain" />

             { this.state.member.nameSurname
&&  <Paragraph>   </Paragraph>}
          <Paragraph>
            {this.state.member.nameSurname}
          </Paragraph>
          <Paragraph>
            Tüm kullanıcılar içinde {this.state.member.rank}. sıradasın!
          </Paragraph>
          <Paragraph>
            {this.state.member.email}
          </Paragraph>

             <Button mode="outlined" onPress={() => this.moveQuizSecreen()}>
               Mücadeleci 😱
             </Button>
             <Button mode="outlined" onPress={() => this.moveBasicQuizSecreen()}>
               Antreman Modu 🥸
             </Button>
             <Button mode="outlined" onPress={() => this.moveBlankInFillsScreen()}>
               Boşluk Doldurma 🧐
             </Button>
             <Button mode="outlined" onPress={() => this.moveSettingsScreen()}>
               Ayarlar
             </Button>
             <Button mode="outlined" onPress={() => this.logoutUser()}>
               Çıkış Yap 🧐
             </Button>
           </Content>

         </Background>
       </Container>
     );
   }
}
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
