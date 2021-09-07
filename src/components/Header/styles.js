import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.SafeAreaView`
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #353840;
    border-bottom-color: #888;
    border-bottom-width: 0.5px;
    padding-top: ${RFValue(10)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(27)}px;
    color: #FFF;
    font-weight: bold;
    padding-bottom: ${RFValue(15)}px;
`;
