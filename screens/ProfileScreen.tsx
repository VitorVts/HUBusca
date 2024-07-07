import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
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

const ProfileScreen: React.FC<Props> = ({ route }) => {
  const { username } = route.params;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUserData(response.data);
      } catch (err) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

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
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ProfileScreen;
