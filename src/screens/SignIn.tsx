import { useState } from 'react';
import { Alert } from 'react-native';
import {VStack, Heading, Icon, useTheme, Text, HStack} from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SignIn() {

    const {colors} = useTheme();
    const navigation = useNavigation();

    const [isLoading,setIsLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignIn() {
        if(!email || !password){
            //! A EXECUÇÃO DO Alert.alert() não precisa do return, mas ele está ai para poder parar a execução da função
            return Alert.alert('Entrar','Informe e-mail e senha')
        }

        setIsLoading(true)

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log("Sign response:",response)
            })
            .catch((error) => {
                console.log("Sign error:",error.code)
                setIsLoading(false)

                switch(error.code){
                    case 'auth/invalid-email': Alert.alert('Entrar','E-mail ou senha inválida!'); break
                    case 'auth/user-not-found': Alert.alert('Entrar','E-mail ou senha inválida!'); break
                    case 'auth/wrong-password': Alert.alert('Entrar','E-mail ou senha inválida!'); break
                    default: Alert.alert('Entrar','Ocorreu um erro interno, tente novamente!'); break
                }
            })
    }

    function handleSignUp(){
        navigation.navigate('signUp')
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo/>
            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>
            
            {
                //* Se quiser só o ícone sem nenhum estilo extra, ele pode ser passado como uma varíavel ao invés de como uma tag
            }
            <Input 
                mb={4}
                placeholder="E-mail" 
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4}/>} 
                keyboardType="email-address"

                onChangeText={setEmail}
            />
            <Input
                mb={8}
                placeholder="Senha" 
                InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
                secureTextEntry

                onChangeText={setPassword}
            />

            <Button 
                title="Entrar" 
                w="full"

                onPress={handleSignIn}
                isLoading={isLoading}
            />

            <Button 
                title="Criar conta" 
                w="full"
                mt={5}

                onPress={handleSignUp}
                isLoading={isLoading}
            />
        </VStack>
    )
}