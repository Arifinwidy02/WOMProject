import { StackNavigationProp } from '@react-navigation/stack';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { fetchUsers } from '../../api/userApi';
import { UserCard } from '../../components/UserCard';
import { AuthContext } from '../../context/AuthContext';
import { FetchUserType } from '../../types/fetchUser';
import { RootStackParamList } from '../../types/navigation';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export const HomeScreen = ({ navigation }: Props) => {
  const { userEmail } = useContext(AuthContext);
  const {
    data: users,
    isLoading,
    error,
    isError,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['user'],
    queryFn: ({ pageParam = 0 }) => fetchUsers({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextCursor,
  });

  const allUsers = users?.pages.flatMap(page => page.users) || [];

  const renderItem = (item: { item: FetchUserType }) => {
    const user = item.item;
    return (
      <UserCard
        user={user}
        onPress={() => navigation.navigate('Detail', { user: user })}
      />
    );
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
        <Text variant="bodyMedium">Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Failed to retrieve data.</Text>
        <Button
          mode="contained"
          onPress={() => refetch()}
          style={{ marginTop: 10 }}
        >
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          padding: 10,
          marginBottom: 4,
          width: '100%',
        }}
      >
        <Text variant="titleMedium">Logged In as: {userEmail}</Text>
      </View>
      <FlatList
        data={allUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={refetch}
          />
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.25}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>No users found.</Text>
          </View>
        }
      />
    </View>
  );
};
