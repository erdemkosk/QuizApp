import React, { Component } from 'react';
import {
  View, TextInput, StyleSheet, ScrollView, Image
} from 'react-native';
import {
  Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Body, Title, Button
} from 'native-base';

export default class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { likesIsReady: false, member: this.props.Member, };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Content style={{ flex: 1 }}>
        <Card transparent>
          <CardItem header bordered>
            <Text style={{ color: '#2D313A' }}>Kullanıcı Hakkında</Text>
          </CardItem>
          <CardItem>
            <Icon active name="finger-print" />
            <Text>Ad ve Soyad</Text>
            <Right>
              <Text note>{this.state.member.nameSurname}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon active name="md-hourglass" />
            <Text>Katılım Tarihi</Text>
            <Right>
              <Text note>{this.state.member.createdAt}</Text>
            </Right>
          </CardItem>
        </Card>
        <Card transparent>
          <CardItem header bordered>
            <Text style={{ color: '#2D313A' }}>Seviye</Text>
          </CardItem>
          <CardItem>
            <Icon active name="md-happy" />
            <Text>Seviye</Text>
            <Right>
              <Text note>{this.state.member.level}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon active name="ios-jet" />
            <Text>Deneyim Puanı</Text>
            <Right>
              <Text note>
                {this.state.member.currentExperience}
                /
                {this.state.member.levelExperience}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon active name="ios-hammer" />
            <Text>liderlik</Text>
            <Right>
              <Text note>
                {this.state.member.rank}
                . kişi
              </Text>
            </Right>
          </CardItem>
          <CardItem />

        </Card>
      </Content>

    );
  }
}
