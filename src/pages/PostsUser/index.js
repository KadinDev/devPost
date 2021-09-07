import React, { useLayoutEffect, useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { Container, ListPosts } from './styles';

import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Lottie from 'lottie-react-native';

import { PostsList } from '../../components/PostsList';
import { AuthContext } from '../../contexts/auth';

export function PostsUser ( { route } ){ //route é o que foi mandado no botão que fez
    //a navegação para cá

    const navigation = useNavigation();
    const [title, setTitle] = useState(route.params.title);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);

    //colocar nome no header, antes era o PostsUser
    useLayoutEffect( () => {
        navigation.setOptions({
            title: title === '' ? '' : title
        });

    }, [navigation, title] );

    useEffect( () => {

        const subscriber = firestore().collection('posts')
        // pega todos os post onde o userId do post (dono do post) for igual ao
        // userId clicado (id do usuario clicado) route.params.userId
        
        // OBS, para o .where funcionar foi criado do firebase o indeces, de acordo com as info abaixo,
        // info colocado no indeces: userId e created
        .where('userId', '==', route.params.userId )
        .orderBy('created', 'desc') //created do bando de dados, data de criação
        .onSnapshot( snapshot => {
            const postList = [];
            snapshot.forEach( doc => {
                postList.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            setPosts(postList);
            console.log(postList.length)//quantidade de posts do user
            setLoading(false);
        } )

        return () => subscriber(); // desmontando o subscriber

    },[] );

    return (
        <Container>

            { 
                loading ? 
            (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: 100, height: 100}}>
                        <Lottie resizeMode='contain' source={require('../../assets/lottie/cafe.json')}  autoPlay={true} />
                    </View>
                </View>
            ) :
            (
                <ListPosts
                data={posts}
                showVerticalScrollIndicator={false}
                renderItem={ ({ item }) => <PostsList data={item} userId={user.uid} /> }
                />
            )
            
            }
            
        </Container>
    )
}