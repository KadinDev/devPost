import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const AreaInput = styled.View`
    flex-direction: row;
    margin: 10px;
    background-color: #404349;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
`;

export const Input = styled.TextInput`
    width: 90%;
    background-color: #404349;
    height: 50px;
    padding-left: 8px;
    font-size: 16px;
    color: #fff;
`;

export const List = styled.FlatList`
    flex: 1;
`;