// navigation/MainStack.tsx
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';

const MainStack = createStackNavigator();

const MainStackScreen: React.FC = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Main" component={MainScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
