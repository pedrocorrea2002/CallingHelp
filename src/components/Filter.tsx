import { Text, Button, IButtonProps } from 'native-base';

type Props = IButtonProps & {
    title: string;
    isActive?: boolean;
    type: 'open' | 'closed';
    color: string;
}

export function Filter({title, isActive = false ,type, color, ...rest}: Props) {
  return (
    <Button
        variant="outline"
        borderWidth={isActive ? 1 : 0}
        borderColor={color}
        bgColor="gray.600"
        flex={1}
        size="sm"
        {...rest}
    >
        <Text 
            color={isActive ? color : "gray.300"}
            fontSize="xs"
            textTransform="uppercase"
        >
            {title}
        </Text>
    </Button>
  );
}