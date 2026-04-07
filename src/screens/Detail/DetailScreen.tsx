import React from 'react';
import { ScrollView } from 'react-native';
import { UserCard } from '../../components/UserCard';

export const DetailScreen = ({ route }: any) => {
  const { user } = route.params;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <UserCard user={user} isDetail />
    </ScrollView>
  );
};
