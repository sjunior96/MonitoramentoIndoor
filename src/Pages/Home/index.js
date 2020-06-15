import React, { useEffect, useState } from 'react';
//import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text, TextInput, View, StyleSheet, Switch, ScrollView, Modal, LayoutAnimation, Platform, UIManager, TouchableOpacity, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const { width, height } = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from 'react-native-gesture-handler';

//Cores do IBTI:
// #F6A100  AMARELO
// #00919C  AZUL CLARO
// #0B7534  VERDE ESCURO
// #109F6C  VERDE CLARO

export default function Home() {
    //Inicialização das variáveis
    const [expanded, setExpanded] = useState(false); //Controla o estado dos detalhes (expanded, collapsed)
    const [frequencyCounter, setFrequencyCounter] = useState(0);
    const [devices, setDevices] = useState([
        { key: 1, name: 'Dispositivo 1', expanded: false, lightState: true },
        { key: 2, name: 'Dispositivo 2', expanded: false, lightState: false },
        { key: 3, name: 'Dispositivo 3', expanded: false, lightState: true },
        { key: 4, name: 'Dispositivo 4', expanded: false, lightState: false }
    ]);
    const [modalVisible, setModalVisible] = useState(false); //Define o modal como visivel ou não

    //const [isEnabled, setIsEnabled] = useState(false);
    //const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //Para funcionar no Android sem bugs, no iOS já funciona corretamente
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    //Função que realiza a troca do estado dos detalhes do dispositivo, bem como tipo de animação realizada na troca de estado
    function changeLayout(searchKey) {
        let expand; //Variável que vai receber a mudança do estado, e inserir no novo array
        let devicesUpdated = []; //Novo Array de dispositivos que substituirá o array inicial, com os estados dinamicamente alterados
        devices.forEach((device) => { //Laço para percorrer todos os dispositivos existentes
            if (device.key === searchKey) { //Se a a chave recebida for igual a lida atualmente, inverte o estado do dispositivo atual
                expand = !device.expanded;
            }
            else {//Se a chave não for igual, o estado deve ser false, para que apenas 1 dropdown esteja aberto por vez
                expand = false;
            }
            let list = { //Cada dispositivo será alterado como necessitar
                key: device.key,
                name: device.name,
                expanded: expand,
                lightState: device.lightState
            }
            devicesUpdated.push(list); //Insere cada dispostivo no novo Array de dispositivos
        });
        setDevices(devicesUpdated); //Altera o array antigo, com o array novo, garantindo o funcionamento do dropdown para todos os dispositivos
        //alert(JSON.stringify(devicesUpdated));


        //alert(key);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        //let expand = !expanded; //Pegamos o oposto do valor atual de expanded, para abrir se estiver fechada, e fechar se estiver aberta
        //setExpanded(expand); //Passamos o novo valor para a expanded
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
        // Container de toda a aplicação
        <View style={{ height: '100%', width: '100%' }}>
            {/* O Gradient abaixo deixa o fundo em degradê, nas cores indicadas pela prop 'colors' */}
            <LinearGradient
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#00AB98', '#00AB98']}>
                {/* Um container para exibição do CDT, que também terá um degradê */}
                <View style={{ height: '10%', width: '100%', marginBottom: 15 }}>
                    {/* Gradient para deixar o CDT com degradê */}
                    <LinearGradient
                        style={{ flex: 1, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: "center", justifyContent: "center", shadowColor: '#777', elevation: 2, borderWidth: 0.25 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#00AB98', '#03A63C']}
                    >
                        {/* Exibe o CDT */}
                        <Text style={{ color: '#FFF', fontSize: 30, fontWeight: "bold" }}>CDT</Text>
                        <Text style={{ color: '#FFF', fontSize: 30, fontWeight: "bold" }}>10°</Text>
                    </LinearGradient>
                </View>

                {/* Uma ScrollView que ocupará quase todo o restante da página, onde serão listados os dispositivos */}
                <ScrollView style={{ height: '82.5%' }}>
                    {/* Este FlatList renderizará todos os dispositivos cadastrados de acordo com a necessidade (usuário vai scrollando, vai carregando mais, caso haja) */}
                    <FlatList
                        contentContainerStyle={{ height: '100%', width: 1.0 * width }}
                        data={devices}
                        renderItem={({ item }) => (
                            // Componente que será renderizado, para cada dispositivo cadastrado
                            <View style={{ alignItems: "center" }}>
                                {/* Os dispositivos serão exibidos em botões */}
                                <TouchableOpacity style={{ height: 50, width: 0.95 * width, flexDirection: "row", borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomRightRadius: item.expanded ? 0 : 5, borderBottomLeftRadius: item.expanded ? 0 : 5, backgroundColor: '#FFF', shadowColor: '#000', elevation: 10 }} onPress={() => { changeLayout(item.key) }}>
                                    {/* Os botões terão um Gradient também */}
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={['#F28705', '#F2E205']}
                                        style={{ borderRadius: 5, width: '100%', flexDirection: "row", alignItems: "center" }}
                                    >
                                        {item.expanded ? //Se o item estiver expandido, mostra o ícone seta para cima
                                            (<Icon style={{ marginLeft: 5 }} name="chevron-up" size={20} color={'#FFF'}></Icon>) 
                                            :
                                            //Se não, mostra o ícone seta para baixo 
                                            (<Icon style={{ marginLeft: 5 }} name="chevron-down" size={20} color={'#FFF'}></Icon>)
                                        }
                                        {/* Exibe o nome do dispositivo */}
                                        <Text style={{ marginLeft: 5, color: '#FFF', fontSize: 17, fontWeight: "bold" }}>{item.name}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                {/* Fim do botão que abre e fecha os detalhes do dispositivo */}

                                {/* Container para exibir os detalhes do dispositivo quando o usuário clicar sobre seu botão */}
                                <View style={{ height: item.expanded ? 450 : 0, width: 0.95 * width, overflow: "hidden", marginBottom: 15, backgroundColor: '#FFF' }}>
                                    <Text style={{ paddingLeft: 15, paddingTop: 15 }}>Nome do dispositivo: <Text style={{ fontWeight: "bold" }}>{item.name}</Text></Text>
                                    <Text style={{ paddingLeft: 15 }}>Local: <Text style={{ fontWeight: "bold" }}>Sala de reunião</Text> </Text>
                                    <Text style={{ paddingLeft: 15 }}>Última Temperatura Registarda: <Text style={{ fontWeight: "bold" }}>20°</Text></Text>
                                    <View style={{ flexDirection: "row", width: 0.95 * width, alignItems: "center", justifyContent: "flex-end", padding: 20 }}>
                                        <Icon name="lightbulb" size={20}></Icon>
                                        {/* O Switch abaixo funcionará apenas para exibir o estado da luz (Apagada/Ligada), não podendo ser alterado pelo usuário */}
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#00AB98" }} //Cores do 'caminho' da bolinha do Switch
                                            thumbColor={item.lightState ? "#03A63C" : "#f4f3f4"} //Cores da bolinha do Switch
                                            ios_backgroundColor="#3e3e3e"
                                            //onValueChange={toggleSwitch}
                                            disabled={true} //Desabilita a possibilidade do usuário interagir com o Switch
                                            value={item.lightState} //O valor dele, vem do fato do dispositivo estar ligado ou não (informação do DB)
                                        />
                                    </View>
                                    {/* Gráfico para exemplificar design */}
                                    <View style={{ width: '100%', height: 220, marginLeft: 0.095 * width, alignItems: "center", justifyContent: "center", borderWidth: 1 }}>
                                        <Image style={{ width: 300, height: 200 }} source={require('../../assets/images/lineGraphic.png')}></Image>
                                    </View>

                                    {/* Container para a área dos botões */}
                                    <View style={{ flexDirection: "row", height: 75, width: '100%', marginTop: 15, justifyContent: "flex-end" }}>
                                        {/* Botão do Buzzer */}
                                        <TouchableOpacity>
                                            {/* Deixa o botão do Buzzer em Gradient */}
                                            <LinearGradient
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                colors={['#03A63C', '#00AB98']}
                                                style={{ width: 50, height: 50, alignItems: "center", justifyContent: "center", marginRight: 15, padding: 10, backgroundColor: '#0B7534', borderRadius: 5 }}>
                                                {/* Ícone de buzina para simbolizar comando de mandar o buzzer apitar */}
                                                <Icon name="bullhorn" color={'#FFF'} size={25}></Icon>
                                            </LinearGradient>
                                        </TouchableOpacity>

                                        {/* Botões de + e - para aumentar ou diminuir a frequência de envio das informações pelo dispositivo */}
                                        <View style={{ flexDirection: "row", marginRight: 15 }}>
                                            {/* Botão de diminuir frequência */}
                                            <TouchableOpacity style={{ width: 50, height: 50, alignItems: "center", justifyContent: "center", padding: 5, borderWidth: 1, borderRightWidth: 0, borderColor: '#D9534F', backgroundColor: '#D9534F' }} onPress={() => { lessFrequency() }}>
                                                <Icon name="minus" color={'#FFF'} size={15}></Icon>
                                            </TouchableOpacity>

                                            {/* Exibe o valor atual da frequência de envio */}
                                            <Text style={{ fontSize: 15, textAlign: "center", textAlignVertical: "center", width: 50, height: 50, borderWidth: 1, borderColor: '#999' }}>{frequencyCounter}</Text>

                                            {/* Botão de aumentar frequência */}
                                            <TouchableOpacity style={{ width: 50, height: 50, alignItems: "center", justifyContent: "center", padding: 5, borderWidth: 1, borderLeftWidth: 0, borderColor: '#0B7534', backgroundColor: '#0B7534' }} onPress={() => { moreFrequency() }}>
                                                <Icon name="plus" color={'#FFF'} size={15}></Icon>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    ></FlatList>
                </ScrollView>

                {/*Botão para abrir o modal de cadastrar novo dispositivo */}
                <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{ backgroundColor: '#FFF', height: '7.5%', shadowColor: '#777', elevation: 2, borderTopWidth: 0.25 }}>
                    {/* Gradient para o fundo do botão */}
                    <LinearGradient
                        style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#00AB98', '#03A63C']}
                    >
                        {/* ícone de adicionar novo dispositivo */}
                        <Icon name="plus" size={20} color={'#FFF'}></Icon>
                        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>Novo Dispositivo</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>

            {/* Modal para cadastro de novo dispositivo */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}>
                {/* Container scrollável para o modal */}
                <ScrollView
                    style={{ height: '100%', marginTop: '22%', borderTopLeftRadius: 25, borderTopRightRadius: 25, backgroundColor: '#FFF' }}
                    contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                        {/* Fundo Gradient para o modal */}
                    <LinearGradient
                        style={{ flex: 1, alignItems: "center", justifyContent: "center", borderTopLeftRadius: 25, borderTopRightRadius: 25, elevation: 20 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#F28705', '#F2E205']}
                    >
                        {/* Container para o corpo do modal */}
                        <View style={{ height: 1 * height, width: 1 * width, alignItems: "center", justifyContent: "flex-start" }}>
                            {/* Botão de fechar modal, simbolizado pelo ícone de seta para baixo */}
                            <TouchableOpacity style={{ width: '100%', alignItems: "center", justifyContent: "center" }} onPress={() => { setModalVisible(false) }}>
                                <Icon name="chevron-down" size={30} color={'#000'}></Icon>
                            </TouchableOpacity>
                            {/* Título do Modal */}
                            <Text style={{ fontSize: 25, marginBottom: 50, fontWeight: "bold" }}>Novo Dispositivo</Text>

                            {/* Campos do modal */}
                            <TextInput placeholder="Key" placeholderTextColor={'#000'} style={{ height: 40, fontWeight: "bold", width: '90%', borderColor: 'gray', borderBottomWidth: 1, marginBottom: 15 }}></TextInput>
                            <TextInput placeholder="Nome do Dispositivo" placeholderTextColor={'#000'} style={{ height: 40, fontWeight: "bold", width: '90%', borderColor: 'gray', borderBottomWidth: 1, marginBottom: 15 }}></TextInput>
                            <TextInput placeholder="Local" placeholderTextColor={'#000'} style={{ height: 40, fontWeight: "bold", width: '90%', borderColor: 'gray', borderBottomWidth: 1, marginBottom: 15 }}></TextInput>

                            {/* Botão de Salvar, para efetuar cadastro de novo dispositivo, com os dados inseridos nos campos acima */}
                            <TouchableOpacity style={{ width: '50%', height: 50, backgroundColor: '#00AB98', borderRadius: 25, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: '#FFF' }}>Salvar</Text>
                            </TouchableOpacity>
                        </View>

                    </LinearGradient>
                </ScrollView>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({

});