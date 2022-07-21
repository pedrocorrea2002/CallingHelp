import { Box, Circle, HStack, Text, useTheme, VStack, Pressable, IPressableProps } from 'native-base';
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native'

export type OrderProps = { //* A vantagem de se exportar um type, é que facilita caso se queira aproveitar a mesma tipagem em outro lugar
    id: string;
    patrimony: string;
    when: string;
    status: 'open' | 'closed';
}

type Props = IPressableProps & {
    data: OrderProps;
}

export function Order({ data, ...rest}: Props) {

    const {colors} = useTheme()
    const statusColor = data.status === 'open' ? colors.secondary[700] : colors.green[300]

    return (
        <Pressable {...rest}>
            <HStack
                bg="gray.600"
                mb={4}
                alignItems="center"
                justifyContent="space-between"
                rounded="sm"
                overflow="hidden" //! SE ESSA LINHA FOR REMOVIDA O BOX NÃO VAI OBEDECER O ATRIBUTO rounded DO HStack
            >
                <Box h="full" w={2} bg={statusColor}/>

                <VStack flex={1} my={5} ml={5}>
                    <Text color="white" fontSize="md">
                        Patrimônio {data.patrimony}
                    </Text>
                    <HStack alignItems="center">
                        <ClockAfternoon size={15} color={colors.gray[300]}/>
                        <Text color="gray.200" fontSize="xs" ml={1}>
                            {data.when}
                        </Text>
                    </HStack>
                </VStack>

                <Circle bg="gray.500" h={12} w={12} mr={5}>
                    {
                        data.status === 'closed' 
                            ?   <CircleWavyCheck size={24} color={statusColor}/>
                            :   <Hourglass size={24} color={statusColor}/>
                    }
                </Circle>
            </HStack>
        </Pressable>
    );
}