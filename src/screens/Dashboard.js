/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  StyleSheet, Image, View, Animated
} from 'react-native';

import { Container, Content } from 'native-base';
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
      startValue: new Animated.Value(0.7),
      endValue: 1,

    };
  }

  componentDidMount = () => {
    this.loadToken();

    this.startSpring();

    const { navigation } = this.props;
    navigation.addListener('willFocus', async () => {
      await this.loadMember();
      this.startSpring();
    });
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

   moveProfileScreen= async () => {
     this.props.navigation.navigate('ProfileScreen', { member: this.state.member });
   };

   startSpring() {
     this.setState({
       startValue: new Animated.Value(0.7),
     });

     Animated.spring(this.state.startValue, {
       toValue: this.state.endValue,
       friction: 1,
       useNativeDriver: true,
     }).start();
   }

   render() {
     return (
       <Container>
         <Background>
           <View style={styles.container}>
             <Animated.Image
               source={require('../../assets/logo.png')}
               style={{
                 width: 275,
                 transform: [
                   {
                     scale: this.state.startValue,
                   },
                 ],
               }}
               resizeMode="contain"
             />

             <View>
               <Button mode="outlined" onPress={() => this.moveQuizSecreen()}>
               😱 Yarışma 😱
               </Button>
               <Button mode="outlined" onPress={() => this.moveBasicQuizSecreen()}>
               🥸 Antreman 🥸
               </Button>
               <Button mode="outlined" onPress={() => this.moveBlankInFillsScreen()}>
               🧐 Boşluk Doldurma 🧐
               </Button>
               <Button mode="outlined" onPress={() => this.moveSettingsScreen()}>
               ⚙️ Ayarlar ⚙️
               </Button>
               <Button mode="outlined" onPress={() => this.moveProfileScreen()}>
               👤 Profil 👤
               </Button>
               <Button mode="outlined" onPress={() => this.logoutUser()}>
               🧐 Çıkış Yap 🧐
               </Button>
             </View>

           </View>

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
    width: '100%',

    justifyContent: 'center'
  }
});
