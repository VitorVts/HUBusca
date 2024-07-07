import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

interface UserData {
  name: string;
  login: string;
  location: string | null;
  avatar_url: string;
  id: number;
  followers: number;
  public_repos: number;
}

const Recentes: React.FC = () => {
  const [recentSearches, setRecentSearches] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const recentSearchesString = await AsyncStorage.getItem('@recentSearches');
      if (recentSearchesString !== null) {
        const parsedRecentSearches: UserData[] = JSON.parse(recentSearchesString);
        setRecentSearches(parsedRecentSearches);
      }
    } catch (error) {
      setError('Failed to load recent searches');
    } finally {
      setLoading(false);
    }
  };

  const navigateToProfile = (username: string) => {
    navigation.navigate('Profile', { username });
  };

  const renderUserItem = ({ item }: { item: UserData }) => {
    return (
      <TouchableOpacity onPress={() => navigateToProfile(item.login)} style={styles.card}>
        <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
        <UserInfo>
          <Row>
            <Label>Nome:</Label>
            <Value>{item.name}</Value>
          </Row>
          <Row>
            <Label>Nickname:</Label>
            <Value>@{item.login}</Value>
          </Row>
          <Row>
            <Label>Localização:</Label>
            <Value>{item.location ?? 'Não informado'}</Value>
          </Row>
          <Row>
            <Label>Seguidores:</Label>
            <Value>{item.followers}</Value>
          </Row>
          <Row>
            <Label>Repositórios Públicos:</Label>
            <Value>{item.public_repos}</Value>
          </Row>
        </UserInfo>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <PurpleContainer>
      <Title>Recent Searches:</Title>
      <FlatList
        data={recentSearches}
        keyExtractor={(item) => item.login}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContainer}
      />
    </PurpleContainer>
  );
};

const PurpleContainer = styled.View`
  flex: 1;
  background-color: #6a1b9a;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
});

const UserInfo = styled.View`
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px; 
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #6a1b9a; 
`;

const Value = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

const ErrorText = styled.Text`
  color: red;
  text-align: center;
`;

export default Recentes;
