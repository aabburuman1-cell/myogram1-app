import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      user: 'أحمد محمد',
      action: 'أعجب بمنشورك',
      avatar: '👨',
      timestamp: 'منذ دقائق',
      type: 'like',
    },
    {
      id: 2,
      user: 'فاطمة علي',
      action: 'بدأت المتابعة لك',
      avatar: '👩',
      timestamp: 'منذ ساعة',
      type: 'follow',
    },
    {
      id: 3,
      user: 'علي حسن',
      action: 'علق على منشورك',
      avatar: '👨',
      timestamp: 'أمس',
      type: 'comment',
    },
    {
      id: 4,
      user: 'ليلى محمود',
      action: 'أعجبت بمنشورك',
      avatar: '👩',
      timestamp: 'أمس',
      type: 'like',
    },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return 'heart';
      case 'follow':
        return 'account-plus';
      case 'comment':
        return 'comment';
      default:
        return 'bell';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'like':
        return '#FF1493';
      case 'follow':
        return '#007AFF';
      case 'comment':
        return '#34C759';
      default:
        return '#FF1493';
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Text style={styles.avatar}>{item.avatar}</Text>
      <View style={styles.notificationContent}>
        <View>
          <Text style={styles.notificationText}>
            <Text style={styles.userName}>{item.user}</Text>
            {' '}
            {item.action}
          </Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
      <Icon
        name={getNotificationIcon(item.type)}
        size={20}
        color={getIconColor(item.type)}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الإشعارات</Text>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    fontSize: 40,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  userName: {
    fontWeight: 'bold',
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default NotificationsScreen;
