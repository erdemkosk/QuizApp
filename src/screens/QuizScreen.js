/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {
  Container, Body, Title, Left, Badge, Button, Header, Content, Card, CardItem, Text, Icon, Right
} from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
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
    };
  }

   generateColor = (number) => {
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

  componentDidMount = () => {
    (async () => {
      await this.fetchQuestion();
    })();
  }

  fetchQuestion = async () => {
    const response = await getQuestion({ difficulty: 1 });

    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      questionText: response.data.question,
      rightAnswer: response.data.answer
    });

    for (let index = 0; index < response.data.answers.length; index += 1) {
      const stateName = `button${index + 1}text`;
      this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
        [stateName]: response.data.answers[index].trim()
      });
    }
  };

   buttonClickHandle = async (buttonNumber) => {
     const stateName = `button${buttonNumber}clicked`;

     this.setState({
       // eslint-disable-next-line react/no-access-state-in-setstate
       [stateName]: !this.state[stateName],
       isWaiting: true,
     });

     setTimeout(() => {
       this.setState({
         isWaiting: false,
         isAnyButtonPressed: true,
       });
     }, 1000);

     setTimeout(() => {
       this.fetchQuestion();
       this.resetStates();
     }, 2000);
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
     });
   };

   render() {
     return (
       <Container>
         <ImageBackground resizeMode="cover" source={require('../../assets/background_dot.png')} style={{ height: '100%' }}>

           <Header>
             <Left>
               <Button transparent>
                 <Icon name="arrow-back" />
               </Button>
             </Left>
             <Body>
               <Title>Header</Title>
             </Body>
             <Right>
               <Button transparent>
                 <Icon name="menu" />
               </Button>
             </Right>
           </Header>
           <Content padder contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
             <Card>
               <CardItem style={{ backgroundColor: '#343A40' }}>
                 <CardItem style={{ backgroundColor: '#343A40' }}>
                   <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 22 }}>
                     {this.state.questionText}
                     ?
                   </Text>
                   <Body />
                   <Right>
                     <Button style={{ backgroundColor: '#6C757D' }}>
                       <Badge primary style={{ backgroundColor: '#6C757D' }}>
                         <Text style={{ fontWeight: 'bold' }}>
                           S
                         </Text>
                         <Text style={{ backgroundColor: '#FFFFFF' }}>2</Text>
                       </Badge>
                       <Badge primary style={{ backgroundColor: '#6C757D' }}>
                         <Text style={{ fontWeight: 'bold' }}>D</Text>
                         <Text>1</Text>
                       </Badge>
                       <Badge primary style={{ backgroundColor: '#6C757D' }}>
                         <Text style={{ fontWeight: 'bold' }}>Y</Text>
                         <Text>1</Text>
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
                       this.generateColor(1)
                     }}
                     onPress={() => {
                       this.buttonClickHandle(1);
                     }}
                   >
                     <Text>{this.state.button1text}</Text>
                   </Button>
                   <Button
                     full
                     style={{ marginTop: 20, backgroundColor: this.generateColor(2) }}
                     onPress={() => {
                       this.buttonClickHandle(2);
                     }}
                   >
                     <Text>{this.state.button2text}</Text>
                   </Button>
                   <Button
                     full
                     style={{ marginTop: 20, backgroundColor: this.generateColor(3) }}
                     onPress={() => {
                       this.buttonClickHandle(3);
                     }}
                   >
                     <Text>{this.state.button3text}</Text>
                   </Button>
                   <Button
                     full
                     style={{ marginTop: 20, backgroundColor: this.generateColor(4) }}
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
