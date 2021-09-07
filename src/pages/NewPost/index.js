import React, { 
    useState, 
    useLayoutEffect, 
    useEffect, 
    useContext,
    useRef 
} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';

import {
    Container,
    Input,
    InputTitle,
    Button,
    ButtonText,
    Photo
} from './styles';

//storage é buscar inf do user, acessar a pasta 'users'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

//AuthContext aqui para pegar o usuário logado
import { AuthContext } from '../../contexts/auth';

export function NewPost(){

    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    const inputRef = useRef(null);
    
    //useLayoutEffect é executado após uma renderização, antes de
    // alguma atualização na tela, tanto ele como o useEffect funcionam
    useLayoutEffect( () => {

        const options = navigation.setOptions({
            // esse botão sendo criado assim, estou adicionando ele dentro do header de navegação
            headerRight: () => (//colocando ele na direita
                <Button
                    activeOpacity={0.7}
                    onPress={handlePost}
                >
                    <ButtonText> Compartilhar </ButtonText>
                </Button>
            )
        })
    
        //navigation pq quando eu clicar em fazer o post vai fechar a tela e voltar para home
        // essas são as dependencias, o useLayoutEffect vai sofrer alteração conforme essas dependencias
    },[navigation, post] );

    useEffect( () => {
        inputRef.current.focus();
    },[] );

    async function handlePost() {
        if(title, post === '' ){
            alert('Campo não pode ficar vazio!');
            return;
        }

        //se tiver foto aqui vai pegar a foto do user, se não tiver vai deixar como null
        let avatarUrl = null;
        try {
            //user?.uid com o ?, caso não tenha o user ele não vai dar erro, vai retornar como vazio
            // .child(user?.uid) aqui pego o id do usuário,
            let response = await storage().ref('users').child(user?.uid).getDownloadURL();
            avatarUrl = response; // se tiver foto, o avatarUrl agora recebe a foto
        
        } catch(err){
            avatarUrl = null;
        }
        //////////////////////////////////////

        await firestore().collection('posts')
        .add({ // ele gera automaticamente um id único para o post
            created: new Date(),
            title: title,
            content: post,
            autor:  user.nome,
            likes: 0,
            avatarUrl,
            userId: user.uid,
        }) 
        .then( () => {
            setPost('');
            //console.log('Post criado com sucesso');
            //navigation.navigate('Home'); assim navega tanto para home como para onde eu quiser
            navigation.goBack(); //assim volta para a tela anterior
        } )
        .catch ( error => {
            console.log(error)
        })

    }

    return (
        <TouchableWithoutFeedback
            onPress={ Keyboard.dismiss() }
        >   
            <Container>

                <InputTitle
                    placeholder="Titúlo"
                    placeholderTextColor='#d1d1d1'
                    
                    multiline={true}
                    autoCorrect={false}
                    maxLength={80}

                    value={title}
                    onChangeText={ (text) => setTitle(text) }

                    ref={inputRef}
                />

                <Input
                    style={{textAlignVertical: 'top'}}
                    placeholder="O que deseja compartilhar hoje?"
                    placeholderTextColor='#d1d1d1'

                    multiline={true}
                    autoCorrect={false}
                    //maxLength={200}


                    value={post}
                    onChangeText={ (text) => setPost(text) }

                />

                <Photo>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>alert('clicou')}
                    >
                        <MaterialCommunityIcons name='image' size={30} color='#fff' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>alert('clicou')}
                    >
                        <MaterialCommunityIcons name='camera' size={30} color='#fff' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>alert('clicou')}
                    >
                        <MaterialCommunityIcons name='sync' size={30} color='#fff' />
                    </TouchableOpacity>
                </Photo>

            </Container>
            
        </TouchableWithoutFeedback>
    )
}