import {
    Dashboard,
    QuizScreen,
} from '../screens';
import { createStackNavigator } from 'react-navigation-stack';

import React from 'react';

export default createStackNavigator({
    Dashboard,
    QuizScreen,
},{
    headerMode: 'none'
});