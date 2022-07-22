import { useState } from 'react';
import { Alert } from 'react-native';
import {VStack, Heading, Icon, useTheme} from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SignUp() {

    const {colors} = useTheme();
    const navigation = useNavigation();

    const [isLoading,setIsLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    function handleSignUp() {
        if(!email || !password || !confirmPassword || !name){
            //! A EXECUÇÃO DO Alert.alert() não precisa do return, mas ele está ai para poder parar a execução da função
            return Alert.alert('Cadastrar','Preencha todos os campos!')
        }

        if(password !== confirmPassword){
            return Alert.alert('Cadastrar','As duas senhas devem ser iguais!')
        }

        setIsLoading(true)

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                console.log("Sign response:",response)

                auth().currentUser.updateProfile({displayName: name})
            })
            .catch((error) => {
                console.log("Sign error:",error.code)
                setIsLoading(false)

                switch(error.code){
                    case 'auth/invalid-email': Alert.alert('Entrar','E-mail inválido!'); break
                    case 'auth/email-already-in-use': Alert.alert('Entrar','O E-mail informado já está cadastrado!'); break
                    default: Alert.alert('Entrar','Ocorreu um erro interno, tente novamente!'); break
                }
            })
    }

    function handleSignIn(){
        navigation.navigate('signIn')
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo/>
            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Se cadastre para começar a usar
            </Heading>
            
            {
                //* Se quiser só o ícone sem nenhum estilo extra, ele pode ser passado como uma varíavel ao invés de como uma tag
            }
            <Input 
                mb={4}
                placeholder="Nome completo" 
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4}/>} 

                onChangeText={setName}
            />
            <Input 
                mb={4}
                placeholder="E-mail" 
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4}/>} 
                keyboardType="email-address"

                onChangeText={setEmail}
            />
            <Input
                mb={4}
                placeholder="Senha" 
                InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
                secureTextEntry

                onChangeText={setPassword}
            />

            <Input
                mb={8}
                placeholder="Confirmar senha" 
                InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
                secureTextEntry

                onChangeText={setConfirmPassword}
            />

            <Button 
                title="Cadastrar" 
                w="full"

                onPress={handleSignUp}
                isLoading={isLoading}
            />

            <Button 
                title="Já tenho conta" 
                w="full"
                mt={5}

                onPress={handleSignIn}
                isLoading={isLoading}
            />
        </VStack>
    )
}