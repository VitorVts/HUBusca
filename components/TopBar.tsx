import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import SearchBar from "./SearchBar";
import { Platform } from 'react-native';

interface TopBarProps {
  onNavigateToRecentSearches: () => void;
  searchQuery: string;
  onSearchQueryChange: (text: string) => void;
  onSearchSubmit: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  onNavigateToRecentSearches,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
}) => {
  return (
    <Container>
      <TouchableOpacity onPress={onNavigateToRecentSearches}>
        <Feather name="list" size={24} color="white" />
      </TouchableOpacity>
      <SearchBar
        value={searchQuery}
        onChange={onSearchQueryChange}
        onSearch={onSearchSubmit}
      />
    </Container>
  );
};

const Container = styled.View`
  background-color: #8a2be2; 
  padding-right:10px; 
  padding-left:10px;
  border-radius: 8px;
  margin-bottom: 20px;
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between; 
  ${Platform.OS === 'ios' ? 
    `shadow-color: #000;
     shadow-offset: 0px 2px;
     shadow-opacity: 0.25;
     shadow-radius: 3.84px;` 
    : `elevation: 5;`
  }
`;

export default TopBar;
