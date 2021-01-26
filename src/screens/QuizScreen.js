/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable max-len */
/* eslint-disable import/named */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, ImageBackground, Animated, Image, View
} from 'react-native';
import {
  Body, Left, Badge, Button, Header, Content, Card, CardItem, Text, Icon, Right
} from 'native-base';
import Modal from 'react-native-modal';
import { ProgressBar, Chip } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import * as Speech from 'expo-speech';
import { getQuestion, getFillInBlanks } from '../controllers/question';
import { updateStatistic } from '../controllers/member';
import { getItem } from '../services/deviceStorage';
import {
  RETRY_BUTTON_MESSAGES, COLORS, STATE_COLORS, QUIZ_TYPES, SPEED_ICONS, RETRY_MESSAGES
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
      time: 10,
      questionCountPerState: 4,
      answerSum: 0,
      userDifficultyLevel: 1,
      userDifficultyState: 1,
      isVisibleSFailedModel: false,
      userPoint: 0,
      token: '',
      id: '',
    };
  }

  componentDidMount = () => {
    (async () => {
      await this.loadToken();
      await this.fetchQuestion();
    })();

    const { params } = this.props.navigation.state;

    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      gameType: params.type,
    });

    this.startTime();
  }

  fetchQuestion = async () => {
    let response;

    const { params } = this.props.navigation.state;

    if (params.type === QUIZ_TYPES.QUIZ_GAME || params.type === QUIZ_TYPES.QUIZ_BASIC) {
      response = await getQuestion({ difficulty: this.state.userDifficultyLevel });
    } else {
      response = await getFillInBlanks({ difficulty: this.state.userDifficultyLevel });
    }

    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      gameType: params.type,
      questionText: response.results.question.split('-')[0],
      rightAnswer: response.results.correctAnswer
    });

    if (params.type === 1) {
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

  loadToken = async () => {
    const value = await getItem({ key: 'token' });
    const response = JSON.parse(value);
    this.setState({
      token: response.token,
      id: response.id,
    });
  }

  sendStatistic = async () => {
    await updateStatistic({
      id: this.state.id, isRightAnswer: this.state.isAnsweredSuccesfull, point: this.state.userDifficultyState, token: this.state.token
    });
  };

  buttonClickHandle = async (buttonNumber) => {
    // Avoid to generate new state check until reset
    if (!this.state.button1clicked
       && !this.state.button2clicked
       && !this.state.button3clicked
       && !this.state.button4clicked) {
      const stateName = `button${buttonNumber}clicked`;

      this.stopTime();

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
          time: prevState.isAnsweredSuccesfull ? prevState.time + prevState.userDifficultyState * 2 : prevState.time,
          questionCountPerState: prevState.userDifficultyState * 2,
          isWaiting: false,
          isAnyButtonPressed: true,
          successfullCount: prevState.isAnsweredSuccesfull ? prevState.successfullCount + 1 : prevState.successfullCount,
          failedCount: !prevState.isAnsweredSuccesfull ? prevState.failedCount + 1 : prevState.failedCount,
          // eslint-disable-next-line no-nested-ternary
          answerSum: prevState.isAnsweredSuccesfull ? prevState.answerSum + 1 : prevState.answerSum > 0 ? prevState.answerSum - 1 : prevState.answerSum,
          userPoint: prevState.isAnsweredSuccesfull ? prevState.userPoint + prevState.userDifficultyState : prevState.userPoint,
        }));

        const answerSum = 0;
        const userDifficultyState = this.state.answerSum / this.state.questionCountPerState === 1 ? this.state.userDifficultyState + 1 : this.state.userDifficultyState;
        const userDifficultyLevel = this.state.userDifficultyLevel < 7 ? Math.ceil(userDifficultyState / 2) : this.state.userDifficultyLevel;

        if (userDifficultyState !== this.state.userDifficultyState) {
          this.setState({
            answerSum,
            userDifficultyLevel,
            userDifficultyState,
          });
        }
      }, 1000);

      setTimeout(() => {
        this.sendStatistic();
        this.startTime();
        this.fetchQuestion();
        this.resetStates();
      }, 2000);
    }
  };

  returnToDashboard = () => {
    this.props.navigation.navigate('Dashboard');
  }

  resetGame = () => {
    this.stopTime();
    this.setState({
      isVisible: true,
      answerSum: 0,
      userDifficultyLevel: 1,
      userDifficultyState: 1,
      successfullCount: 0,
      failedCount: 0,
      isVisibleSFailedModel: true,
      userPoint: 0,
    });
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

   modelHandler =() => {
     this.resetGame();
     this.startTime();
     this.setState({
       isVisibleSFailedModel: false,
       time: 10
     });
     this.fetchQuestion();
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
       return STATE_COLORS[this.state.userDifficultyLevel];
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

  startTime = () => {
    this.interval = setInterval(() => {
      if (this.state.time <= 0) {
        this.resetGame();
      }
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, 1000);
  }

  stopTime = () => {
    clearInterval(this.interval);
  }

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
                    <Text >{RETRY_MESSAGES[Math.floor(Math.random() * (3 - 1 + 1)) + 1]}</Text>
                    <Button
                      style={{ marginTop: 30 }}
                      full
                      bordered
                      onPress={() => {
                        this.modelHandler();
                      }}
                    >
                      <Text>{RETRY_BUTTON_MESSAGES[Math.floor(Math.random() * (4 - 1 + 1)) + 1]}</Text>
                    </Button>
                  </Body>
                </CardItem>
              </Card>
            </Modal>

            <CountDown
              style={{ margin: 15 }}
              until={this.state.time}
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

                <Badge primary style={{ backgroundColor: '#6C757D' }}>
                  <Chip outlined icon="layers">
                    {this.state.userPoint}
                    {' '}
                    Puan
                  </Chip>

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
  text: {
    fontSize: 22,
    fontFamily: 'OpenSans-Italic'
  }

});
