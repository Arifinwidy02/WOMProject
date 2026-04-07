import React, { useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import { Avatar, Button, List, Text } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import { fetchUsers, User } from '../../api/userApi';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const HomeScreen = () => {
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

  const renderItem = (item: { item: User }) => {
    const user = item.item;
    return (
      <List.Item
        title={`${user.firstName} ${user.lastName}`}
        description={user.email}
        left={props => (
          <Avatar.Image {...props} size={50} source={{ uri: user.image }} />
        )}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          marginBottom: 10,
          borderRadius: 5,
        }}
        onPress={() => console.log('press bro', user.id)}
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
