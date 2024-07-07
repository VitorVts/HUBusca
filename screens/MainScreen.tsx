// screens/MainScreen.tsx
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type MainScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Main Screen</Text>
      <Button title="Go to Stack 1" onPress={() => navigation.navigate('Stack1')} />
      <Button title="Go to Stack 2" onPress={() => navigation.navigate('Stack2')} />
    </View>
  );
};

export default MainScreen;
