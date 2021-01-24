/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Container, Header, Content, ListItem, Left, Body, Right, Text, Button, Switch, Icon, Separator
} from 'native-base';
import {
  Image
} from 'react-native';

export default class SettingsScreen extends Component {
    returnToDashboard = () => {
      this.props.navigation.navigate('Dashboard');
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
             
            </Right>
          </Header>
          <Content>
            <Separator bordered>
              <Text style={{ fontWeight: 'bold' }}>Hakkında 💪 </Text>
            </Separator>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: '#FF9501' }}>
                  <Icon active name="ios-code" />
                </Button>
              </Left>
              <Body>
                <Text>Version</Text>
              </Body>
              <Right>
                <Text>1.0.0</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: '#FF9501' }}>
                  <Icon active name="ios-ribbon" />
                </Button>
              </Left>
              <Body>
                <Text>Geliştirici</Text>
              </Body>
              <Right>
                <Text>Mustafa Erdem Köşk</Text>
              </Right>
            </ListItem>

            <Separator bordered>
              <Text style={{ fontWeight: 'bold' }}> Geliştirici , İçerik ve Test 👋</Text>
            </Separator>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: '#007AFF' }}>
                  <Icon active name="md-contact" />
                </Button>
              </Left>
              <Body>
                <Text>Övgüm Kahraman</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: '#007AFF' }}>
                  <Icon active name="md-contact" />
                </Button>
              </Left>
              <Body>
                <Text>
                  Osman Mert Acar
                </Text>
              </Body>
            </ListItem>

            <Separator bordered>
              <Text style={{ fontWeight: 'bold' }}> Tasarım 🎨</Text>
            </Separator>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: '#007AFF' }}>
                  <Icon active name="ios-person-add" />
                </Button>
              </Left>
              <Body>
                <Text>Onur Dindar</Text>
              </Body>
            </ListItem>

            <Separator bordered>
              <Text style={{ fontWeight: 'bold' }}> Emeği Geçenler 🤩</Text>
            </Separator>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: '#007AFF' }}>
                  <Icon active name="md-rose" />
                </Button>
              </Left>
              <Body>
                <Text>
                  Zişan Alca
                </Text>
              </Body>
            </ListItem>
          </Content>

        </Container>

      );
    }
}
