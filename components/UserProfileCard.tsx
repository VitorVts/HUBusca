import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  name: string;
  login: string;
  location: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
  onPress?: () => void;
}

const UserProfileCard: React.FC<Props> = ({
  name,
  login,
  location,
  avatar_url,
  followers,
  public_repos,
  onPress
}) => {
  return (
    <Container onPress={onPress}>
      <Avatar source={{ uri: avatar_url }} />
      <UserInfo>
        <Row>
          <Label>Nome:</Label>
          <Value>{name}</Value>
        </Row>
        <Row>
          <Label>Nickname:</Label>
          <Value>@{login}</Value>
        </Row>
        <Row>
          <Label>Localização:</Label>
          <Value>{location}</Value>
        </Row>
        <Row>
          <Label>Seguidores:</Label>
          <Value>{followers}</Value>
        </Row>
        <Row>
          <Label>Repositórios Públicos:</Label>
          <Value>{public_repos}</Value>
        </Row>
      </UserInfo>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 20px;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
`;

const Value = styled.Text`
  font-size: 16px;
`;

export default UserProfileCard;
