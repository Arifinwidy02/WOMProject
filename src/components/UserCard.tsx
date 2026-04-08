import React from 'react';
import { View } from 'react-native';
import { Avatar, Card, Text, List, Divider } from 'react-native-paper';
import { FetchUserType } from '../types/fetchUser';

interface UserCardProps {
  user: FetchUserType;
  isDetail?: boolean;
  onPress?: () => void;
}

export const UserCard = ({ user, isDetail, onPress }: UserCardProps) => {
  return (
    <Card
      onPress={onPress}
      style={{
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        marginTop: isDetail ? 20 : 8,
        elevation: isDetail ? 0 : 1,
      }}
    >
      <View
        style={{
          flexDirection: isDetail ? 'column' : 'row',
          alignItems: 'center',
          padding: isDetail ? 20 : 16,
        }}
      >
        <Avatar.Image size={isDetail ? 100 : 50} source={{ uri: user.image }} />

        <View
          style={{
            marginLeft: isDetail ? 0 : 16,
            marginTop: isDetail ? 10 : 0,
            alignItems: isDetail ? 'center' : 'flex-start',
          }}
        >
          <Text variant={isDetail ? 'headlineSmall' : 'titleMedium'}>
            {user.firstName} {user.lastName}
          </Text>
          <Text variant="bodyMedium" style={{ color: 'grey' }}>
            {user.email}
          </Text>
        </View>
      </View>

      {isDetail && (
        <Card.Content style={{ marginTop: 10 }}>
          <Divider style={{ marginVertical: 10 }} />

          <List.Item
            title="Job Title"
            description={user.company?.title || 'N/A'}
            left={props => <List.Icon {...props} icon="briefcase" />}
          />

          <List.Item
            title="Phone"
            description={user.phone || 'N/A'}
            left={props => <List.Icon {...props} icon="phone" />}
          />

          <List.Item
            title="Address"
            description={`${user.address?.address}, ${user.address?.city}`}
            left={props => <List.Icon {...props} icon="map-marker" />}
          />
        </Card.Content>
      )}
    </Card>
  );
};
