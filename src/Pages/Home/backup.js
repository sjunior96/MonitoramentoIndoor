import React, { useEffect, useState } from 'react';
//import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text, TextInput, View, StyleSheet, LayoutAnimation, Platform, UIManager, TouchableOpacity, Image } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

//Cores do IBTI:
// #F6A100  AMARELO
// #00919C  AZUL CLARO
// #0B7534  VERDE ESCURO
// #109F6C  VERDE CLARO

export default function Home() {
    //Inicialização das variáveis
    const [expanded, setExpanded] = useState(false); //Controla o estado dos detalhes (expanded, collapsed)
    const [frequencyCounter, setFrequencyCounter] = useState(0);
    const [devicesQuantity, setDevicesQuantity] = useState([
        { key: "device1", name: 'Dispositivo 1', expanded: false },
        { key: "device2", name: 'Dispositivo 2', expanded: false }
    ]);

    //Para funcionar no Android sem bugs, no iOS já funciona corretamente
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    //Função que realiza a troca do estado dos detalhes do dispositivo, bem como tipo de animação realizada na troca de estado
    function changeLayout() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        let expand = !expanded; //Pegamos o oposto do valor atual de expanded, para abrir se estiver fechada, e fechar se estiver aberta
        setExpanded(expand); //Passamos o novo valor para a expanded
    }

    //Função que aumenta a frequência
    function moreFrequency() {
        if ((frequencyCounter + 1) < 60) {
            let freq = frequencyCounter + 1;
            setFrequencyCounter(freq);
        }
    }

    //Função que diminui a frequência
    function lessFrequency() {
        if ((frequencyCounter - 1) > -1) {
            let freq = frequencyCounter - 1;
            setFrequencyCounter(freq);
        }
    }

    return (
        <View style={{ flex: 1, heigh: '100%' }}>
            <View style={styles.difArea}>
                <Text style={styles.difText}>10</Text>
            </View>

            <View style={styles.devicesArea}>
                <TouchableOpacity style={styles.device} onPress={() => { changeLayout() }}>
                    <Icon name="chevron-down" color={'#FFF'} size={20}></Icon>
                    <Text style={styles.deviceText}>Dispositivo 1</Text>
                </TouchableOpacity>
                <View style={{ height: expanded ? null : 0, overflow: 'hidden' }}>
                    <View style={styles.deviceDetailsArea}>
                        <Text>GRÁFICO</Text>
                        <Image style={{ width: 300, height: 200 }} source={require('../../assets/images/lineGraphic.png')}></Image>
                        <Text>Última Temperatura Registarda: 20°</Text>
                        <Text>AQUI VÃO APARECER OS DADOS DO DISPOSITIVO 1</Text>
                        <Text>AQUI VÃO APARECER OS DADOS DO DISPOSITIVO 1</Text>
                    </View>

                    <View style={styles.btnArea}>
                        <TouchableOpacity style={styles.btnBuzzer}>
                            <Icon name="bullhorn" color={'#FFF'} size={25}></Icon>
                        </TouchableOpacity>

                        <View style={styles.frequencyChange}>
                            <TouchableOpacity style={styles.btnLessFrequency} onPress={() => { lessFrequency() }}>
                                <Icon name="minus" color={'#FFF'} size={15}></Icon>
                            </TouchableOpacity>

                            <Text style={styles.frequencyInput}>{frequencyCounter}</Text>

                            <TouchableOpacity style={styles.btnMoreFrequency} onPress={() => { moreFrequency() }}>
                                <Icon name="plus" color={'#FFF'} size={15}></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.device}>
                    <Icon name="chevron-down" color={'#FFF'} size={20}></Icon>
                    <Text style={styles.deviceText}>Dispositivo 2</Text>
                </TouchableOpacity>
                <View>
                    <Text>{devicesQuantity.length}</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    difArea: {
        height: '20%',
        backgroundColor: '#109F6C',
        width: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    difText: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: "bold"
    },
    devicesArea: {
        height: '70%',
        alignItems: "center",
        justifyContent: "flex-start"
    },
    device: {
        flexDirection: "row",
        marginTop: 10,
        padding: 15,
        width: '95%',
        height: '10%',
        backgroundColor: '#00919C',
        borderRadius: 5
    },
    deviceText: {
        color: '#FFF',
        marginLeft: 5
    },
    deviceDetails: {

    },
    deviceDetailsArea: {
        height: '50%'
    },
    btnArea: {
        flexDirection: "row",
        height: '10%',
        alignItems: "center",
        justifyContent: "flex-end"
    },
    btnBuzzer: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
        padding: 10,
        backgroundColor: '#0B7534',
        borderRadius: 5
    },
    textBuzzer: {
        color: '#FFF',
        fontSize: 15
    },
    frequencyChange: {
        flexDirection: "row",
        marginRight: 15
    },
    frequencyInput: {
        fontSize: 15,
        textAlign: "center",
        textAlignVertical: "center",
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#999'
    },
    btnMoreFrequency: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderColor: '#0B7534',
        backgroundColor: '#0B7534'
    },
    btnLessFrequency: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: '#D9534F',
        backgroundColor: '#D9534F'
    }

})