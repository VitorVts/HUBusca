import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons'; 

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  onSearch: () => void;
}

const SearchBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 20px;
  
`;

const SearchInput = styled.TextInput`
  flex: 1;
  background-color: white;
  padding: 10px;
  border-radius: 8px; 
  font-size: 20px; 
  color: #333; 
`;

const SearchButton = styled.TouchableOpacity`
  padding: 12px; 
  border-radius: 8px; 
  margin-left: 10px; 
`;

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  return (
    <SearchBarContainer>
      <SearchInput
        value={value}
        onChangeText={onChange}
        placeholder="Buscar Usuário do GitHub"
        placeholderTextColor="#ccc"
      />
      <SearchButton onPress={onSearch}>
        <Feather name="search" size={24} color="white" />
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
