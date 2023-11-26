import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Products(props) {

    function filterdesc(desc) {
        if (desc.length < 20) {
            return desc;
        }

        return `${desc.substring(0, 20)}...`;
    }

    return (

        <TouchableOpacity style={styles.container}>
            <Image
                source={props.img}
                style={styles.produtosIMG}
            />
            <Text style={styles.produtoText} >{filterdesc(props.children)}</Text>
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