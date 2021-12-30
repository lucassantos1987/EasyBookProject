import React, { useState, useRef, useContext } from 'react';
import { View, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import i_login from '../../services/login';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthContext from '../../contexts/auth';

import styles from './style';


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type_user, setType_user] = useState('');

    const { signed } = useContext(AuthContext);

    console.log(signed);

    const navigation = useNavigation();

    const email_input = useRef();
    const password_input = useRef();

    function navigateToRegister() {
        navigation.navigate('Register');
    }

    function navigateToRegisterCustomer() {
        navigation.navigate('RegisterCustomer');
    }

    function navigateToMenu() {
        navigation.navigate('Menu');
    }

    function navigateToMenuCustomer() {
        navigation.navigate('MenuCustomer');
    }

    function handleLogin() {
        i_login.login(email, password);    
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.buttonHeaderBack}
                    onPress={() => navigation.goBack()}>
                    <Icon name="home" size={26} color="#FFFFFF"/>
                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>Tela Inicial</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.login}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 40 }}>EASYBOOK</Text>
                </View>
                <TextInput
                    ref={email_input}
                    style={styles.loginInput}
                    placeholder="Digite seu email..."
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    onSubmitEditing={() => password_input.current.focus()}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    autoCapitalize="none"
                />
                <TextInput
                    ref={password_input}
                    style={styles.loginInput}
                    maxLength={20}
                    placeholder="Digite sua senha..."
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    returnKeyType="go"
                    autoCapitalize="none"
                    secureTextEntry
                />

                {/*<DropDownPicker
                    items={[
                        {label: 'CLIENTE', value:'C'},
                        {label: 'PROFISSIONAL', value: 'P'}
                    ]}
                    containerStyle={{ height: 60 }}
                    style={{ backgroundColor: '#FFFFFF', marginTop: 10}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    value={type_user}
                    onChangeItem={item => onChangeTypeUser(item.value)}
                />*/}

            </View>
            <View style={styles.containerLogin}>
                <TouchableOpacity
                    style={styles.buttonSignUpCustomer}
                    onPress={navigateToRegisterCustomer}>
                    <Text style={styles.textButtonSignUpCustomer}>
                        Sou cliente e não sou cadastradado
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonSignUpProvider}
                    onPress={navigateToRegister}>
                    <Text style={styles.textButtonSignUpProvider}>
                        Sou profissional e não sou cadastradado
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={handleLogin}>
                    <Text style={styles.textButtonLogin}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}