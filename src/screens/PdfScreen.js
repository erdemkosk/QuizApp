/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View, StyleSheet, Image
} from 'react-native';
import { WebView } from 'react-native-webview';
import {
    Container, Header, Content, ListItem, Left, Body, Right, Text, Button, Switch, Icon, Separator
  } from 'native-base';

import { getTopten } from '../controllers/member';

export default class PdfScreen extends Component {
  constructor(props) {
    super(props);
  }

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
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <View style={styles.container}>
          <WebView
            bounces={false}
            scrollEnabled
            source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }}
          />

        </View>
      </Container>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
