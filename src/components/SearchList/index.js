import React, { useContext } from 'react';
import { 
    Container,
    Name
} from './styles';

import { useNavigation } from '@react-navigation/native';

export function SearchList( { data, input, users } ){

    const navigation = useNavigation();

    function navigationUser(){
        navigation.navigate('PostsUser', {
            title: data.nome,
            userId: data.id
        });

        input('');//limpa input
    }

    return (
        <Container
        activeOpacity={0.7}
        onPress={ () => navigationUser() }
        >
            <Name> { data.nome } </Name>
        </Container>
    )
}