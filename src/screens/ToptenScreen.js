/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Container, Header, Content, ListItem, Left, Body, Right, Text, Button, Spinner, Icon, Separator
} from 'native-base';
import {
  Image
} from 'react-native';

import UserAvatar from 'react-native-user-avatar';
import { ProgressBar } from 'react-native-paper';
import { getTopten } from '../controllers/member';
import { STATE_COLORS } from '../core/constraint';

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
      if (this.state.members.length === 0) {
        return (
          <Container>
            <Header>
            <Left>
              <Button onPress={() => this.props.navigation.navigate('Dashboard')} transparent>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body />
            <Right />
          </Header>
          <Content >
          <Spinner  color='blue' />
          </Content>
          </Container>
        )
      }
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
            <Right />
          </Header>
          <Content>
            <Separator bordered>
              <Text style={{ fontWeight: 'bold' }}>En iyi 10 kişi 💪 </Text>
            </Separator>

            {this.state.members.map((item, index) => (
              <ListItem thumbnail>
                <Left>
                  <UserAvatar color="#FFFFFF" size={60} bgColor={STATE_COLORS[index + 1]} name={item.member.nameSurname.toUpperCase()} />
                </Left>
                <Body>
                  <Text style={{ margin: 4 }}>{item.member.nameSurname.toUpperCase() }</Text>
                  <ProgressBar progress={item.member.currentExperience / item.member.levelExperience}  />
                  <Text note numberOfLines={1} style={{ margin: 4 }}>
                    T:
                    {item.member.statistic.totalQuestion}
                    {' '}
                    D:
                    {item.member.statistic.totalRightAnswers}
                    {' '}
                    Y:
                    {item.member.statistic.totalWrongAnswers}
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
