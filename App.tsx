
import { useEffect, useState } from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';

import { THEME } from './src/styles/theme';


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})
  const [notFound,setNotFound] = useState(false)

  //! SE AS FONTES NÃO FOREM ENCONTRADAS, O APP PROSSEGUE UTILIZANDO A FONTE PADRÃO
  useEffect(() => {
    setTimeout(() => {
      setNotFound(true)
    },2000)
  },[])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />
      {(fontsLoaded || notFound) ? <Routes/> : <Loading/>}
    </NativeBaseProvider>
  );
}
