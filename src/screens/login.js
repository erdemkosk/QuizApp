import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Body, Container, Card, CardItem, Content, Form, Icon, Item, Label, Input, Button, Text } from 'native-base';

class LoginScreen extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <Container style={styles.imageContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo.png')}
                    />
                </Container>
                <Container style={styles.loginContainer}>
                    <Content>
                        <Form>
                            <Item floatingLabel>
                                <Icon style={styles.mainColor} active name='mail' />
                                <Label style={styles.mainColor}>E-mail</Label>
                                <Input style={styles.mainColor} />
                            </Item>
                            <Item floatingLabel last >
                                <Icon style={styles.mainColor} active name='key' />
                                <Label style={styles.mainColor}>Şifre</Label>
                                <Input style={styles.mainColor} />
                            </Item>
                            <Button block iconLeft>
                                <Icon name='arrow-forward' />
                                <Text>Hadi, Giriş Yapalım! 😉</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        flex: 1,
        backgroundColor: "#343A40",
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#343A40",
    },
    loginContainer: {
        flex: 2
    },
    logo: {
        flex: 1,
        width: 120,
        height: 100,
        resizeMode: 'contain'
    },
    mainColor: {
        color: "#4285F4",
    },

});

export default LoginScreen;