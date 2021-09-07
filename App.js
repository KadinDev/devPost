// react-native-gesture-handler biblioteca que trabalha com as navegações, só para ter um melhor
// desempenho nas navegações
import 'react-native-gesture-handler';

import React from 'react';
import {
  StatusBar,
} from 'react-native';

// importar navegação
import { NavigationContainer } from '@react-navigation/native';

// provedor que vai compartilhar todas as info do user, para todos os componentes
// que estiver dentro dele
import { AuthProvider } from './src/contexts/auth';

import { Routes } from './src/routes';


export default function App(){
  return (
    <NavigationContainer>

      <AuthProvider>
        <StatusBar backgroundColor="#36393F" barStyle="light-content" translucent={false} />
        <Routes />
      </AuthProvider>

    </NavigationContainer>
  
  )
};
