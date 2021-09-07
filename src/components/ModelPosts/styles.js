import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
`;

export const ContainerUser = styled.View`
    background-color: #f1f1f1;
    height: 100%;
    width: 100%;
`;

export const ScrollContent = styled.ScrollView`

`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    padding: ${RFValue(15)}px;
    align-items: center;
    justify-content: space-between;
    background-color: #353840;
`;

export const ButtonCloseModal = styled.TouchableOpacity``;

export const NameUser = styled.Text`
    color: #fff;
    font-size: ${RFValue(22)}px;
    margin-left: ${RFValue(10)}px;
`
export const ButtonNavigationUser = styled.TouchableOpacity``;

export const Avatar = styled.Image`
    width: ${RFValue(30)}px;
    height: ${RFValue(30)}px;
    border-radius: 50px;
`;

export const Content = styled.View`
    padding: ${RFValue(10)}px;
`;

export const TitlePost = styled.Text`
    text-align: center;
    font-size: ${RFValue(22)}px;
    font-weight: 500;
    margin-bottom: 20px;
`;

export const ContentPost = styled.Text`
    font-size: ${RFValue(18)}px;
    line-height: 22px;
    color: #111;
`;