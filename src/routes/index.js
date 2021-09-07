// aqui controla para onde vai mandar o user
// se estiver logado manda para o app.routes se não para o auth.routes

import React, { useContext } from 'react';
import { View } from 'react-native';

import { AuthContext } from '../contexts/auth';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

import Lottie from 'lottie-react-native';

export function Routes(){
    // esse signed vem da linha 10
    const { signed, loading } = useContext(AuthContext);

    // esse if vai fazer aparecer o loading antes de abrir a primeira tela do App
    // que é a tela de login
    if (loading){
        return (
            <View
                style={{
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: "#36393F",
                    width: '100%',
                    height: '100%',
                }}
            >   
                <View 
                    style={{ 
                        width: '50%', 
                        height: '50%', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                    }}>

                    <Lottie resizeMode='contain' source={require('../assets/lottie/cafe.json')} autoPlay={true} />

                </View>
            </View>
        )
    }

    return (
        // se tiver logado - AppRoutes
        // se não estiver logado - AuthRoutes
        signed ? <AppRoutes/> : <AuthRoutes/>
    );
};