import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({...rest}: IInputProps) { //* ...rest permite que todas as propriedades de uma tag sejam usadas seja lá onde for chamado o componente, enquanto IInputProps permite que o intelecense consiga mostrar essas propriedades onde o componente for chamado
  return (
    <NativeBaseInput 
        bg="gray.700"
        h={14}
        size="md"
        borderWidth={0}
        fontSize="md"
        color="white"
        placeholderTextColor="gray.300"
        _focus={{ //* aqueles com _ são pseudo-propriedades que só funcionam para casos específicos, tipo um 'on'
            borderWidth: 1,
            borderColor: "green.500",
            bg: "gray.700"
        }}
        {...rest}
    />
  );
}