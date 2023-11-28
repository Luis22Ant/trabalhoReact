import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Products(props) {


    return (

        <TouchableOpacity style={styles.container} onPress={props.onClick}>
            <Image
                source={props.img}
                style={styles.produtosIMG}
            />
            <Text style={styles.produtoText} >props.children</Text>
            <View opacity={0.4}>
                <Text style={styles.produtoText}>{props.cost}</Text>
            </View>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    produtosIMG: {
        width: 175,
        height: 175
    },
    produtoText: {
        fontSize: 16
    }
});