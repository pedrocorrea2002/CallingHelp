import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { HStack, Text, VStack, useTheme, ScrollView, Box } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText } from 'phosphor-react-native';

import { Header } from '../components/Header';
import { OrderProps } from '../components/Order';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

type RouteParams = {
  orderId: string
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
  userOpener: string;
  userCloser?: string;
  openerEmail: string;
}

export function Details() {
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const { colors } = useTheme()
  const navigation = useNavigation()
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  function handleOrderClose(){
    if(!solution){
      return Alert.alert('Solicitação','Informe uma solução para poder finalizar a solicitação!')
    }

    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitação','Solicitação finalizada.')
        navigation.goBack()
      })
      .catch((error) => {
        console.log("Finalização error:",error)

        Alert.alert('Solicitação','Não foi possível finalizar a solitação.')
      })
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, created_at, closed_at, solution, userOpener } = doc.data()

        const closed = closed_at ? dateFormat(closed_at) : null

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
          userOpener,
          userCloser: auth().currentUser.displayName,
          openerEmail: auth().currentUser.email
        })

        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {
          order.status === 'closed'
            ? <CircleWavyCheck size={22} color={colors.green[300]} />
            : <Hourglass size={22} color={colors.secondary[700]} />
        }

        <Text
          fontSize="sm"
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
        >
          {order.status === 'closed' ? 'Finalizado' : 'Em andamento'}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails 
          title="equipamento" 
          //! NÃO É POSSÍVEL USAR `` FORA DE {}
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />
        <CardDetails 
          title="descrição do problema" 
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when} por ${order.userOpener}`}
        />
        <CardDetails 
          title="solução" 
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed} por ${order.userCloser}`}
        >
          {
            order.status === 'open' &&
            <Input
              placeholder='Descrição da solução'
              onChangeText={setSolution}
              textAlignVertical="top"
              multiline
              h={24}
            />
          }
        </CardDetails>

        {
          order.status === 'open' &&
          <Button 
            title="Finalizar solicitação"
            m={5}

            onPress={handleOrderClose}
          />
        }
      </ScrollView>
    </VStack>
  );
}