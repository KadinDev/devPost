import React, { useContext, useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';

import { Text, View, ActivityIndicator } from 'react-native'
import { 
    Container,
    Icon,
    ButtonPost,
    ListPosts
} from './styles';

import Lottie from 'lottie-react-native';
//import home from '../../assets/lottie/search.json';
import * as Animatable from 'react-native-animatable';

import { Header } from '../../components/Header';
import { PostsList } from '../../components/PostsList';

const ButtonAnimado = Animatable.createAnimatableComponent(ButtonPost)

export function Home(){

    const navigation = useNavigation();
    const [post, setPost] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect( () => {

        const subscriber = firestore()
        .collection('posts') //acessar a coleção posts
        .orderBy('created', 'desc')
        .onSnapshot( snapshot => { //snapshot fica sempre visualizando em tempo real a coleção de posts, quando tiver um novo ele já coloca
            const postList = [];
            snapshot.forEach( doc => { //doc é o id de cada post criado
                postList.push({
                    ...doc.data(), //vai pegar toda a info do post
                    id: doc.id, //pega id
                });
            } );

            setPost(postList);
            setLoading(false);
        } )



        // aqui faz com que na hora que o componente for desmontado da tela, ou seja,
        // quando clicar em ir para outra tela, ele desmonta o subscriber, melhorar na
        //performance do app. etc..
        return () => subscriber();

    },[] );

    
    function buttonNavigation(){
        //como função posso colocar o botão para fazer várias coisas ao msm tempo
        navigation.navigate('NewPost');
    }

    return (
        <Container>

            <Header />

            { loading ?
            (   
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: 100, height: 100}}>
                        <Lottie resizeMode='contain' source={require('../../assets/lottie/cafe.json')}  autoPlay={true} />
                    </View>
                </View>
            ) :
            (
                <ListPosts
                showsVerticalScrollIndicator={false}
                data={post}

                //data={item} recebe todas as info que está no banco (post, nome, data, likes, etc..)
                // userId={user.uid} recebe o id do usuario que esta logado
                renderItem={ ({item}) => ( <PostsList data={item} userId={user.uid} /> ) }
                />
            )
            }
            

            <ButtonAnimado
                animation='wobble'
                duration={2000}
                useNativeDriver

                activeOpacity={0.7}
                onPress={ buttonNavigation }
            >
                <Icon name='plus' size={25} color='#FFF' />
            </ButtonAnimado>
            
        </Container>
    )
}