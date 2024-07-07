import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Linking } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import styled from 'styled-components/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type ProfileScreenRouteProp = RouteProp<{ Profile: { username: string } }, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};

interface UserData {
  name: string;
  login: string;
  location: string;
  avatar_url: string;
  id: number;
  followers: number;
  public_repos: number;
  repos_url: string;
}

interface Repository {
  id: number;
  name: string;
  language: string;
  description: string;
  html_url: string;
  created_at: string;
  updated_at: string;
}

const ProfileScreen: React.FC<Props> = ({ route }) => {
  const { username } = route.params;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        const userData: UserData = userResponse.data;
        setUserData(userData);

        const reposResponse = await axios.get(userData.repos_url);
        const reposData: Repository[] = reposResponse.data;
        setRepositories(reposData);
      } catch (err) {
        setError('Falha ao carregar dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleRepositoryPress = (url: string) => {
    Linking.openURL(url);
  };

  if (loading) {
    return <LoadingContainer><ActivityIndicator size="large" color="#8a2be2" /></LoadingContainer>;
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
  };

  return (
    <Container>
      {userData && (
        <>
          <ProfileCard>
            <Avatar source={{ uri: userData.avatar_url }} />
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
                <Label>Localização:</Label>
                <Value>{userData.location || 'Não informado'}</Value>
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
          </ProfileCard>
          <SectionTitle>Repositórios:</SectionTitle>
          <RepositoryList
            data={repositories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RepositoryCard onPress={() => handleRepositoryPress(item.html_url)}>
                <RepositoryName>{item.name}</RepositoryName>
                <RepositoryInfo>Linguagem: {item.language}</RepositoryInfo>
                <RepositoryInfo>Descrição: {item.description}</RepositoryInfo>
                <RepositoryInfo>Criado em: {formatDate(item.created_at)}</RepositoryInfo>
                <RepositoryInfo>Última atualização: {formatDate(item.updated_at)}</RepositoryInfo>
              </RepositoryCard>
            )}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #8a2be2;
  padding: 20px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ProfileCard = styled.View`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 20px;
`;

const UserInfo = styled.View`
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
  color: #8a2be2;
`;

const Value = styled.Text`
  font-size: 16px;
  color: #333;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const RepositoryList = styled.FlatList`
  flex: 1;
`;

const RepositoryCard = styled.TouchableOpacity`
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const RepositoryName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #8a2be2;
  margin-bottom: 5px;
`;

const RepositoryInfo = styled.Text`
  font-size: 14px;
  color: #333;
`;

const ErrorText = styled.Text`
  color: red;
  text-align: center;
`;

export default ProfileScreen;
