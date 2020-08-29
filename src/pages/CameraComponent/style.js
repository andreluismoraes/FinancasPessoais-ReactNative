import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const FlipBack = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
`;

export const Preview = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #00b94a;
  width: 45%;
  height: 45px;
  border-radius: 7px;
  margin-top: 10px;
  margin-right: 5px;
`;

export const ButtonText = styled.Text`
  font-size: 21px;
  font-weight: bold;
  color: #fff;
`;

export const ModalView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const FlipView = styled.View`
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const ButtonFlip = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #00b94a;
  width: 60px;
  height: 60px;
  border-radius: 25px;
  margin-top: 10px;
  margin-right: 5px;
`;
