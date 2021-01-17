import React, { Component } from 'react';
import {
  View, TextInput, StyleSheet, ScrollView, Image
} from 'react-native';
import {
  Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Body, Title, Button
} from 'native-base';

import {  getItem } from '../services/deviceStorage';

import { updateMember } from '../controllers/member';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: this.props.Member,
      userName: this.props.Member.nameSurname,
      password: '',
    };
  }

  updateUser = async () => {
  
    if (this.state.userName && this.state.password) {
      const value = await getItem({ key: 'token' });
      const response = JSON.parse(value);

      await updateMember({
       id:this.state.member._id, nameSurname: this.state.userName, email: this.state.member.email, password: this.state.password, token: response.token
      });

      this.props.navigateToDashboard();
    }
  };

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
              <TextInput
                style={{ width: 160 }}
                maxLength={20}
                underlineColorAndroid="transparent"
                placeholder="Kullanıcı İsmi"
                defaultValue={this.state.member.nameSurname}
                placeholderTextColor="#b2bec3"
                autoCapitalize="none"
                onChangeText={(userName) => {
                  this.setState({
                    userName
                  });
                }}
              />
            </Right>
          </CardItem>
          <CardItem>
            <Icon active name="finger-print" />
            <Text>Şifre</Text>
            <Right>
              <TextInput
                style={{ width: 160 }}
                secureTextEntry
                maxLength={20}
                underlineColorAndroid="transparent"
                placeholder="Yeni Şifre"
                placeholderTextColor="#b2bec3"
                autoCapitalize="none"
                onChangeText={(password) => {
                  this.setState({
                    password
                  });
                }}
              />
            </Right>
          </CardItem>
        </Card>
        <Card transparent>
          <CardItem header bordered>
            <Text style={{ color: '#2D313A' }}>Verileri Kaydet</Text>
            <Right>
              <Button
                iconLeft
                onPress={() => {
                  this.updateUser();
                }}
                style={{ backgroundColor: '#BA1E5D', width: 120 }}
              >
                <Icon name="done-all" />
                <Text>Kaydet!</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>

    );
  }
}
