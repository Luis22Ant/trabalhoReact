import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import AuthService from '../../Services/AuthService';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';



const seen = [];


export default function Sign() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const URL = 'https://457c-186-235-109-67.ngrok-free.app/api/Login/login';


    const handleRegister = () => {
        navigation.navigate('Register')
    }
    const handleLogin = async (username, password) => {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "usuario": username,
                    "senha": password,
                },),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            } else {
                const data = await response.json();
                navigation.navigate('Home')
                return data;
            }

        } catch (error) {
            console.error(error);
            throw new Error('Login failed');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#A62A5C', '#6A2597']}
                style={styles.linearGradient}>
                <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
                    <Text style={styles.message}>Bem vindo</Text>
                </Animatable.View>
            </LinearGradient>


            <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
                <Text style={styles.title}>Usuário</Text>
                <TextInput value={username} onChangeText={(text) => setUsername(text)} placeholder="Digite seu usuário..." style={styles.TextInput} />
                <Text style={styles.title}>Senha</Text>
                <TextInput value={password} onChangeText={(text) => setPassword(text)} placeholder="Sua senha" style={styles.TextInput} />
                <LinearGradient
                    colors={['#A62A5C', '#6A2597']}
                    style={styles.buttonGradient}
                >
                    <TouchableOpacity onPress={() => handleLogin(username, password)} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity style={styles.buttonRegister} onPress={() => handleRegister()}>
                    <Text style={styles.buttonRegisterText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6A2597',
    },
    containerHeader: {
        marginTop: "14%",
        marginBottom: "14%",
        paddingStart: "4%",
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    containerForm: {
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    TextInput: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    buttonGradient: {

        borderRadius: 18,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1
    },
    button: {
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center',
    },
    buttonRegisterText: {
        color: 'gray',
    },
});
