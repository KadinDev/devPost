// criando o nosso contexto, nosso PROVIDER
// o AuthProvider ele fica por volta de todo o nosso App.js
// o AuthContext vai para o index da pasta routes
import React, { useState, createContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // BD
import AsyncStorage from '@react-native-community/async-storage';

import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext({});

console.disableYellowBox=true;

export function AuthProvider( { children } ){
    
    const navigation = useNavigation();

    const [ user, setUser ] = useState(false);
    const [loading, setLoading] = useState(true); //loading para quando clicar em logar
    const [loadingAuth, setLoadingAuth] = useState(false); //só passa para true quando clicar em acessar

    //mantendo usuario sempre logado
    useEffect( () => {
        async function loadStorage(){
            //devApp é a chave que criei em function storageUser
            const storageUser = await AsyncStorage.getItem('devApp');

            if(storageUser){ // se tem usuário
                // setUser recebe o usuario logado
                setUser(JSON.parse(storageUser)); // parse transformando de volta em objeto
                setLoading(false);
            }

            setLoading(false); //se não tem user logado ele fica em false (desativado)
        };

        loadStorage();
    },[] )


    // logando usuário
    async function signIn(email, password) {
        setLoadingAuth(true);

        await auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {//dentro do value podemos acessar o id do user, email, name, etc...
            let uid = value.user.uid;
            
            //pegando nome do usuario logado
            const userProfile = await firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                email: value.user.email
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
        } )
        .catch ( (error ) => {
            alert(error);
            setLoadingAuth(false);
        } )
    }
    //


    // deslogando usuário
        async function signOut() {
            await auth().signOut();
            await AsyncStorage.clear()// limpando
            .then( () => {
                setUser(null);
            } )
        }
    //


    // criando user
    async function signUp( name, password, email ) {
        //começando o processo de criação de user já mudando para true
        setLoadingAuth(true);

        await auth().createUserWithEmailAndPassword(password, email)
        .then( async (value) => { //dentro do value podemos acessar o id do user, email, name, etc...
            let uid = value.user.uid;
            await firestore().collection('users')
            .doc(uid).set({ //.doc = documento
                nome: name,
            })
            .then( () => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email
                }
                
                // agora passa o user criado para o setUser
                setUser(data);

                // passa para cá, para quando criar o user ele pega as info do user
                //e mantem ele sempre logado
                storageUser(data);

                setLoadingAuth(false); //termina mudando para false

                navigation.navigate('Profile')
            } )
        })
        .catch((error) => {
            alert(error);
            setLoadingAuth(false);
        })
    };
    //


    // Async Storage para manter usuário sempre logado
    async function storageUser(data){ 
                                //devApp é a chave, nome que escolhi
        await AsyncStorage.setItem('devApp', JSON.stringify(data)); //converter para string

    }
    //

    return (
        <AuthContext.Provider value={{ 
        
            signed: !!user,
            user, // do useState
            signIn,
            signUp,
            signOut,
            loadingAuth, // e coloca aqui para acessar no componente de login
            loading,
            storageUser, //passa pra cá para quando houver atualização do user ele salvar aqui tbm
            setUser, //altera o userState
        }}>

            { children }

        </AuthContext.Provider>
    )
}