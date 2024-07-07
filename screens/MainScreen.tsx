// screens/MainScreen.tsx
import React, { useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import UserProfile from '../components/UserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

const MainScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<UserData[]>([]);

  const navigation = useNavigation();

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await axios.get(`https://api.github.com/users/${searchQuery}`);
      const userDataResponse = response.data;

      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData: UserData = {
        name: userDataResponse.name,
        login: userDataResponse.login,
        location: userDataResponse.location,
        avatar_url: userDataResponse.avatar_url,
        id: userDataResponse.id,
        followers: userDataResponse.followers,
        public_repos: userDataResponse.public_repos,
        repos_url: userDataResponse.repos_url,
      };

      setUserData(userData);
      saveUserData(userData);
      saveRecentSearch(userData);
    } catch (err) {
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const goToProfileScreen = (username: string) => {
  navigation.navigate('Profile', { username });
};



  const saveUserData = async (userData: UserData) => {
    try {
      await AsyncStorage.setItem('@userData', JSON.stringify(userData));
      console.log('Dados do usuário salvos com sucesso no AsyncStorage.');
    } catch (error) {
      console.error('Erro ao salvar os dados do usuário no AsyncStorage:', error);
    }
  };

  const saveRecentSearch = async (userData: UserData) => {
    try {
      const recentSearchesString = await AsyncStorage.getItem('@recentSearches');
      let updatedSearches: UserData[] = [];

      if (recentSearchesString !== null) {
        updatedSearches = JSON.parse(recentSearchesString);
      }

      updatedSearches.unshift(userData);
      updatedSearches = updatedSearches.slice(0, 5);

      await AsyncStorage.setItem('@recentSearches', JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error('Erro ao salvar a pesquisa recente no AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      {userData && (
        <TouchableOpacity onPress={() => goToProfileScreen(userData.login)}>
          <UserProfile
            name={userData.name}
            login={userData.login}
            location={userData.location}
            avatar_url={userData.avatar_url}
            followers={userData.followers}
            public_repos={userData.public_repos}
          />
        </TouchableOpacity>
      )}
      <SearchBar value={searchQuery} onChange={handleSearchChange} onSearch={handleSearch} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a2be2',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MainScreen;
