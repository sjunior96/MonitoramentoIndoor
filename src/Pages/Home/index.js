import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

//Cores do IBTI:
// #F6A100  AMARELO
// #00919C  AZUL CLARO
// #0B7534  VERDE ESCURO
// #109F6C  VERDE CLARO

export default function Home() {
    return (
        <View style={{ flex: 1, heigh: '100%' }}>
            <View style={styles.difArea}>
                <Text style={styles.difText}>10</Text>
            </View>

            <View style={styles.devicesArea}>
                <View style={styles.device}>
                    <Text style={styles.deviceText}>Dispositivo 1</Text>
                </View>

                <View style={styles.device}>
                    <Text style={styles.deviceText}>Dispositivo 2</Text>
                </View>
            </View>

            <View style={styles.btnArea}>
                <TouchableOpacity style={styles.btnBuzzer}>
                    <Text style={styles.textBuzzer}>Buzzer</Text>
                </TouchableOpacity>

                <View style={styles.frequencyChange}>
                    <TouchableOpacity style={styles.btnLessFrequency}>
                        <Icon name="minus"></Icon>
                    </TouchableOpacity>

                    <TextInput style={styles.frequencyInput}></TextInput>

                    <TouchableOpacity style={styles.btnMoreFrequency}>
                        <Icon name="plus"></Icon>
                    </TouchableOpacity>
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
        marginTop: 10,
        padding: 15,
        width: '95%',
        height: '10%',
        backgroundColor: '#00919C',
        borderRadius: 5
    },
    deviceText: {
        color: '#FFF'
    },
    btnArea: {
        flexDirection: "row",
        height: '10%',
        alignItems: "center",
        justifyContent: "flex-end"
    },
    btnBuzzer: {
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
        borderColor: '#999'
    },
    btnLessFrequency: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: '#999'
    }

})