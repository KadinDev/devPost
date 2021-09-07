import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Modal, Platform, } from 'react-native';
import {
    Container,
    UploadButton,
    UploadText,
    Avatar,
    Name,
    Email,
    Button,
    ButtonText,
    ModalContainer,
    ButtonBack,
    Input
} from './styles';

import { AuthContext } from '../../contexts/auth';
import Feather from 'react-native-vector-icons/Feather';

import { Header } from '../../components/Header';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'; //storage é a parte para tratar imagens no firebase
import * as ImagePicker from 'react-native-image-picker';

export function Profile(){
    // pega o signOut do AuthContext
    const { signOut, user, storageUser, setUser } = useContext(AuthContext);

    // foto mostrada no perfil
    const [url, setUrl] = useState(null);
    const [nome, setNome] = useState(user?.nome);
    const [openModal, setOpenModal] = useState(false);

    useEffect(()=>{
        async function load(){
            try {
                let response = await storage().ref('users').child(user?.uid).getDownloadURL();
                setUrl(response);
            } catch (error) {
                console.log('Error, nenhuma foto encontrada!')
            }
        }
        load()
    },[])

    // atualizar perfil
    async function updateProfile(){
        if (nome === ''){
            alert('Digite seu nome');
            return;
        }

        await firestore().collection('users')
        .doc(user.uid).update({ //.doc qual o documento que quero acessar
            nome: nome,
        })

        // buscar todos os posts desse usuario
        const postDocs = await firestore().collection('posts')
        
        //percorre todos os ports e ver se o userId(dono do post), é igual ao id do user logado
        // confirmando quais posts são dele
        .where('userId', '==', user.uid ).get(); //.get pega todos os dados

        // percorrer e atualizar os nomes do autor desse post
        postDocs.forEach( async doc => {
            await firestore().collection('posts').doc(doc.id).update({
                autor: nome
            })
        } )

        let data = {
            uid: user.uid,
            nome: nome,
            email: user.email,
        };

        setUser(data);
        storageUser(data);
        setOpenModal(false);
    }

    // UPLOAD DE IMAGEM
    const uploadFile = () => {
        const options = {
            noData: true,
            mediaType: '*photo'
        };

        ImagePicker.launchImageLibrary( options, response => { //response, vem a resposta

            if(response.didCancel){// se a pessoa cancelou
              console.log('Image Picker cancelado...');
            } else if (response.error){
              console.log('Gerou algum error:' + response.error);
            } else {

                uploadFileFirebase( response ).then( ()=> {
                    uploadAvatarPosts(); //função que atualiza a imagem nos posts do usuario,
                    //sempre que ele fizer upload(uploadFileFirebase)
                })
                setUrl(response.assets[0].uri);//foto mostrada no perfil
            }
        })
    };

    //caminho da imagem
    const getFileLocalPath = response => {
        //const { path, uri } = response;
        return response.assets[0].uri;
        //return Platform.OS === 'android' ? path : uri;
    };

    const uploadFileFirebase = async response => {
        const fileSource = getFileLocalPath(response);//caminho da imagem
        const storageRef = storage().ref('users').child(user.uid);
        console.log(fileSource)
        return await storageRef.putFile(fileSource)
    };

    ///////////////

    //atualizando imagem para os posts desse usuario receber
    async function uploadAvatarPosts(){
        const storageRef = storage().ref('users').child(user.uid);
        const url = await storageRef.getDownloadURL()
        .then( async image => { //dentro da imagem recebo a url da imagem do user
            // atualizar todos avatarUrl dos posts desse user
            const postDoc = await firestore().collection('posts') //acessar os posts
            .where( 'userId', '==', user.uid ).get();

            //percorrer em cada post do user e atualizar a imagem
            postDoc.forEach( async doc => {
                await firestore().collection('posts').doc(doc.id).update({
                    avatarUrl: image
                })
            } )
        } )
        .catch ( (error) => {
            console.log(error);
        } )
    }

    return (
        <Container>

            <Header/>

            { url ? (
                <UploadButton
                activeOpacity={0.9}
                onPress={uploadFile}
                >
                    <UploadText> + </UploadText>
                    <Avatar
                    source={{ uri: url }}
                    />
                </UploadButton>
            ) : (
                <UploadButton
                activeOpacity={0.9}
                onPress={uploadFile}
                >
                    <UploadText> + </UploadText>
                </UploadButton>
            ) }

            <Name numberOfLines={1}> { user?.nome } </Name>
            <Email 
            //numberOfLines faz com que quando o conteudo chegar no final da tela
            // ele coloca os ...
            numberOfLines={1}> {user.email} </Email>

            <Button
            activeOpacity={0.7}
            bg="#428cfd"
            onPress={ () => setOpenModal(true) }
            >
                <ButtonText color="#fff" > Atualizar Perfil </ButtonText>
            </Button>

            <Button
            activeOpacity={0.7}
            bg="#e52246"
            onPress={ () => signOut() }
            >
                <ButtonText color="#fff"> Sair </ButtonText>
            </Button>

            
            <Modal
            visible={openModal}
            animationType='slide'
            transparent={true}
            >
                <ModalContainer
                behavior = { Platform.OS === 'android' ? '' : 'padding' }
                >
                    <ButtonBack
                    onPress={() => setOpenModal(false)}
                    >
                        <Feather name='x' size={30} color='#121212' />
    
                    </ButtonBack>

                    <Input
                    placeholder={user?.nome}
                    value={nome}
                    onChangeText = { (text) => setNome(text) }
                    />

                    <Button
                    activeOpacity={0.7}
                    bg="#428cfd"
                    onPress={updateProfile}
                    >
                        <ButtonText color="#fff"> Atualizar </ButtonText>
                    </Button>

                </ModalContainer>
            </Modal>

        </Container>
    )
}