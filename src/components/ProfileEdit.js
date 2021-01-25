import React, { Component } from 'react';
import {
  TextInput,
} from 'react-native';
import {
  Content, Card, CardItem, Text, Icon, Right, Button
} from 'native-base';
import Toast from './Toast';

import { getItem } from '../services/deviceStorage';

import { updateMember } from '../controllers/member';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: this.props.Member,
      userName: this.props.Member.nameSurname,
      password: '',
      error: '',
    };
  }

  updateUser = async () => {
    if (this.state.userName && this.state.password) {
      const value = await getItem({ key: 'token' });
      const response = JSON.parse(value);

      const result = await updateMember({
        id: this.state.member._id, nameSurname: this.state.userName, email: this.state.member.email, password: this.state.password, token: response.token
      });

      if (result.error) {
        this.setState({
          error: result.error,
        });
        return;
      }

      this.props.navigateToDashboard();
    }
    else{
      this.setState({
        error: 'İsminiz yada şifreniz boş olamaz 😅',
      });
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
            <Icon style={{ color: '#ff793f' }} active name="md-contacts" />
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
            <Icon style={{ color: '#cd6133' }} active name="md-keypad" />
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
                style={{ backgroundColor: '#1266F1', width: 120 }}
              >
                <Icon name="done-all" />
                <Text>Kaydet!</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
        <Toast
          message={this.state.error}
          onDismiss={() => this.setState({
            error: ''
          })}
        />
      </Content>

    );
  }
}
