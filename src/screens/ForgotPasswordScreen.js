import React, { memo, useState } from 'react';
import {
  Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { emailValidator } from '../core/utils';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { forgetPassword } from '../controllers/member';
import Toast from '../components/Toast';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: '', type: '' });

  const onSendPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    setLoading(true);

    const response = await forgetPassword({ email: email.value });

    if (response.error) {
      setToast({ type: 'error', value: response.error });
    } else {
      setToast({
        type: 'success',
        value: 'Lütfen Email hesabınızı kontrol edin.'
      });
    }

    setLoading(false);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Image source={require('../../assets/logo.png')} style={{ width: 275 }} resizeMode="contain" />

      <Header>Şifremi Unuttum</Header>

      <TextInput
        label="E-mail"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button
        loading={loading}
        mode="contained"
        onPress={onSendPressed}
        style={styles.button}
      >
        Sıfırlama Mailimi Gönder
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      />

      <Toast
        type={toast.type}
        message={toast.value}
        onDismiss={() => setToast({ value: '', type: '' })}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12
  },
  button: {
    marginTop: 12
  },
  label: {
    color: theme.colors.secondary,
    width: '100%'
  }
});

export default memo(ForgotPasswordScreen);
