import styled from 'styled-components/native';
import { RFValue, RFPercentage} from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: #36393F;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    color: #fff;
    font-size: ${RFValue(50)}px;
    font-weight: bold;
    font-style: italic;
`

export const Input = styled.TextInput`
    width: ${RFValue(80)}%;
    background-color: #eee;
    padding: ${RFValue(10)}px;
    margin-top: 10px;
    border-radius: 7px;
    font-size: ${RFValue(17)}px;
`;

export const Button = styled.TouchableOpacity`
    width: ${RFValue(80)}%;
    background-color: #418cfd;
    margin-top: 10px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(10)}px;
    height: ${RFValue(50)}px;
`;

export const TextButton = styled.Text`
    color: white;
    font-size: ${RFValue(20)}px;
`;

export const SignUpButton = styled.TouchableOpacity`
    width: ${RFValue(100)}%;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
`;

export const SignUpText = styled.Text`
    color: #ddd;
    font-size: ${RFValue(15)}px
`;