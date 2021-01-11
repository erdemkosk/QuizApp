import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import {
  AuthStack,
  MainStack,
} from './navigation';

import {
  AuthLoadingScreen,
} from './screens';

const Router = createSwitchNavigator(
  {
    AuthLoadingScreen,
    App: AuthStack,
    Auth: MainStack,
  },
  {
    initialRouteName: 'AuthLoadingScreen',
  }
);

export default createAppContainer(Router);
