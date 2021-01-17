/* eslint-disable no-underscore-dangle */
import React, { memo, useState, useEffect } from 'react';
import {
  TouchableOpacity, StyleSheet, Text, View, Image
} from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { postMemberLogin } from '../controllers/member';
import { saveItem, getItem } from '../services/deviceStorage';
import Toast from '../components/Toast';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUserMail() {
      const userPreviosLoginInfo = await getItem({ key: 'previous-user-email' });
      if (userPreviosLoginInfo) {
        setEmail({ value: userPreviosLoginInfo });
      }
    }
    // Execute the created function directly
    loadUserMail();
  }, []);

  const onLoginPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);

    const response = await postMemberLogin({ email: email.value, password: password.value });

    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }

    await Promise.all([
      await saveItem({
        key: 'previous-user-email',
        value: response.member.email,
      }), await saveItem({
        key: 'token',
        value: JSON.stringify({
          id: response.member._id,
          token: response.token,
        }),
      })]);

    setLoading(false);

    navigation.navigate('Dashboard');
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Image source={require('../../assets/logo.png')} style={{ width: 275 }} resizeMode="contain" />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Şifre"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        autoCapitalize="none"
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Şifreni mi unuttun?</Text>
        </TouchableOpacity>
      </View>

      <Button loading={loading} mode="contained" onPress={onLoginPressed}>
        Giriş Yap 🤟
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Hesabınız yok mu ?  </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Hesap oluştur!</Text>
        </TouchableOpacity>
      </View>

      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24
  },
  row: {
    flexDirection: 'row',
    marginTop: 4
  },
  label: {
    color: theme.colors.secondary
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary
  }
});

export default memo(LoginScreen);
