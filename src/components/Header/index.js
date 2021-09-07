import React from 'react';
import { Text, } from 'react-native';

import { 
    Container,
    Title,
} from './styles';

export function Header(){
    return (
        <Container>
            <Title>
                Dev
                <Text style={{fontStyle: 'italic', color: '#e53246'}} >Post</Text>
            </Title>
        </Container>
    )
}