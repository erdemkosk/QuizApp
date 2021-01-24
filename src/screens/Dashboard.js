/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React, {
  Component, createRef
} from 'react';
import {
  StyleSheet, View, Animated, Platform
} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import { Container } from 'native-base';
import Background from '../components/Background';
import Button from '../components/Button';
import { removeItem, getItem } from '../services/deviceStorage';
import { getMember, setNotificationId } from '../controllers/member';
import {
  QUIZ_TYPES,
} from '../core/constraint';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      id: '',
      notificationId: '',
      member: {},
      startValue: new Animated.Value(0.7),
      endValue: 1.1,
      expoPushToken: '',
      notification: false,
    };
  }

  componentDidMount = () => {
    const notificationListener = createRef();
    const responseListener = createRef();
    this.loadToken();

    this.startSpring();

    const { navigation } = this.props;
    navigation.addListener('willFocus', async () => {
      await this.loadMember();
      this.startSpring();
      this.loadToken();
    });

    this.registerForPushNotificationsAsync().then((notificationId) => this.setState({
      notificationId,
    }));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      this.setState({
        notification,
      });
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }

  registerForPushNotificationsAsync = async () => {
    let notificationId;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      notificationId = (await Notifications.getExpoPushTokenAsync()).data;

      await setNotificationId({
        id: this.state.id, token: this.state.token, notificationId
      });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [250, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return notificationId;
  }

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

   logoutUser = async () => {
     await removeItem({
       key: 'token',
     });

     this.props.navigation.navigate('LoginScreen');
   };

   moveQuizSecreen = async () => {
     this.props.navigation.navigate('QuizScreen', { type: QUIZ_TYPES.QUIZ_GAME });
   };

   moveBasicQuizSecreen = async () => {
     this.props.navigation.navigate('QuizBasicScreen', { type: QUIZ_TYPES.QUIZ_BASIC });
   };

   moveBlankInFillsScreen = async () => {
     this.props.navigation.navigate('QuizScreen', { type: QUIZ_TYPES.FILL_IN_BLANKS });
   };

   moveSettingsScreen = async () => {
     this.props.navigation.navigate('SettingsScreen');
   };

   moveProfileScreen= async () => {
     this.props.navigation.navigate('ProfileScreen');
   };

   moveToptenScreen= async () => {
     this.props.navigation.navigate('ToptenScreen');
   };

   movePdfScreen = async () => {
     this.props.navigation.navigate('PdfScreen');
   };

   startSpring() {
     this.setState({
       startValue: new Animated.Value(0.7),
     });

     Animated.spring(this.state.startValue, {
       toValue: this.state.endValue,
       friction: 1,
       useNativeDriver: true,
     }).start();
   }

   render() {
     return (
       <Container>
         <Background>
           <View style={styles.container}>
             <Animated.Image
               source={require('../../assets/logo.png')}
               style={{
                 width: 275,
                 transform: [
                   {
                     scale: this.state.startValue,
                   },
                 ],
               }}
               resizeMode="contain"
             />

             <View>
               <Button mode="outlined" onPress={() => this.moveQuizSecreen()}>
                 😱 Yarışma 😱
               </Button>
               <Button mode="outlined" onPress={() => this.moveBasicQuizSecreen()}>
                 🥸 Antreman 🥸
               </Button>
               <Button mode="outlined" onPress={() => this.moveBlankInFillsScreen()}>
                 😎 Boşluk Doldurma 😎
               </Button>
               <Button mode="outlined" onPress={() => this.moveToptenScreen()}>
                 👑 Liderlik Tablosu 👑
               </Button>
               <Button mode="outlined" onPress={() => this.moveSettingsScreen()}>
                 ⚙️ Ayarlar ⚙️
               </Button>
               <Button mode="outlined" onPress={() => this.moveProfileScreen()}>
                 👤 Profil 👤
               </Button>
               <Button mode="outlined" onPress={() => this.movePdfScreen()}>
                 🧾 Pdf Dersler 🧾
               </Button>
               <Button mode="outlined" onPress={() => this.logoutUser()}>
                 🧐 Çıkış Yap 🧐
               </Button>
             </View>

           </View>

         </Background>
       </Container>
     );
   }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    width: '100%',

    justifyContent: 'center'
  }
});
