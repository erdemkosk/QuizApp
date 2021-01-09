/* eslint-disable max-len */
/* eslint-disable import/named */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {
  Container, Body, Title, Left, Badge, Button, Header, Content, Card, CardItem, Text, Icon, Right
} from 'native-base';
import { ProgressBar, Colors } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import { getQuestion } from '../controllers/question';

export default class QuizScreen extends Component {
  constructor(props) {
    super(props);
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
      time: 5,
      questionCountPerLevel: 5,
      answerSum: 0,
      userDifficultyLevel: 1,
    };
  }

  resetGame = () => {
    this.setState({
      answerSum: 0,
      userDifficultyLevel: 1,
      successfullCount: 0,
      failedCount: 0,
      time: 4,
    });
  }

   generateColorForButtons = (number) => {
     const selected = 'blue';
     const success = 'green';
     const wrong = 'red';
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

   generateColorForHeader = () => {
     const success = 'green';
     const wrong = 'red';
     const defaultColor = '#343A40';

     if (!this.state.isAnyButtonPressed) {
       return defaultColor;
     }

     if (this.state.isAnsweredSuccesfull) {
       return success;
     }

     return wrong;
   };

   generateColorForTimer = () => {
     const success = 'green';
     const warning = 'red';
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
    this.interval = setInterval(() => {
      if (this.state.time <= 0) {
        this.resetGame();
      }
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, 1000);

    (async () => {
      await this.fetchQuestion();
    })();
  }

  fetchQuestion = async () => {
    const response = await getQuestion({ difficulty: this.state.userDifficultyLevel });

    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      questionText: response.results.question,
      rightAnswer: response.results.correctAnswer
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
       const answerSum = 0;

       if (userDifficultyLevel !== this.state.userDifficultyLevel) {
         this.setState({
           answerSum,
         });
       }

       setTimeout(() => {
         this.setState((prevState) => ({
           time: prevState.rightAnswer === buttonNumber - 1 ? prevState.time + 10 : prevState.time,
           isWaiting: false,
           isAnyButtonPressed: true,
           successfullCount: prevState.isAnsweredSuccesfull ? prevState.successfullCount + 1 : prevState.successfullCount,
           failedCount: !prevState.isAnsweredSuccesfull ? prevState.failedCount + 1 : prevState.failedCount,
           // eslint-disable-next-line no-nested-ternary
           answerSum: prevState.isAnsweredSuccesfull ? prevState.answerSum + 1 : prevState.answerSum > 0 ? prevState.answerSum - 1 : prevState.answerSum,
           userDifficultyLevel,
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
       <Container>
         <ImageBackground resizeMode="cover" source={require('../../assets/crop.png')} style={{ height: '100%' }}>
           <Header>
             <Left>
               <Button transparent>
                 <Icon name="arrow-back" />
               </Button>
             </Left>
             <Body>
               <Title>Quiz It</Title>
             </Body>
             <Right>
               <Button transparent>
                 <Icon name="menu" />
               </Button>
             </Right>
           </Header>

           <Content padder contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
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
             <ProgressBar progress={(this.state.answerSum) / this.state.questionCountPerLevel} color={this.generateColorForHeader()} />

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
       </Container>

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
