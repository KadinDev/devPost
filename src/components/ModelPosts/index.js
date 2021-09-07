import React from 'react';
import {View} from 'react-native';

import {
    Container,
    ContainerUser,
    ScrollContent,
    Header,
    ButtonCloseModal,
    NameUser,
    ButtonNavigationUser,
    Avatar,
    Content,
    TitlePost,
    ContentPost
} from './styles';

import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

export function ModalPosts( {user, userId, closeModal} ){
    
    const navigation = useNavigation();

    return (
        <Container>
            <ContainerUser>

                <ScrollContent>

                    <Header>
                        <View style={{flexDirection: 'row', alignItems: 'center' }}>
                            <ButtonCloseModal
                            activeOpacity={0.7}
                            onPress={()=>closeModal(false)}
                            >
                                <Feather name='arrow-left' size={25} color='#fff' />
                            </ButtonCloseModal>

                            <NameUser> { user?.autor } </NameUser>
                        </View>

                        {
                            user.avatarUrl ?
                            (   
                                /*<ButtonNavigationUser
                                activeOpacity={0.7}
                                onPress={ () => navigation.navigate('PostsUser', {
                                    title: user.autor,
                                    userId: userId
                                } ) }
                                >*/
                                    <Avatar
                                        source={{ uri: user.avatarUrl }}
                                    />
                                //</ButtonNavigationUser>
                            ) :
                            (
                                /*<ButtonNavigationUser
                                activeOpacity={0.7}
                                onPress={ () => navigation.navigate('PostsUser', {
                                    title: user.autor,
                                    userId: userId
                                } ) }
                                >*/
                                    <Avatar
                                        source={require('../../assets/avatar.png')}
                                        
                                    />
                                //</ButtonNavigationUser>
                            )
                        }
                    </Header>
                    
                    <Content>
                        
                        <TitlePost> { user.title } </TitlePost>

                        <ContentPost> { user.content } </ContentPost>

                    </Content>

                </ScrollContent>

            </ContainerUser>
        </Container>
    )
}