import React from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import Products from "../../Component/Products";

export default function Home() {
    return (
        <View>
            <LinearGradient
                colors={['#A62A5C', '#6A2597']}
                style={styles.linearGradient}>
                <View style={styles.containerHeader}>
                    <Image
                        source={require('../../assets/black.webp')}
                        style={styles.imageHeader} />
                </View>
            </LinearGradient>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Produtos</Text>
                <Text style={styles.text}>-</Text>
                <Text style={[styles.text, { color: '#CECECF' }]}>Ofertas</Text>
                <TouchableOpacity style={{ position: 'absolute', right: 0, alignSelf: 'center' }}>
                    <MaterialIcons
                        name='filter-list'
                        size={24}
                        color={'black'} />
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <ScrollView>
                <Text style={[styles.text, { marginTop: 10 }]}>Mais comprados</Text>
                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                    <Products cost="4299,99" img={require('../../assets/ps5.jpg')}>
                        Playstation 5
                    </Products>
                    <Products cost="3799,99" img={require('../../assets/xbox.jpg')}>
                       Xbox Series X
                    </Products>
                </View>

                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                    <Products cost="1299,99" img={require('../../assets/note.png')}>
                        Tenis Adidas Eazzy
                    </Products>
                    <Products cost="329,99" img={require('../../assets/camisa.jpg')}>
                   Camisa Nike Listra
                    </Products>
                </View>


            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    linearGradient: {
        marginBottom: 15
    },
    container: {
    },
    containerHeader: {


    },
    title: {
        color: 'white',
        fontSize: 28
    },
    imageHeader: {
        width: '100%',
        height: 250
    },
    textContainer: {
        flexDirection: 'row',
        marginVertical: '5%',
        marginHorizontal: '5%'
    },
    text: {
        fontFamily: 'Anton_400Regular',
        fontSize: 26,
        marginHorizontal: '1%'
    },
    line: {
        borderBottomColor: '#D8d8d8',
        borderBottomWidth: 1
    }
});
