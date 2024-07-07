import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type UserProfileProps = {
  name: string;
  login: string;
  location: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
};

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  login,
  location,
  avatar_url,
  followers,
  public_repos,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar_url }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <Text>{login}</Text>
      <Text>{location}</Text>
      <Text>Followers: {followers}</Text>
      <Text>Public Repos: {public_repos}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default UserProfile;
