import { AsyncStorage } from 'react-native';

const saveItem = async ({ key, value }) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`AsyncStorage Error: ${error.message}`);
  }
};

const getItem = async ({ key }) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(`AsyncStorage Error: ${error.message}`);
  }
};

const removeItem = async ({ key }) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log(`AsyncStorage Error: ${error.message}`);
  }
};

module.exports = {
  getItem,
  saveItem,
  removeItem,
};
