// aqui está todas as rotas que a pessoa vai ter quando estiver logado
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { Search } from '../pages/Search';
import { NewPost } from '../pages/NewPost';
import { PostsUser } from '../pages/PostsUser';

//lembrando se o app ficar fechando o problema é no json baixado que está bugado
import Lottie from 'lottie-react-native';

const Tab = createBottomTabNavigator();//o menu em baixo, os bottom-tab
const Stack = createStackNavigator(); //navegação em pilha

// é uma navegação em pilha da Stack
// navageção stack é quando tem aquele header que vem com a setinha para voltar

// nessa function passo 3 telas, 3 navegações, Home é a principal, através da Home, vou ter
//o acesso as outras duas
function StackScreen(){
    return (
        <Stack.Navigator>

            <Stack.Screen 
                name='Home' 
                component={Home} 
                options={{ headerShown: false }} 
            />
            
            <Stack.Screen 
                name="NewPost" 
                component={NewPost} 
                options={{
                    title: 'Novo Post', 
                    headerTintColor: '#fff', //cor da font no header
                    headerStyle: {
                        backgroundColor: '#36393f'
                    }
                }} 
            />
            
            <Stack.Screen 
                name="PostsUser" 
                component={PostsUser} 
                options={{ 
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#36393f'
                    }
                }} 
            />

        </Stack.Navigator>
    )
}

export function AppRoutes(){
    
    return (
        <Tab.Navigator

            screenOptions={ ({route}) => ({
                tabBarActiveTintColor: '#fff',
                tabBarHideOnKeyboard: true, //quando teclado abrir tabBar fica atrás do teclado
                tabBarShowLabel: true,// tira ou coloca o nome em baixo do icon
                tabBarLabelStyle: {
                    fontSize: RFValue(17),
                    marginBottom: RFValue(3),
                },

                tabBarStyle: {
                    backgroundColor: '#202225',
                    height: RFPercentage(10),
                    paddingTop: 4,
                    paddingBottom: 4,
                    borderTopWidth: 0
                },

                tabBarIcon: ({ focused, color, size, }) => {
                    let iconName; //- assim estava quando era somente os icones normal do Ionicons na tab-bottom
                    // agora ficou o filePath (lottie animado)
                    //let filePath;

                    switch (route.name){
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            //filePath = require('../assets/lottie/home.json')
                        break;

                        case 'Search':
                            iconName = focused ? 'search' : 'search-outline';
                            //filePath = require('../assets/lottie/search.json')
                        break;

                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            //filePath = require('../assets/lottie/profile.json')
                        break;
                    }
                    
                    /*return <Lottie 
                        style={{
                            height: RFValue(60),
                            marginTop: RFValue(3)
                        }} 
                        source={filePath} 
                        autoPlay={focused} 
                    />
                    */

                    return ( 
                        <Ionicons 
                            name={ iconName } 
                            size={RFValue(25)} 
                            color={ color}
                        />
                    )

                }
            }) }

        >
            
            <Tab.Screen name='Home' component={StackScreen} options={{ headerShown: false }}
            // agora no component ao invés de passar o Home passa a function StackScreen
            />

            <Tab.Screen name='Search' component={Search} options={{ headerShown: false }} />
            
            <Tab.Screen  name='Profile'component={Profile} options={{ headerShown: false }}/>

        </Tab.Navigator>
                
    )
}