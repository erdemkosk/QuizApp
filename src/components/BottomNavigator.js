import React, { memo } from 'react';
import { StyleSheet} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { BottomNavigation, Text } from 'react-native-paper';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const BottomNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'login', title: 'Login', icon: 'access-point' },
    { key: 'albums', title: 'Albums', icon: 'account-badge-horizontal-outline' },
    { key: 'recents', title: 'Recents', icon: 'account-child-circle' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    login: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  return (
    <BottomNavigation
      style={styles.container}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },

});

export default memo(BottomNavigator);
