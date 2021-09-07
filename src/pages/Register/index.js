// agora importa useContext e AuthContext do auth.js
// e pega do auth.js o signUp, está na linha 25

import React, { useState, useContext, useRef } from 'react';
import { 
    Keyboard, 
    Text,
    ActivityIndicator,
} from 'react-native';

import Lottie from 'lottie-react-native';

import { AuthContext } from '../../contexts/auth';

import { 
    Container,
    Title,
    Input,
    Button,
    TextButton,
    SignUpButton,
    SignUpText
} from './styles';

import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
const InputAnimated = Animatable.createAnimatableComponent(Input);


export function Register(){
    const { signUp, loadingAuth } = useContext(AuthContext);

    const [loading, setLoading] = useState(true)

    const navigation = useNavigation();

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [timePasswordAnimation, setTimePasswordAnimation] = useState(2000);

    // animation input
    const inputRefName = useRef(null);
    const inputRefEmail = useRef(null);
    const inputRefPassword = useRef(null);

    function inputAnimationName(){
        inputRefName.current.rubberBand();
    }
    function inputAnimationEmail(){
        inputRefEmail.current.shake();
    }
    function inputAnimationPassword(){
        inputRefPassword.current.tada();
    }
    //

    function handleRegister(){
        if( name === '' ) {
            inputAnimationName();
            return;
        } else if ( email === '' ) {
            inputAnimationEmail();
            return;
        } else if ( password === '' ) {
            inputAnimationPassword();
            setTimePasswordAnimation(500)
            return;
        }
        else {
            // cadastrando user
            Keyboard.dismiss();
            signUp(name, email, password);
            //setName('');
            //setEmail('');
            //setPassword('');
        } 
    }

    return (
        <Container>

            <Animatable.View
                animation='flipInY'
                duration={1500}
            >
                <Title> Dev <Text style={{color: '#e52246'}}>Post</Text> </Title>
            </Animatable.View>

            <InputAnimated
                placeholder="nome"
                value={name}
                onChangeText={ (name) => setName(name) }
                
                animation='lightSpeedIn'
                duration={1000}
                ref={inputRefName}
            />
            <InputAnimated
                placeholder="email@email.com"
                value={email}
                onChangeText={ (email) => setEmail(email) }

                animation='lightSpeedIn'
                duration={1500}
                ref={inputRefEmail}
            />
            <InputAnimated
                placeholder="********"
                secureTextEntry={true}
                value={password}
                onChangeText={ (pass) => setPassword(pass) }

                animation='lightSpeedIn'
                duration={timePasswordAnimation}
                ref={inputRefPassword}
            />
            
            <Button
                activeOpacity={0.7}
                onPress={handleRegister}
            >
                {
                    loadingAuth ? (
                        <Lottie  style={{height: 55, }} source={require('../../assets/lottie/register.json')} autoPlay loop />
                    ) : (
                        <TextButton>Cadastrar</TextButton>
                    )
                }
            </Button>

            <SignUpButton
                activeOpacity={0.7}
                onPress={ () => navigation.navigate('Login') }
            >
                <SignUpText>
                   Já tenho uma conta
                </SignUpText>
            </SignUpButton>

        </Container>
    )

}