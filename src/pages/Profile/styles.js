import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: #353840;
`;

export const UploadButton = styled.TouchableOpacity`
    margin-top: 20%;
    background-color: #fff;
    width: 165px;
    height: 165px;
    border-radius: 90px;
    justify-content: center;
    align-items: center;
    z-index: 5;
`;

export const UploadText = styled.Text`
    z-index: 6;
    position: absolute;
    font-size: 55px;
    color: #e52246;
    opacity: 0.7;
`;

export const Avatar = styled.Image`
    width: 160px;
    height: 160px;
    border-radius: 80px;
    opacity: 0.9;
`;

export const Name = styled.Text`
    margin: 20px 20px 0;
    font-size: 28px;
    color: #fff;
    font-weight: bold;
`;

export const Email = styled.Text`
    margin-bottom: 10px;
    font-size: 20px;
    color: #999;
    font-style: italic;
`;

export const Button = styled.TouchableOpacity`
    margin-top: 15px;
    align-items: center;
    justify-content: center;
    background-color: ${ props => props.bg } ;
    width: 80%;
    height: 50px;
    border-radius: 5px;
`;

export const ButtonText = styled.Text`
    font-size: 20px;
    color: ${ props => props.color } ;
    font-style: italic;
`;

export const ModalContainer = styled.KeyboardAvoidingView`
    width: 100%;
    height: 50%;
    background-color: #fff;
    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: 0;
`;

export const ButtonBack = styled.TouchableOpacity`
    position: absolute;
    top: 15px;
    right: 15px;
    flex-direction: row;
`;

export const Input = styled.TextInput`
    width: 80%;
    height: 50px;
    background-color: #ddd;
    border-radius: 5px;
    padding: 10px;
    font-size: 20px;
    text-align: center;
`;