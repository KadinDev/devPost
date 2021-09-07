import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: #36393f;
`;

export const ButtonPost = styled.TouchableOpacity`
    background-color: #202225;
    width: ${RFValue(60)}px;
    height: ${RFValue(60)}px;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 6%;
    right: 6%;
    border-radius: 30;
`;

export const Icon = styled(Feather)``;

export const ListPosts = styled.FlatList`
    flex: 1;
    background-color: #f1f1f1
`;