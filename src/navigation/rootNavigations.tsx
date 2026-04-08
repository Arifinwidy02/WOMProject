import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { DetailScreen } from '../screens/Detail/DetailScreen';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const { userToken, isLoading, logout } = useContext(AuthContext);
  const isLoggedIn = !!userToken;
  const theme = useTheme();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.colors.primary,
        headerStyle: {
          backgroundColor: theme.colors.surface,
          elevation: 2,
          shadowOpacity: 0.1,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.colors.onSurface,
        },
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => {
                return (
                  <IconButton
                    icon="logout-variant"
                    iconColor={theme.dark ? '#F2B8B5' : '#B3261E'}
                    size={24}
                    onPress={logout}
                  />
                );
              },
            }}
          />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
