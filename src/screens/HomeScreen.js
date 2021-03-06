import React, { memo } from 'react';
import {
  Image
} from 'react-native';
import Button from '../components/Button';
import {
  Container, Body, Title, Left, Badge, Header, Content, Card, CardItem, Text, Icon, Right, Thumbnail
} from 'native-base';
import Background from '../components/Background';

import Paragraph from '../components/Paragraph';

const HomeScreen = ({ navigation }) => (

  <Container>
    <Background>
      <Image source={require('../../assets/logo.png')} style={{ width: 275 }} resizeMode="contain" />

      <Paragraph>
      İngilizce kelime öğrenmenin en kolay yolu 🤙. Boş zamanlarında senin için oluşturulan ingilizce kelime testlerini cevapla 🙏 Kendini geliştir!
      </Paragraph>

      <Button uppercase = {false} mode="outlined" onPress={() => navigation.navigate('LoginScreen')}>
        <Text>GİRİŞ YAP</Text>
      </Button>
      <Button uppercase = {false} mode="outlined" onPress={() => navigation.navigate('RegisterScreen')}>
        <Text>ÜYE OL</Text>
      </Button>
    </Background>
  </Container>
);

export default memo(HomeScreen);
