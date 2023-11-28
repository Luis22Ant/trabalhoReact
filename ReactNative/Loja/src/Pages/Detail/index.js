import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TextInput, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Detail({ route, navigation }) {
    navigation.setOptions({
        headerTitle: 'Carrinho'
    });
    const { valorTotal } = route.params;
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [nameTitular, setTitularName] = useState();
    const [cvv, setCvv] = useState('');
    const handleCardNumberChange = (text) => {
        setCardNumber(text);
    };

    const handleExpiryDateChange = (text) => {
        setExpiryDate(text);
    };
    const handleTitular = (text) => {

    }

    const handleCvvChange = (text) => {
        setCvv(text);
    };

    const buttonComprar = () =>{
        Alert.alert(
            'Compra concluída com sucesso!',
            'Os dados chegarão no email!',
            [
                { text: 'OK', onPress: () => navigation.navigate('Home')},
            ],
            { cancelable: false }
        );
    }
    return (
        <View>
            <LinearGradient
                colors={['#A62A5C', '#6A2597']}
                style={styles.linearGradient}>
                <View style={styles.containerHeader}>
                    <MaterialIcons
                        style={{ fontSize: 250 }}
                        name='shopping-cart'
                        size={24}
                        color={'black'}
                    />
                </View>
            </LinearGradient>
            <Text style={styles.textValor}>Valor total:{valorTotal.toFixed(2)}</Text>
            <Text style={{ fontSize: 25, marginBottom: 10 }}>Pague com seu cartão de crédito</Text>

            {/* Campo para o número do cartão */}
            <TextInput
                placeholder="Número do Cartão"
                keyboardType="numeric"
                placeholderTextColor={'black'}
                maxLength={16}
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                style={{ borderWidth: 1, width: 200, padding: 5, marginLeft: 10, marginBottom: 10 }}
            />

            {/* Campo para a data de validade */}
            <TextInput
                placeholder="Data de Validade (MM/YY)"
                placeholderTextColor={'black'}
                keyboardType="numeric"
                maxLength={5}
                style={{ borderWidth: 1, width: 200, padding: 5, marginLeft: 10, marginBottom: 10 }}
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
            />
            <TextInput
                placeholder="Nome do titular"
                placeholderTextColor={'black'}
                keyboardType="text"
                style={{ borderWidth: 1, width: 200, padding: 5, marginLeft: 10, marginBottom: 10 }}
                value={nameTitular}
                onChangeText={handleTitular}
            />

            {/* Campo para o CVV */}
            <TextInput
                placeholder="CVV"
                keyboardType="text"
                style={{ borderWidth: 1, width: 200, padding: 5, marginLeft: 10, marginBottom: 10 }}
                placeholderTextColor={'black'}
                value={cvv}
                onChangeText={handleCvvChange}
            />

            {/* Botão para enviar os dados */}
            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'black',padding:10,borderRadius:25}} onPress={() => buttonComprar()}>
                    <Text style={{color:'white'}}>Comprar</Text>
                </TouchableOpacity>
            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: '2%'
    },
    image: {
        width: '100%',
        height: height / 3,
    },
    title: {
        fontFamily: 'Anton_400Regular'
    },
    imageHeader: {
        width: '100%',
        height: 300
    },
    linearGradient: {
        marginBottom: 15
    },
    textValor: {
        fontSize: 28,
        fontFamily: 'Anton_400Regular',
    }
});
