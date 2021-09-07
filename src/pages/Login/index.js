import React, { useState, useRef, useContext } from 'react';
import { View, Text, Keyboard } from 'react-native';

import Lottie from 'lottie-react-native';

import { 
    Container,
    Title,
    Input,
    Button,
    TextButton,
    SignUpButton,
    SignUpText
} from './styles';

//navegar
import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
const InputAnimated = Animatable.createAnimatableComponent(Input);

import { AuthContext } from '../../contexts/auth';

export function Login(){
    const { signIn, loadingAuth } = useContext(AuthContext);

    const navigation = useNavigation();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // animation input
    const inputRefEmail = useRef(null);
    const inputRefPassword = useRef(null);

    function inputAnimationEmail(){
        inputRefEmail.current.shake();
    }
    function inputAnimationPassword(){
        inputRefPassword.current.rubberBand();
    }
    
    //
    
    function handleLogin(){
        if ( email === '' ) {
            inputAnimationEmail();
            return;
        } else if ( password === '' ) {
            inputAnimationPassword();
            return;
        }
        else {
            //setEmail('');
            //setPassword('');
            Keyboard.dismiss();

            signIn(email, password);
        }  
    }


    return (
        <Container>

            <Animatable.View
                animation='flipInX'
                duration={1500}
            >
                <Title> Dev <Text style={{color: '#e52246'}}>Post</Text> </Title>
            </Animatable.View>

            <InputAnimated
                placeholder="email@email.com"
                value={email}
                onChangeText={ (email) => setEmail(email) }

                animation='fadeInLeft'
                duration={1000}
                ref={inputRefEmail}
            />
            <InputAnimated
                placeholder="********"
                secureTextEntry={true}
                value={password}
                onChangeText={ (pass) => setPassword(pass) }

                animation='fadeInLeft'
                duration={1500}
                ref={inputRefPassword}
            />
        
            <Button
                activeOpacity={0.7}
                onPress={handleLogin}

            >   
                {
                    loadingAuth ? (
                        <Lottie  style={{height: 45, }} source={require('../../assets/lottie/cafe.json')} autoPlay loop />
                    ) : (
                        <TextButton>Acessar</TextButton>
                    )
                }
            </Button>

            <SignUpButton
                activeOpacity={0.7}
                onPress={ () => navigation.navigate('Register') }
            >
                <SignUpText>
                    Criar uma conta
                </SignUpText>
            </SignUpButton>
            
            
        </Container>
    )

}