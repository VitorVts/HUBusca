import * as React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Recentes from '../screens/Recentes';
import { RootStackParamList } from '../types'; // Importe o RootStackParamList

const MainStack = createStackNavigator<RootStackParamList>();

const MainStackScreen: React.FC = () => {
  const screenOptions: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: '#6a1b9a',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen
        name="Home"
        component={MainScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="github" size={24} color="white" style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>HUBusca</Text>
            </View>
          ),
        }}
      />
      <MainStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="user" size={24} color="white" style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Usuário</Text>
            </View>
          ),
        }}
      />
      <MainStack.Screen
        name="Recentes"
        component={Recentes}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="search" size={24} color="white" style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Pesquisas Recentes</Text>
            </View>
          ),
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
