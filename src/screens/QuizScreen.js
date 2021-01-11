/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable max-len */
/* eslint-disable import/named */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, ImageBackground, Animated, Image
} from 'react-native';
import {
  Container, Body, Title, Left, Badge, Button, Header, Content, Card, CardItem, Text, Icon, Right, Thumbnail
} from 'native-base';
import Modal from 'react-native-modal';
import { ProgressBar, Colors } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import * as Speech from 'expo-speech';
import { getQuestion } from '../controllers/question';

export default class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.shakeAnimation = new Animated.Value(0);
    this.state = {
      levelStateColors: ['#1abc9c', '#3498db', '#8e44ad', '#d35400', '#c0392b'],
      starModelButonsText: ['Hadi Başlayalım 🤙', 'Tekrar Hoşgeldin 🤩', 'İngilizce Öğrenme Vakti 🔥', 'Hadi biraz antreman 😋', 'Gönderin Gelsin 😬'],
      failedButonsText: ['Hadi Tekrar Başlayalım 🤙', 'Daha bu başlangıç 🤩', 'Kol Bozuktu 🔥', 'Hızlanmak şart 😋', 'Bir daha deneyeyim 😬'],
      button1clicked: false,
      button2clicked: false,
      button3clicked: false,
      button4clicked: false,
      button1text: '',
      button2text: '',
      button3text: '',
      button4text: '',
      questionText: '',
      rightAnswer: -1,
      isWaiting: false,
      isAnyButtonPressed: false,
      isAnsweredSuccesfull: false,
      successfullCount: 0,
      failedCount: 0,
      time: 10,
      questionCountPerLevel: 4,
      answerSum: 0,
      userDifficultyLevel: 1,
      userDifficultyState: 1,
      isVisibleStartingModel: true,
      isVisibleSFailedModel: false,
    };
  }

  returnToDashboard = () => {
    this.props.navigation.navigate('Dashboard');
  }

  gameOver = () => {
    clearInterval(this.interval);
    this.setState({
      isVisible: true,
      answerSum: 0,
      userDifficultyLevel: 1,
      successfullCount: 0,
      failedCount: 0,
      isVisibleSFailedModel: true,
    });
  }

   generateColorForButtons = (number) => {
     const selected = '#1266F1';
     const success = '#00B74A';
     const wrong = '#F93154';
     const notPressed = '#6C757D';

     const clickState = `button${number}clicked`;
     const rightAnswerChecked = number - 1;

     if (this.state.isWaiting && this.state[clickState]) {
       return selected;
     }

     if (this.state[clickState]) {
       if (this.state.rightAnswer === rightAnswerChecked) {
         return success;
       }

       return wrong;
     }

     if (this.state.rightAnswer === rightAnswerChecked && this.state.isAnyButtonPressed) {
       return success;
     }

     return notPressed;
   };

   startShake = () => {
     Animated.sequence([
       Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
       Animated.timing(this.shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
       Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
       Animated.timing(this.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
     ]).start();
   }

   generateColorForHeader = () => {
     const success = '#00B74A';
     const wrong = '#F93154';
     const defaultColor = '#343A40';

     if (!this.state.isAnyButtonPressed) {
       return defaultColor;
     }

     if (this.state.isAnsweredSuccesfull) {
       return success;
     }

     return wrong;
   };

   generateColorForBar = () => {
     const success = '#00B74A';
     const wrong = '#F93154';
     const defaultColor = this.state.levelStateColors[this.state.userDifficultyLevel];

     if (!this.state.isAnyButtonPressed) {
       return defaultColor;
     }

     if (this.state.isAnsweredSuccesfull) {
       return success;
     }

     return wrong;
   };

   generateColorForTimer = () => {
     const success = '#00B74A';
     const warning = '#F93154';
     const defaultColor = '#343A40';

     if (this.state.time < 3) {
       return warning;
     }

     if (this.state.isAnsweredSuccesfull && !this.state.isWaiting) {
       return success;
     }

     return defaultColor;
   };

  componentDidMount = () => {
    (async () => {
      await this.fetchQuestion();
    })();
  }

  replayGame = () => {
    this.setState({
      time: 10,
      isVisibleStartingModel: false,
      isVisibleSFailedModel: false,
    });
  };

  decreaseTime = () => {
    this.setState((prevState) => ({ time: prevState.time - 1 }));
  };

  startingModelAction = () => {

    this.setState({
      isVisibleStartingModel: false,
      isVisibleSFailedModel: false,
    });
  }

  fetchQuestion = async () => {
    const response = await getQuestion({ difficulty: this.state.userDifficultyLevel });

    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      questionText: response.results.question,
      rightAnswer: response.results.correctAnswer
    });

    Speech.speak(response.results.question, {
      language: 'en'
    });

    for (let index = 0; index < response.results.answers.length; index += 1) {
      const stateName = `button${index + 1}text`;
      this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
        [stateName]: response.results.answers[index].trim()
      });
    }
  };

   buttonClickHandle = async (buttonNumber) => {
     // Avoid to generate new state check until reset
     if (!this.state.button1clicked
        && !this.state.button2clicked
        && !this.state.button3clicked
        && !this.state.button4clicked) {
       const stateName = `button${buttonNumber}clicked`;

       this.setState((prevState) => ({
         [stateName]: true,
         isWaiting: true,
         isAnsweredSuccesfull: prevState.rightAnswer === buttonNumber - 1
       }));

       const userDifficultyLevel = (this.state.answerSum / this.state.questionCountPerLevel === 1 && this.state.userDifficultyLevel < 6) ? this.state.userDifficultyLevel + 1 : this.state.userDifficultyLevel;
       const userDifficultyState = this.state.answerSum / this.state.questionCountPerLevel === 1 ? this.stateuserDifficultyLevel + 1 : userDifficultyLevel;
       const answerSum = 0;

       if (userDifficultyLevel !== this.state.userDifficultyLevel) {
         this.setState({
           answerSum,
         });
       }

       setTimeout(() => {
         if (this.state.isAnsweredSuccesfull === false) {
           this.startShake();
         }

         this.setState((prevState) => ({
           time: prevState.rightAnswer === buttonNumber - 1 ? prevState.time + 5 : prevState.time,
           isWaiting: false,
           isAnyButtonPressed: true,
           successfullCount: prevState.isAnsweredSuccesfull ? prevState.successfullCount + 1 : prevState.successfullCount,
           failedCount: !prevState.isAnsweredSuccesfull ? prevState.failedCount + 1 : prevState.failedCount,
           // eslint-disable-next-line no-nested-ternary
           answerSum: prevState.isAnsweredSuccesfull ? prevState.answerSum + 1 : prevState.answerSum > 0 ? prevState.answerSum - 1 : prevState.answerSum,
           userDifficultyLevel,
           userDifficultyState,
         }));
       }, 1000);

       setTimeout(() => {
         this.fetchQuestion();
         this.resetStates();
       }, 2000);
     }
   };

   resetStates = async () => {
     this.setState({
       // eslint-disable-next-line react/no-access-state-in-setstate
       button1clicked: false,
       button2clicked: false,
       button3clicked: false,
       button4clicked: false,
       rightAnswer: -1,
       isAnyButtonPressed: false,
       isAnsweredSuccesfull: false,
     });
   };

   render() {
     return (
       <Animated.View style={{ transform: [{ translateX: this.shakeAnimation }] }}>
         <ImageBackground resizeMode="cover" source={require('../../assets/crop.png')} style={{ height: '100%' }}>
           <Header>
             <Left>
               <Button onPress={() => this.returnToDashboard()} transparent>
                 <Icon name="arrow-back" />
               </Button>
             </Left>
             <Body>
               <Image source={require('../../assets/logo.png')} style={{ width: 150 }} resizeMode="contain" />
             </Body>
             <Right>
               <Button transparent>
                 <Icon name="menu" />
               </Button>
             </Right>
           </Header>
           <Content padder contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
             <Modal isVisible={this.state.isVisibleStartingModel}>
               <Card style={{ backgroundColor: 'transparent' }}>
                 <CardItem>
                   <Body style={{ alignItems: 'center' }}>
                     <Image source={require('../../assets/logo.png')} style={{ width: 300 }} resizeMode="contain" />
                     <Text>İngilizce kelime öğrenmenin en kolay yolu 🤙. Boş zamanlarında senin için oluşturulan rastgele ingilizce kelime testlerini cevapla 🙏 Kendini geliştir!</Text>
                     <Button
                       style={{ marginTop: 30 }}
                       full
                       bordered
                       onPress={this.startingModelAction}
                     >
                       <Text>{this.state.starModelButonsText[Math.floor(Math.random() * (4 - 1 + 1)) + 1]}</Text>
                     </Button>
                   </Body>
                 </CardItem>
               </Card>
             </Modal>
             <Modal isVisible={this.state.isVisibleSFailedModel}>
               <Card style={{ backgroundColor: 'transparent' }}>
                 <CardItem>
                   <Body style={{ alignItems: 'center' }}>
                     <Image source={require('../../assets/logo.png')} style={{ width: 300 }} resizeMode="contain" />
                     <Text>Kaybettin tekrar oyna</Text>
                     <Button
                       style={{ marginTop: 30 }}
                       full
                       bordered
                       onPress={this.startingModelAction}
                     >
                       <Text>{this.state.failedButonsText[Math.floor(Math.random() * (4 - 1 + 1)) + 1]}</Text>
                     </Button>
                   </Body>
                 </CardItem>
               </Card>
             </Modal>
             <CountDown
               style={{ margin: 15 }}
               until={this.state.time}
               onFinish={this.gameOver}
               onChange={this.decreaseTime}
               size={30}
               digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: this.generateColorForTimer() }}
               digitTxtStyle={{ color: this.generateColorForTimer() }}
               timeToShow={['M', 'S']}
               timeLabels={{ m: 'Dakika', s: 'Saniye' }}
               running={!this.state.isWaiting}
             />
             <Button
               full
               style={{
                 backgroundColor: '#6C757D',
               }}
             >
               <Badge primary style={{ backgroundColor: '#6C757D' }}>
                 <Text style={{ fontWeight: 'bold' }}>
                   Seviye
                   {' '}
                   {this.state.userDifficultyLevel}
                 </Text>
                 <Text style={{ fontWeight: 'bold', color: this.generateColorForBar() }}>
                   X
                   {' '}
                   {this.state.userDifficultyState}
                 </Text>
               </Badge>
             </Button>
             <ProgressBar progress={(this.state.answerSum) / this.state.questionCountPerLevel} color={this.generateColorForBar()} />

             <Card>
               <CardItem style={{ backgroundColor: this.generateColorForHeader() }}>
                 <CardItem style={{ backgroundColor: this.generateColorForHeader() }}>
                   <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 22 }}>
                     {this.state.questionText}
                     ?
                   </Text>
                   <Body />
                   <Right>
                     <Button style={{ backgroundColor: '#6C757D' }}>
                       <Badge primary style={{ backgroundColor: '#6C757D' }}>
                         <Text style={{ fontWeight: 'bold' }}>
                           T
                         </Text>
                         <Text>{this.state.successfullCount + this.state.failedCount}</Text>
                       </Badge>
                       <Badge primary style={{ backgroundColor: '#6C757D' }}>
                         <Text style={{ fontWeight: 'bold' }}>D</Text>
                         <Text>{this.state.successfullCount}</Text>
                       </Badge>
                       <Badge primary style={{ backgroundColor: '#6C757D' }}>
                         <Text style={{ fontWeight: 'bold' }}>Y</Text>
                         <Text>{this.state.failedCount}</Text>
                       </Badge>
                     </Button>
                   </Right>
                 </CardItem>
                 <Content />
               </CardItem>
               <CardItem bordered>
                 <Body>
                   <Button
                     full
                     style={{
                       marginTop: 20,
                       backgroundColor:
                       this.generateColorForButtons(1)
                     }}
                     onPress={() => {
                       this.buttonClickHandle(1);
                     }}
                   >
                     <Text>{this.state.button1text}</Text>
                   </Button>
                   <Button
                     full
                     style={{ marginTop: 20, backgroundColor: this.generateColorForButtons(2) }}
                     onPress={() => {
                       this.buttonClickHandle(2);
                     }}
                   >
                     <Text>{this.state.button2text}</Text>
                   </Button>
                   <Button
                     full
                     style={{ marginTop: 20, backgroundColor: this.generateColorForButtons(3) }}
                     onPress={() => {
                       this.buttonClickHandle(3);
                     }}
                   >
                     <Text>{this.state.button3text}</Text>
                   </Button>
                   <Button
                     full
                     style={{ marginTop: 20, backgroundColor: this.generateColorForButtons(4) }}
                     onPress={() => {
                       this.buttonClickHandle(4);
                     }}
                   >
                     <Text>{this.state.button4text}</Text>
                   </Button>
                 </Body>
               </CardItem>

             </Card>
           </Content>
         </ImageBackground>
       </Animated.View>

     );
   }
}
const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  success: {
    color: '#fff',
  },
  background: {
    flex: 1,
    width: '100%'
  },

});
