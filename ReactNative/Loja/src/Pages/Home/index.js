import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';


export default function Home() {

    const navigation = useNavigation();
    const [produtos, setProdutos] = useState([]);
    const [todosProdutos, setTodosProdutos] = useState([]);
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [mostrarTexto, setMostrarTexto] = useState(false);
    const [cont, setCont] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);

    const fecharModal = () => {
        setFilterModalVisible(false)
        setSelectedBrand(null)
    }
    const openFilterModal = () => {

        setFilterModalVisible(true);
    };
    const aplicarFiltro = () => {
        if (selectedBrand !== "") {
            const produtosFiltrados = todosProdutos.filter(produto =>
                produto.marca.toLowerCase().includes(selectedBrand.toLowerCase())
            );
            setProdutos(produtosFiltrados);
        } else {

            setProdutos([...todosProdutos]);
        }
        setSelectedBrand(null);
        setFilterModalVisible(false);
    };


    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('https://4195-186-235-106-92.ngrok-free.app/api/Produtos');
                setProdutos(response.data);
                setTodosProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    useEffect(() => {
        console.log(`Valor total: ${valorTotal}`);
    }, [valorTotal]);
    const adicionarAoCarrinho = (produto) => {
        console.log(`Produto ${produto.nome} adicionado ao carrinho`);
        setMostrarTexto(true);
        setCont(cont + 1);
        setValorTotal(valorTotal + produto.valor)
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#A62A5C', '#6A2597']}
                style={styles.linearGradient}>
                <View style={styles.containerHeader}>
                    <Image
                        source={require('../../assets/black.webp')}
                        style={styles.imageHeader}
                    />
                </View>
            </LinearGradient>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Produtos</Text>
                <Text style={styles.text}>-</Text>
                <Text style={[styles.text, { color: '#CECECF' }]}>Ofertas</Text>
                <View style={{ position: 'absolute', right: 0, alignSelf: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={openFilterModal}>
                        <MaterialIcons
                            name='filter-list'
                            size={24}
                            color={'black'}
                            style={{ marginRight: 15 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Detail',{valorTotal}) }}>
                        <MaterialIcons
                            name='shopping-cart'
                            size={24}
                            color={'black'}
                        />

                        <Text style={{ position: 'absolute', bottom: 15, right: 25, backgroundColor: 'red', padding: 3, overflow: 'hidden', borderRadius: 7, color: 'white', display: mostrarTexto ? 'flex' : 'none', }}>{cont}</Text>

                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.line} />
            <ScrollView>
                <Text style={[styles.text, { marginTop: 10 }]}>Mais comprados</Text>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Nome</Text>
                    <Text style={styles.tableHeaderText}>Preço</Text>
                </View>
                {produtos.map((produto) => (
                    <TouchableOpacity
                        key={produto.id}
                        style={styles.tableRow}
                        onPress={() => navigation.navigate('DetalhesProduto', { produto })}
                    >
                        <Text style={styles.tableCell}>{produto.nome}</Text>
                        <Text style={styles.tableCell}>{produto.valor}</Text>
                        <TouchableOpacity
                            style={[styles.addCartIcon, { paddingRight: 10 }]}
                            onPress={() => adicionarAoCarrinho(produto)}
                        >
                            <MaterialIcons name="add-shopping-cart" size={24} color="black" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Modal
                visible={isFilterModalVisible}
                transparent={true}

            >
                <Animatable.View animation={"fadeIn"} style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalHeaderText}>Selecione a marca</Text>
                            </View>
                            <View style={styles.modalInput}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Digite a marca"
                                    placeholderTextColor={'black'}
                                    value={selectedBrand}
                                    onChangeText={(text) => setSelectedBrand(text)}
                                />
                            </View>
                            <View style={styles.modalButtons}>
                                <Button title="Aplicar Filtro" onPress={aplicarFiltro} />
                                <Button title="Fechar" onPress={() => fecharModal()} />
                            </View>
                        </View>
                    </View>
                </Animatable.View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        marginBottom: 15
    },
    containerHeader: {},
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
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        padding: 10,
        justifyContent: 'space-between',
        marginRight: 35
    },
    tableHeaderText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D8d8d8',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    addCartIcon: {
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        height: 200,
        width: '80%',
        borderRadius: 10,
        padding: 10,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 10,
    },
    modalHeaderText: {
        fontSize: 20,
    },
    modalInput: {
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        width: 250
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

});
