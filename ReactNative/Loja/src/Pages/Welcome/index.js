import React from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Image, Text } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';


export default function Welcome() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#A62A5C', '#6A2597']}
                style={styles.linearGradient}>
                <Animatable.Image
                    animation={"flipInY"}
                    source={require("../../assets/loja.png")}
                    style={{ width: "100%" }}
                    resizeMode="contain"
                />
            </LinearGradient>



            <Animatable.View delay={600} animation={"fadeInUp"} style={styles.containerForm}>
                <Text style={styles.title}>Economize, venha comprar com a gente!</Text>
                <Text style={styles.text}>Faça login para começar!</Text>
                <LinearGradient
                    colors={['#A62A5C', '#6A2597']}
                    style={styles.buttonGradient}
                >
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign')}>
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animatable.View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerLogo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    containerForm: {
        flex: 1,
        paddingStart: '5%',
        paddingEnd: '5%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 28,
        marginBottom: 12,
    },
    text: {
        color: 'gray',
    },
    buttonGradient: {
        borderRadius: 18,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
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
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
});
