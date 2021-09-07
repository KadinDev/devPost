import React, { useState, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { 
    Container,
    Header,
    Avatar,
    Name,
    ContentView,
    ViewMore,
    Content,
    ContentTitle,
    Actions,
    LikeButton,
    Likes,
    ButtonIcon,
    TimePost
} from './styles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Lottie from 'lottie-react-native';

import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import firestore from '@react-native-firebase/firestore';
import { ModalPosts } from '../ModelPosts';

import * as Animatable from 'react-native-animatable';
const HeartAnimated = Animatable.createAnimatableComponent(ButtonIcon);

export function PostsList( { data, userId } ){

    const navigation = useNavigation();

    const [ modal, setModal ] = useState(false);
    //const lottieLike = require('../../assets/lottie/like.json');
    //const lottieDeslike = require('../../assets/lottie/deslike.json');
    const animationHeart = useRef(null); //para animar

    function modalContent(){
        setModal(true);
    };

    function formatTimePost(){
        // converter timestamp para data
        // data.created é a do banco de dados
        const datePost = new Date(data.created.seconds * 1000); //data formatada

        return formatDistance(
            new Date(), //data de hj
            datePost,
            {
                locale: ptBR,
            }
        )
    };


    async function likesPost(id, likes){

        animationHeart.current.rubberBand();

        // ${userId} id do usuário logado, ${id} = id do post que estou clicando
        const docId = `${userId}_${id}`; //assim já criei o doc para o banco de dados

        //checar se o post já foi curtido
        const doc = await firestore().collection('likes')
        .doc(docId).get();

        if(doc.exists){
            //quer dizer que ele já curtiu esse post
            await firestore().collection('posts')
            .doc(id).update({ //update atualizando, id = id do post que estou clicando
                likes: likes - 1,
            })

            await firestore().collection('likes')
            .doc(docId).delete();
            
            return;
        }

        // criando like do user no post
        await firestore().collection('likes')
        .doc(docId).set({
            postId: id, // post que estou dando like
            userId: userId, // usuário que está dando like
        });

        // somar + 1 like no post
        await firestore().collection('posts')
        .doc(id).update({
            likes: likes + 1,
        });
    };


    return (
        <Container>

            <Header>
                {
                    data.avatarUrl ?
                    (
                        <Avatar
                            source={{ uri: data.avatarUrl }}
                        />
                    ) :
                    (
                        <Avatar
                            source={require('../../assets/avatar.png')}
                        />
                    )
                }
                <TouchableOpacity
                activeOpacity={0.7}
                //mandando info do user após o PostsUser, {info do user aqui dentro}
                onPress={ () => navigation.navigate('PostsUser', {
                    title: data.autor, //nome do user
                    userId: data.userId, // id do dono dos post
                } ) }
                >
                    <Name> { data?.autor } </Name>
                </TouchableOpacity>
            </Header>

            <ContentView>
                <ContentTitle numberOfLines={2}> { data.content } </ContentTitle>
            </ContentView>

            <ViewMore
                activeOpacity={0.7}
                onPress={ () => modalContent() }
            >
                <Text
                style={{ color: '#353840', fontSize: 16 }}
                >Ver Mais ...</Text>
            </ViewMore>

            <Actions>

                <LikeButton>

                    <HeartAnimated
                        activeOpacity={0.7}
                        // passar como parametro para a gnt saber - likesPost(data.id) data.id é o id do post que estou clicando
                        // data.likes, passando tbm a quantidade de likes que tem
                        //aí na função recebe eles, o id e o likes
                        onPress={ ()=> likesPost(data.id, data.likes ) }
                        ref={animationHeart}
                        duration={2000}
                        useNativeDriver
                    >   
                        <Ionicons
                        name={ data.likes === 0 ? 'heart-outline' : 'heart' }
                        color='#fd2533'
                        size={30}
                        />

                    </HeartAnimated>

                    <Likes> 
                        
                        { data.likes === 0 ? ('like') : (  `likes ${data.likes}` ) } 
                    
                    </Likes>

                </LikeButton>

                <TimePost>
                    há { formatTimePost() }
                </TimePost>
            
            </Actions>

            <Modal
                visible={modal}
                animationType='slide'
                transparent={true}
            >

                <ModalPosts user={data} userId={userId} closeModal={setModal} />

            </Modal>

        </Container>
    )
}