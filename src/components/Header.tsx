import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
    title: string;
}

export function Header({title, ...rest}: Props) {

    const {colors} = useTheme();
    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack() //* FUNÇÃO DO PRÓPRIO react-navigation QUE DETECTA QUAL FOI A TELA ACESSADA ANTERIORMENTE E VOLTA PRA ELA
    }

    return (
        <HStack
            w="full"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.600"
            pb={2}
            pt={12}
            {...rest}
        >
            <IconButton
                icon={<CaretLeft color={colors.gray[200]} size={24}/>}
                onPress={handleGoBack}
                w={20}
                h={20}
                rounded="xl"
            />

            {
                //! A FUNÇÃO DESSE ml={-6} É DESCONTAR O ESPAÇO CONSUMIDO PELO ICONE ACIMA, PARA GARANTIR QUE O TEXTO ABAIXO FICARÁ EXATAMENTE NO MEIO DA TELA
            }
            <Heading color="gray.100" textAlign="center" fontSize="lg" flex={1} ml={-12}>
                {title}
            </Heading>
        </HStack>
    );
}