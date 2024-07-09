import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import TopBar from "../components/TopBar";
import UserProfile from "../components/UserProfile";
import { RootStackParamList } from "../types/RootStackParamList";

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

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const MainScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<UserData[]>([]);

  const navigation = useNavigation<MainScreenNavigationProp>();

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const recentSearchesString = await AsyncStorage.getItem("@recentSearches");
        if (recentSearchesString) {
          setRecentSearches(JSON.parse(recentSearchesString));
        }
      } catch (error) {
        console.error("Erro ao carregar pesquisas recentes", error);
      }
    };

    loadRecentSearches();
  }, []);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await axios.get<UserData>(`https://api.github.com/users/${searchQuery}`);
      const userDataResponse = response.data;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData: UserData = {
        name: userDataResponse.name,
        login: userDataResponse.login,
        location: userDataResponse.location || "",
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
      setError("Erro ao carregar dados do Usuário");
    } finally {
      setLoading(false);
    }
  };

  const goToProfileScreen = (username: string) => {
    navigation.navigate("Profile", { username });
  };

  const navigateToRecentSearches = () => {
    navigation.navigate("Recentes");
  };

  const saveUserData = async (userData: UserData) => {
    try {
      await AsyncStorage.setItem("@userData", JSON.stringify(userData));
      console.log("Dados do usuário salvos com sucesso no AsyncStorage.");
    } catch (error) {
      console.error("Erro ao salvar os dados do usuário no AsyncStorage:", error);
    }
  };

  const saveRecentSearch = async (userData: UserData) => {
    try {
      const recentSearchesString = await AsyncStorage.getItem("@recentSearches");
      let updatedSearches: UserData[] = [];

      if (recentSearchesString !== null) {
        updatedSearches = JSON.parse(recentSearchesString);
      }

      const existingIndex = updatedSearches.findIndex((user) => user.id === userData.id);

      if (existingIndex !== -1) {
        updatedSearches.splice(existingIndex, 1);
      }

      updatedSearches.unshift(userData);
      updatedSearches = updatedSearches.slice(0, 5);

      await AsyncStorage.setItem("@recentSearches", JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error("Erro ao salvar a pesquisa recente no AsyncStorage:", error);
    }
  };

  const { height } = Dimensions.get("window");

  return (
    <Container style={{ minHeight: height }}>
      <TopBar
        onNavigateToRecentSearches={navigateToRecentSearches}
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchChange}
        onSearchSubmit={handleSearch}
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <ErrorText>{error}</ErrorText>}
      
      {userData && (
        <UserProfile
          userData={userData}
          onNavigateToProfile={() => goToProfileScreen(userData.login)}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #8a2be2;
  padding: 20px;
  justify-content: flex-start;
`;

const ErrorText = styled.Text`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

export default MainScreen;
