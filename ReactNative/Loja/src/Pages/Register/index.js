import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import AuthService from "../../Services/AuthService";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import { Alert } from 'react-native';

export default function Register() {
    const navigation = useNavigation()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNasc] = useState('');

    const handleRegister = async (username, password, cpf, dataNascimento) => {
        try {
            const response = await AuthService.RegistrarUsuario(username, password, cpf, dataNascimento);
            if (response) {
                Alert.alert(
                    'Cadastro bem-sucedido',
                    'Usuário cadastrado com sucesso!',
                    [
                        { text: 'OK', onPress: () => navigation.navigate('Sign') },
                    ],
                    { cancelable: false }
                );
                navigation.navigate('Sign')
            } else {
                Alert.alert(
                    'Erro no cadastro',
                    'Usuário não cadastrado!',
                    [
                        { text: 'OK', onPress: () => navigation.navigate('Sign') },
                    ],
                    { cancelable: false }
                );
            }


        } catch (error) {

        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#A62A5C', '#6A2597']}
                style={styles.linearGradient}>
                <Animatable.View animation={"fadeIn"} delay={200} style={styles.containerHeader}>
                    <FontAwesomeIcon style={{ marginTop: 100 }} icon={faUser} size={150} color="white" />
                </Animatable.View>
            </LinearGradient>
            <Animatable.View animation={"fadeInUp"} style={styles.containerBody}>
                <View style={styles.teste}>
                    <Text style={styles.title}>Cadastrar-se</Text>
                </View>
                <View style={{ bottom: 70 }}>
                    <TextInput value={username} onChangeText={(text) => setUsername(text)} placeholderTextColor={'black'} placeholder="Nome de usuário..." style={styles.TextInput}></TextInput>
                    <TextInput value={password} onChangeText={(text) => setPassword(text)} placeholderTextColor={'black'} placeholder="Senha" style={styles.TextInput}></TextInput>
                    <TextInput value={cpf} onChangeText={(text) => setCpf(text)} placeholderTextColor={'black'} placeholder="Cpf" style={styles.TextInput}></TextInput>
                    <TextInput value={dataNascimento} onChangeText={(text) => setDataNasc(text)} placeholderTextColor={'black'} placeholder="Data de nascimento" style={styles.TextInput}></TextInput>
                    <View style={styles.containerFooter}>
                        <LinearGradient
                            colors={['#A62A5C', '#6A2597']}
                            style={styles.buttonGradient}
                        >
                            <TouchableOpacity onPress={() => handleRegister(username, password, cpf, dataNascimento)} style={styles.button}>
                                <Text style={styles.buttonText}>Cadastrar</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                </View>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        flex: 1 / 2,
    },
    containerHeader: {
        alignItems: 'center',
        paddingTop: 70,
    },
    teste: {
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        color: '#6A2597',
        fontWeight: 'bold',
        marginBottom: "15%",
        marginTop: "15%",
        bottom: 65
    },
    TextInput: {
        borderWidth: 1,
        height: 40,
        width: 250,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: 'white',
        borderRadius: 18,
        paddingLeft: '3%',
    },
    buttonGradient: {

        borderRadius: 18,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerBody: {
        flex: 2 / 3,
        backgroundColor: 'white',
        paddingLeft: '10%',
        paddingRight: '10%',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '10%',
        marginTop: '85%',
        position: 'absolute',
        width: '80%',
        height: '55%',
        justifyContent: 'center',
        borderRadius: 25,
    },
    button: {
        backgroundColor: 'white',
        backgroundColor: 'transparent',
        borderRadius: 4,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        borderWidth: 1,
        width: 200,
    },
    containerFooter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
});