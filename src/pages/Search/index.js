import React, { useRef, useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import {
    Container,
    AreaInput,
    Input,
    List
} from './styles';

import { Header } from '../../components/Header';
import { SearchList } from '../../components/SearchList';
import Feather from 'react-native-vector-icons/Feather';

import firestore from '@react-native-firebase/firestore';

export function Search(){

    const [list, setList] = useState('');
    const [users, setUsers] = useState([]);

    const keyboardOpen = useRef(null);

    //quando eu coloca algo como dependencia no useEffect quer dizer que vai sempre executar (chamar)
    //tudo no useEffect sempre que algo que está nesse depencia mudar!
    useEffect( ()=>{
        keyboardOpen.current.focus();

        if(list === '' || list === undefined) {
            setUsers([]);
            return;
        }

        const subscriber = firestore().collection('users')
        //para funcionar novamente criar indice no firebase, o código de conjunto é a coleção = users
        //caminho do campo 1 é o 'nome'
        //caminho do campo 2 coloquei created
        //depois seleciona Coleção
        .where('nome', '>=', list )
        .where('nome', '<=', list + '\uf8ff' )
        .onSnapshot( snapshot => {
            const listUsers = [];

            snapshot.forEach( doc => {
                listUsers.push({
                    ...doc.data(),
                    id: doc.id
                });
            });

            setUsers(listUsers);
            //console.log(listUsers); //quantidade de usuarios com a letra digitada
        
        });
        
        return () => subscriber();
        


    },[list]) //list como dependencia, significa que cada vez que eu mudar alguma coisa (letra),
    //ele vai chamar o useEffect

    return (
        <TouchableWithoutFeedback
        onPress={ () => Keyboard.dismiss() }
        >
            <Container>

                <Header />

                <AreaInput>
                    <Feather
                    name='search'
                    color='#fff'
                    size={20}
                    />
                    
                    <Input
                    ref={keyboardOpen}
                    placeholder='Buscar dev'
                    placeholderTextColor='#999'
                    value={list}
                    onChangeText={ (text) => setList(text) }
                    />
                </AreaInput>


                <List
                showsVerticalScrollIndicator={false}
                data={users}
                keyExtractor={ (item) => item.id } //o id de cada item
                renderItem={ ({ item }) => 
                    <SearchList 
                        data={item} 
                        input={setList}  
                        users={setUsers}
                    /> }
                />

            </Container>
        </TouchableWithoutFeedback>
    )
}