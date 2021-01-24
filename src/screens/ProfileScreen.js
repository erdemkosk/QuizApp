/* eslint-disable default-case */
/* eslint-disable no-unreachable */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, TextInput, StyleSheet, ScrollView, Image
} from 'react-native';
import {
  Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Body, Title, Button
} from 'native-base';
import { ProgressBar, Chip } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import ProfileInfo from '../components/ProfileInfo';
import ProfileEdit from '../components/ProfileEdit';
import { getMember } from '../controllers/member';
import { getItem } from '../services/deviceStorage';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      member: '',
      token: '',
      id: '',
    };
  }

  componentDidMount() {
    (async () => {
      await this.loadToken();
      await this.loadMember();
    })();
  }

  navigateToDashboard = async () => {
    this.props.navigation.navigate('Dashboard');
  };

  loadToken = async () => {
    const value = await getItem({ key: 'token' });
    const response = JSON.parse(value);
    this.setState({
      token: response.token,
      id: response.id,
    });
    await this.loadMember();
  }

  loadMember = async () => {
    const member = await getMember({ id: this.state.id, token: this.state.token });

    this.setState({
      member,
    });
  }

  renderUserInfoOrEditData() {
    switch (this.state.isEdit) {
      case true:

        return (<ProfileEdit navigateToDashboard={this.navigateToDashboard} Member={this.state.member} />);
        break;
      case false:

        return (<ProfileInfo Member={this.state.member} />);
        break;
    }
  }

  renderUserInfoOrEditButton() {
    switch (this.state.isEdit) {
      case true:
        return (
          <Chip
            icon="settings"
            onPress={() => this.editOrInfoToggleButtonPressed()}
          >
            Bilgiler
          </Chip>
        );
        break;
      case false:
        return (
          <Chip
            icon="settings"
            onPress={() => this.editOrInfoToggleButtonPressed()}
          >
            Kullanıcı Güncelle
          </Chip>
        );
        break;
    }
  }

  editOrInfoToggleButtonPressed = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  render() {
    if (!this.state.member) {
      return <Text>Loading...</Text>;
    }
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.navigate('Dashboard')} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>

          <View style={styles.header}>
            <View style={styles.headerContent}>
              <UserAvatar color="#FFFFFF" size={90} bgColor="#1266F1" name={this.state.member.nameSurname} />

              <Text style={styles.name}>
                {this.state.member.nameSurname}
              </Text>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                {this.renderUserInfoOrEditButton()}
              </View>

            </View>
          </View>

          <View style={styles.container}>

            {this.renderUserInfoOrEditData()}
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2D313A',
  },
  headerContent: {
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 10,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },
  bodyContent: {
    paddingTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox: {
    backgroundColor: '#DCDCDC',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: -2
    },
    elevation: 4,
  },
  icon: {
    width: 60,
    height: 60,
  },
  info: {
    fontSize: 22,
    color: '#696969',
  }
});
