import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'أحمد محمد', username: '@ahmed_m', avatar: '👨', followers: 1234 },
    { id: 2, name: 'فاطمة علي', username: '@fatima_ali', avatar: '👩', followers: 5678 },
    { id: 3, name: 'علي حسن', username: '@ali_hassan', avatar: '👨', followers: 2345 },
    { id: 4, name: 'ليلى محمود', username: '@layla_mahmoud', avatar: '👩', followers: 3456 },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUser = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userAvatar}>{item.avatar}</Text>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userUsername}>{item.username}</Text>
          <Text style={styles.userFollowers}>{item.followers} متابع</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>متابعة</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={22} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="ابحث عن مستخدمين..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* Results */}
      {searchQuery.length > 0 ? (
        <FlatList
          data={filteredUsers}
          renderItem={renderUser}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
        />
      ) : (
        <View style={styles.emptyState}>
          <Icon name="magnify" size={60} color="#ddd" />
          <Text style={styles.emptyText}>ابدأ البحث عن مستخدمين</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    fontSize: 40,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  userUsername: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  userFollowers: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#FF1493',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 15,
  },
});

export default SearchScreen;
