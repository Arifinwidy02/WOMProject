import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { Icon, IconButton } from 'react-native-paper';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const { userToken, isLoading, logout } = useContext(AuthContext);
  const isLoggedIn = !!userToken;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => {
              return (
                <IconButton
                  icon="logout"
                  iconColor="red"
                  size={24}
                  onPress={logout}
                />
              );
            },
          }}
        />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};
