/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable max-len */
/* eslint-disable import/named */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, ImageBackground, Animated, Image, View, Platform
} from 'react-native';
import {
  Body, Left, Badge, Button, Header, Content, Card, CardItem, Text, Icon, Right, Form, Picker
} from 'native-base';
import Modal from 'react-native-modal';
import { ProgressBar, Chip } from 'react-native-paper';
import * as Speech from 'expo-speech';
import { getQuestion, getFillInBlanks } from '../controllers/question';
import {
  RETRY_MESSAGES, COLORS, STATE_COLORS, QUIZ_TYPES, SPEED_ICONS,
} from '../core/constraint';

export default class QuizScreen extends Component {
  constructor(props) {
    super(props);

    this.shakeAnimation = new Animated.Value(0);

    this.state = {
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
      userDifficultyLevel: 1,
      difficulties: [
        { label: 'Seviye: A1', id: 1 },
        { label: 'Seviye: A2', id: 2 },
        { label: 'Seviye: B1', id: 3 },
        { label: 'Seviye: B2', id: 4 },
        { label: 'Seviye: C1', id: 5 },
        { label: 'Seviye: C2', id: 6 },
      ],
    };
  }

  componentDidMount = () => {
    (async () => {
      await this.fetchQuestion();
    })();

    const { params } = this.props.navigation.state;

    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      gameType: params.type,
    });
  }

  fetchQuestion = async () => {
    let response;

    const { params } = this.props.navigation.state;

    if (params.type === QUIZ_TYPES.QUIZ_GAME || params.type === QUIZ_TYPES.QUIZ_BASIC) {
      response = await getQuestion({ difficulty: Number(this.state.userDifficultyLevel) });
    } else {
      response = await getFillInBlanks({ difficulty: Number(this.state.userDifficultyLevel) });
    }

    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      gameType: params.type,
      questionText: response.results.question.split('-')[0],
      rightAnswer: response.results.correctAnswer
    });

    if (params.type === QUIZ_TYPES.QUIZ_GAME || params.type === QUIZ_TYPES.QUIZ_BASIC) {
      Speech.speak(response.results.question, {
        language: 'en'
      });
    } else {
      Speech.speak(response.results.question.split('-')[1], {
        language: 'tr'
      });
    }

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

      setTimeout(() => {
        if (this.state.isAnsweredSuccesfull === false) {
          this.startShake();
        }

        this.setState((prevState) => ({
          isWaiting: false,
          isAnyButtonPressed: true,
          successfullCount: prevState.isAnsweredSuccesfull ? prevState.successfullCount + 1 : prevState.successfullCount,
          failedCount: !prevState.isAnsweredSuccesfull ? prevState.failedCount + 1 : prevState.failedCount,
          // eslint-disable-next-line no-nested-ternary
        }));
      }, 1000);

      setTimeout(() => {
        this.fetchQuestion();
        this.resetStates();
      }, 2000);
    }
  };

  onValueChange(value) {
    this.setState({
      userDifficultyLevel: value
    });

    this.fetchQuestion();
  }

  returnToDashboard = () => {
    this.props.navigation.navigate('Dashboard');
  }

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

   startShake = () => {
     Animated.sequence([
       Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
       Animated.timing(this.shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
       Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
       Animated.timing(this.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
     ]).start();
   }

   generateColorForHeader = () => {
     if (!this.state.isAnyButtonPressed) {
       return COLORS.DEFAULT;
     }

     if (this.state.isAnsweredSuccesfull) {
       return COLORS.SUCCESS;
     }

     return COLORS.WRONG;
   };

   generateColorForBar = () => {
     if (!this.state.isAnyButtonPressed) {
       return STATE_COLORS[Number(this.state.userDifficultyLevel)];
     }

     if (this.state.isAnsweredSuccesfull) {
       return COLORS.SUCCESS;
     }

     return COLORS.WRONG;
   };

   generateColorForTimer = () => {
     if (this.state.time < 3) {
       return COLORS.WRONG;
     }

     if (this.state.isAnsweredSuccesfull && !this.state.isWaiting) {
       return COLORS.SUCCESS;
     }

     return COLORS.DEFAULT;
   };

   generateColorForButtons = (number) => {
     const clickState = `button${number}clicked`;
     const rightAnswerChecked = number - 1;

     if (this.state.isWaiting && this.state[clickState]) {
       return COLORS.SELECTED;
     }

     if (this.state[clickState]) {
       if (this.state.rightAnswer === rightAnswerChecked) {
         return COLORS.SUCCESS;
       }

       return COLORS.WRONG;
     }

     if (this.state.rightAnswer === rightAnswerChecked && this.state.isAnyButtonPressed) {
       return COLORS.SUCCESS;
     }

     return COLORS.DEFAULT;
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
               
             </Right>
           </Header>
           <Content padder contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
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
                       onPress={() => {
                         this.modelHandler();
                       }}
                     >
                       <Text>{RETRY_MESSAGES[Math.floor(Math.random() * (4 - 1 + 1)) + 1]}</Text>
                     </Button>
                   </Body>
                 </CardItem>
               </Card>
             </Modal>

             <Button
               full
               style={{
                 backgroundColor: '#6C757D',
               }}
             >
               <View style={{
                 flex: 1,
                 flexDirection: 'row',
                 justifyContent: 'space-between',
               }}
               >
                 <Badge primary style={{ backgroundColor: '#6C757D' }}>
                   <Chip icon={SPEED_ICONS[this.state.answerSum < 3 ? this.state.answerSum : 2]}>
                     T:

                     {this.state.successfullCount + this.state.failedCount}
                     {' '}
                     D:

                     {this.state.successfullCount}
                     {' '}
                     Y:

                     {this.state.failedCount}
                     {' '}
                   </Chip>

                 </Badge>

                 <Badge primary style={{ backgroundColor: '#6C757D' }}>
                   <Form>
                     <Picker

                       iosHeader="Zorluk Seviyesi"
                       style={{ width:(Platform.OS === 'ios') ? undefined : 160}}
                       Header="Zorluk Seviyesi"
                       mode="dropdown"
                       iosIcon={<Icon style={{ color: '#FFFFFF' }} name="arrow-down" />}
                       textStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
                       selectedValue={this.state.userDifficultyLevel}
                       onValueChange={(value) => this.onValueChange(value)}
                     >
                       {this.state.difficulties.map((branches, i) => (
                         <Picker.Item label={branches.label} value={branches.id} key={i} />
                       ))}
                     </Picker>

                   </Form>
                 </Badge>
               </View>

             </Button>
             <ProgressBar progress={(this.state.answerSum) / this.state.questionCountPerState} color={this.generateColorForBar()} />

             <Card>
               <CardItem style={{ backgroundColor: this.generateColorForHeader() }}>
                 <CardItem style={{ backgroundColor: this.generateColorForHeader() }}>
                   <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 22 }}>
                     {this.state.questionText}
                     ?
                   </Text>
                   <Body />
                   <Right />
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
