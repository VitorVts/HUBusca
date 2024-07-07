import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface UserProfileProps {
  userData: {
    name: string;
    login: string;
    followers: number;
    public_repos: number;
    avatar_url: string;
  };
  onNavigateToProfile: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userData,
  onNavigateToProfile,
}) => {
  return (
    <TouchableOpacity onPress={onNavigateToProfile}>
      <Container>
        <UserInfo>
          <Row>
            <Label>Nome:</Label>
            <Value>{userData.name}</Value>
          </Row>
          <Row>
            <Label>Nickname:</Label>
            <Value>@{userData.login}</Value>
          </Row>
          <Row>
            <Label>Seguidores:</Label>
            <Value>{userData.followers}</Value>
          </Row>
          <Row>
            <Label>Repositórios Públicos:</Label>
            <Value>{userData.public_repos}</Value>
          </Row>
        </UserInfo>
        <Avatar source={{ uri: userData.avatar_url }} />
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled.View`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
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
  color: #8a2be2; 
  margin-bottom: 5px;
  margin-right: 5px;
`;

const Value = styled.Text`
  font-size: 16px;
  color: #333; 
  align-items: center; 
`;

export default UserProfile;
