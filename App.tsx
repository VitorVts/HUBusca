import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackScreen from './src/navigation/MainStack';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};

export default App;
