// navigation/MainStack.tsx
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import Stack1Screen from '../screens/Stack1Screen';
import Stack2Screen from '../screens/Stack2Screen';

const MainStack = createStackNavigator();

const MainStackScreen: React.FC = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Main" component={MainScreen} />
      <MainStack.Screen name="Stack1" component={Stack1Screen} />
      <MainStack.Screen name="Stack2" component={Stack2Screen} />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
