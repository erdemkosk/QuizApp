import React, { Component } from 'react';
import {
  View, TextInput, StyleSheet, ScrollView, Image
} from 'react-native';
import {
  Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Body, Title, Button
} from 'native-base';

import moment from 'moment';
import { getStatistic } from '../controllers/statistic';
import { removeItem, getItem } from '../services/deviceStorage';

export default class ProfileInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likesIsReady: false, member: this.props.Member, token: '', members: 0, words: 0,
    };
  }

  componentDidMount() {
    (async () => {
      await this.loadToken();
      await this.getStatisticFromApi();
    })();
  }

  getStatisticFromApi = async () => {
    const response = await getStatistic({ token: this.state.token });
    this.setState({
      members: response.members,
      words: response.words,
    });
  }

  loadToken = async () => {
    const value = await getItem({ key: 'token' });
    const response = JSON.parse(value);
    this.setState({
      token: response.token,
    });
  }

  render() {
    return (
      <Content style={{ flex: 1 }}>
        <Card transparent>
          <CardItem header bordered>
            <Text style={{ color: '#2D313A' }}>Uygulama Hakkında</Text>
          </CardItem>
          <CardItem>
            <Icon style={{ color: '#e15f41' }} active name="ios-body" />
            <Text>Toplam Kullanıcı Sayısı</Text>
            <Right>
              <Text>{this.state.members}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon style={{ color: '#6ab04c' }} active name="md-flame" />
            <Text>Toplam Kelime Sayısı</Text>
            <Right>
              <Text>{this.state.words}</Text>
            </Right>
          </CardItem>
          <CardItem header bordered>
            <Text style={{ color: '#2D313A' }}>Kullanıcı Hakkında</Text>
          </CardItem>
          <CardItem>
            <Icon style={{ color: '#574b90' }} active name="finger-print" />
            <Text>Ad ve Soyad</Text>
            <Right>
              <Text>{this.state.member.nameSurname}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon style={{ color: '#303952' }} active name="md-hourglass" />
            <Text>Katılım Tarihi</Text>
            <Right>
              <Text>{moment(this.state.member.createdAt).format('DD/MM/YYYY')}</Text>
            </Right>
          </CardItem>
        </Card>
        <Card transparent>
          <CardItem header bordered>
            <Text style={{ color: '#2D313A' }}>Seviye</Text>
          </CardItem>
          <CardItem>
            <Icon style={{ color: '#0984e3' }} active name="md-happy" />
            <Text>Seviye</Text>
            <Right>
              <Text>{this.state.member.level}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon style={{ color: '#00b894' }} active name="md-checkmark-circle-outline" />
            <Text>Deneyim Puanı</Text>
            <Right>
              <Text>
                {this.state.member.currentExperience}
                /
                {this.state.member.levelExperience}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon style={{ color: '#6c5ce7' }} active name="md-flag" />
            <Text>Liderlik Sıralaması</Text>
            <Right>
              <Text>
                {this.state.member.rank}
                . kişi
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon style={{ color: '#fdcb6e' }} active name="ios-paper" />
            <Text>Yanıtlanan Soru</Text>
            <Right>
              <Text>{this.state.member.statistic.totalQuestion}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon style={{ color: '#d63031' }} active name="ios-heart" />
            <Text>Doğru Cevaplanan</Text>
            <Right>
              <Text>{this.state.member.statistic.totalRightAnswers}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon style={{ color: '#ff7675' }} active name="ios-heart-dislike" />
            <Text>Yanlış Cevaplanan</Text>
            <Right>
              <Text>{this.state.member.statistic.totalWrongAnswers}</Text>
            </Right>
          </CardItem>
          <CardItem />

        </Card>
      </Content>

    );
  }
}
