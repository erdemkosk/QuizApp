/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Container, Header, Content, ListItem, Left, Body, Right, Text, Button, Switch, Icon, Separator
} from 'native-base';
import {
  Image
} from 'react-native';

import UserAvatar from 'react-native-user-avatar';
import { ProgressBar } from 'react-native-paper';
import { getTopten } from '../controllers/member';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };
  }

    returnToDashboard = () => {
      this.props.navigation.navigate('Dashboard');
    }

    componentDidMount() {
      (async () => {
        await this.getStatisticFromApi();
      })();
    }

    getStatisticFromApi = async () => {
      const response = await getTopten();
      this.setState({
        members: response,
      });
    }

    render() {
      return (
        <Container>
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
          <Content>
            <Separator bordered>
              <Text style={{ fontWeight: 'bold' }}>En iyi 10 kişi 💪 </Text>
            </Separator>

            {this.state.members.map((item) => (
              <ListItem thumbnail>
                <Left>
                  <UserAvatar color="#FFFFFF" size={60} bgColor="#1266F1" name={item.member.nameSurname.toUpperCase()} />
                </Left>
                <Body>
                  <Text>{item.member.nameSurname.toUpperCase() }</Text>
                  <ProgressBar progress={item.member.currentExperience / item.member.levelExperience} color="#1266F1" />
                  <Text note numberOfLines={1} style={{ margin: 2 }}>
                    Toplam:{item.member.statistic.totalQuestion} Doğru:{item.member.statistic.totalRightAnswers} Yanlış:{item.member.statistic.totalWrongAnswers}
                  </Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>
                      {item.member.level}
                      .seviye
                    </Text>
                  </Button>
                </Right>
              </ListItem>

            ))}

          </Content>

        </Container>

      );
    }
}
