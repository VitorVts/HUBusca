import * as React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
  onSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Search GitHub users"
      />
      <Button title="Search" onPress={onSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    padding: 5,
  },
});

export default SearchBar;
