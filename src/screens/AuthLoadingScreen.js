import React, { memo, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Background from '../components/Background';
import { theme } from '../core/theme';
import { getItem } from '../services/deviceStorage';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Create an scoped async function in the hook
    async function loadUserMail() {
      const user = await getItem({ key: 'user' });
      if (user) {
        // User is logged in
        navigation.navigate('Dashboard');
      } else {
        // User is not logged in
        navigation.navigate('HomeScreen');
      }
    }
    // Execute the created function directly
    loadUserMail();
  }, []);

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
};

export default memo(AuthLoadingScreen);
