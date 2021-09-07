import styled from 'styled-components';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: #404349;
`;

export const InputTitle = styled.TextInput`
    background-color: transparent;
    margin: ${RFValue(10)}px ${RFValue(10)}px ${RFValue(1)}px;
    font-size: ${RFValue(20)}px;
    color: #fff;
    border-bottom-width: 0.2px;
    border-color: #d1d1d1;
    font-weight: bold;
`;

export const Input = styled.TextInput`
    background-color: transparent;
    margin: ${RFValue(10)}px;
    font-size: ${RFValue(20)}px;
    color: #fff;
    border-radius: 4px;
    padding: 10px;
    flex: 1;
`;

export const Button = styled.TouchableOpacity`
    background-color: #418cfd;
    margin-right: 7px;
    border-radius: 4px;
    padding: 5px 12px;
    align-items: center;
    justify-content: center;

`;

export const ButtonText = styled.Text`
    color: #fff;
    font-size: 16px;
`;

export const Photo = styled.View`
    margin-bottom: 25px;
    width: 30%;
    position: absolute;
    bottom: 0;
    right: ${RFValue(15)}px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between
`;