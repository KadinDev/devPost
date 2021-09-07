import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    margin-top: ${RFValue(8)}px;
    margin: 8px 2%;
    background-color: #fff;
    padding: ${RFValue(11)}px;
    border-radius: 8px;
    box-shadow: 1px 1px 3px rgba(18,18,18, 0.2);
    elevation: 2;
`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
`;

export const Avatar = styled.Image`
    width: ${RFValue(30)}px;
    height: ${RFValue(30)}px;
    border-radius: 20px;
`;

export const Name = styled.Text`
    margin-left: ${RFValue(10)}px;
    color: #353840;
    font-size: ${RFValue(18)}px;
    font-weight: bold;
`;

export const ContentView = styled.View`
`;

export const ViewMore = styled.TouchableOpacity`
    width: 25%;
    padding: ${RFValue(5)}px 0;
    margin-top: 5px;
    margin-bottom: -10px;
`;

export const Content = styled.Text`
    color: #353840;
    font-size: ${RFValue(16)}px;
`
export const ContentTitle = styled.Text`
    color: #353840;
    font-size: ${RFValue(20)}px;
    font-weight: 500;
`

export const Actions = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: ${RFValue(20)}px 0px ${RFValue(5)}px;
`;

export const ButtonIcon = styled.TouchableOpacity`
    height: ${RFValue(70)}px;
    align-items: center;
    justify-content: center;
    width: 30px;
`;

export const LikeButton = styled.View`
    width: ${RFValue(110)}px;
    height: ${RFValue(35)}px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 5px;

`;

export const Likes = styled.Text`
    color: #202225;
    font-size: ${RFValue(16)}px;
    font-weight: bold;
    text-align: center;
    margin-left: 5px;
`;


export const TimePost = styled.Text`
    margin-right: 5px;
    font-size: ${RFValue(16)}px;
`;