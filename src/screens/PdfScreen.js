/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View, StyleSheet, Image
} from 'react-native';
import { WebView } from 'react-native-webview';
import {
  Container, Header, Spinner, Left, Body, Right, Content, Button, Switch, Icon, Separator
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
          <Right />
        </Header>
        <View style={styles.container}>
          <WebView
            bounces={false}
            startInLoadingState
            startInLoadingState={true}
    renderLoading={() => <Spinner color="blue" />}
            scrollEnabled
            source={{ uri: 'http://docs.google.com/gview?embedded=true&url=http://www.africau.edu/images/default/sample.pdf' }}
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
