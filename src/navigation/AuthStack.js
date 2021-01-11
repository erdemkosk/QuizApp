import {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
} from '../screens';

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

export default createStackNavigator({
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
}, {
    headerMode: 'none'
});