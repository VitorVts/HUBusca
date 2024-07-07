import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import UserProfile from '../components/UserProfile';

interface UserData {
  name: string;
  login: string;
  location: string;
  avatar_url: string;
  id: number;
  followers: number;
  public_repos: number;
}

const Stack2Screen: React.FC = () => {
  const [recentSearches, setRecentSearches] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const renderUserItem = ({ item }: { item: UserData }) => {
    return (
      <TouchableOpacity onPress={() => navigateToProfile(item.login)}>
        <UserProfile
          name={item.name}
          login={item.login}
          location={item.location}
          avatar_url={item.avatar_url}
          followers={item.followers}
          public_repos={item.public_repos}
        />
      </TouchableOpacity>
    );
  };

  const navigateToProfile = (username: string) => {
    // Navegar para a tela de perfil com o usuário selecionado
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Searches:</Text>
      <FlatList
        data={recentSearches}
        keyExtractor={(item) => item.login}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default Stack2Screen;
