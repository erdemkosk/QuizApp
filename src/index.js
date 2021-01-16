import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  AuthLoadingScreen,
  Dashboard,
  QuizScreen,
  QuizBasicScreen,
  SettingsScreen
} from './screens';

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    AuthLoadingScreen,
    QuizScreen,
    QuizBasicScreen,
    SettingsScreen,
  },
  {
    initialRouteName: 'AuthLoadingScreen',
    headerMode: 'none'
  }
);

export default createAppContainer(Router);
