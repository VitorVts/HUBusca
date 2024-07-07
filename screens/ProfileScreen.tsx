import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList, TouchableOpacity, Linking } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';

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
  html_url: string; // URL do repositório no GitHub
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
        // Busca dados básicos do usuário
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        const userData: UserData = userResponse.data;
        setUserData(userData);

        // Busca os repositórios públicos do usuário
        const reposResponse = await axios.get(userData.repos_url);
        const reposData: Repository[] = reposResponse.data;
        setRepositories(reposData);
      } catch (err) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleRepositoryPress = (url: string) => {
    Linking.openURL(url); // Abre o link do repositório no navegador padrão do dispositivo
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {userData && (
        <>
          <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
          <Text style={styles.name}>{userData.name}</Text>
          <Text>{userData.login}</Text>
          <Text>{userData.location}</Text>
          <Text>Followers: {userData.followers}</Text>
          <Text>Public Repos: {userData.public_repos}</Text>
          <Text style={styles.sectionTitle}>Repositories:</Text>
          <FlatList
            data={repositories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleRepositoryPress(item.html_url)}>
                <View style={styles.repositoryItem}>
                  <Text style={styles.repositoryName}>{item.name}</Text>
                  <Text>Language: {item.language}</Text>
                  <Text>Description: {item.description}</Text>
                  <Text>Created at: {item.created_at}</Text>
                  <Text>Last updated: {item.updated_at}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.repositoryList}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  repositoryList: {
    flexGrow: 1,
    width: '100%',
  },
  repositoryItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  repositoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ProfileScreen;
