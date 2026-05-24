import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MessagesScreen = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      user: 'أحمد محمد',
      avatar: '👨',
      lastMessage: 'مرحبا كيف حالك؟',
      timestamp: 'الآن',
      unread: true,
    },
    {
      id: 2,
      user: 'فاطمة علي',
      avatar: '👩',
      lastMessage: 'شكرا لك!',
      timestamp: 'قبل ساعة',
      unread: false,
    },
    {
      id: 3,
      user: 'علي حسن',
      avatar: '👨',
      lastMessage: 'نعم، أوافق',
      timestamp: 'أمس',
      unread: false,
    },
  ]);

  const renderChat = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.chatContent}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        <View style={styles.chatDetails}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text
            style={[
              styles.lastMessage,
              item.unread && styles.lastMessageUnread,
            ]}
          >
            {item.lastMessage}
          </Text>
        </View>
      </View>
      <View style={styles.chatRight}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الرسائل</Text>
        <TouchableOpacity>
          <Icon name="pencil-box-outline" size={24} color="#FF1493" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="ابحث عن محادثة..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Chats List */}
      <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#000',
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chatContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 40,
    marginRight: 12,
  },
  chatDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  lastMessage: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  lastMessageUnread: {
    color: '#333',
    fontWeight: '500',
  },
  chatRight: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF1493',
  },
});

export default MessagesScreen;
