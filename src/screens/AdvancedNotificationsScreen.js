import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { listenToNotifications } from '../services/notificationsService';
import { useAuth } from '../contexts/AuthContext';

const AdvancedNotificationsScreen = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [groupByType, setGroupByType] = useState(true);

  useEffect(() => {
    if (user) {
      const unsubscribe = listenToNotifications(user.uid, (data) => {
        setNotifications(data);
      });
      return unsubscribe;
    }
  }, [user]);

  const getNotificationIcon = (type) => {
    const icons = {
      like: { name: 'heart', color: '#FF1493' },
      follow: { name: 'account-plus', color: '#007AFF' },
      comment: { name: 'comment', color: '#34C759' },
      share: { name: 'share-variant', color: '#FF9500' },
      mention: { name: 'at', color: '#5AC8FA' },
    };
    return icons[type] || { name: 'bell', color: '#888' };
  };

  const getNotificationMessage = (notification) => {
    const messages = {
      like: t('liked_your_post'),
      follow: t('started_following_you'),
      comment: t('commented_on_your_post'),
      share: t('shared_your_post'),
      mention: t('mentioned_you'),
    };
    return messages[notification.type] || t('new_notification');
  };

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const groupedNotifications = groupByType
    ? {
        likes: filteredNotifications.filter((n) => n.type === 'like'),
        follows: filteredNotifications.filter((n) => n.type === 'follow'),
        comments: filteredNotifications.filter((n) => n.type === 'comment'),
        others: filteredNotifications.filter((n) => !['like', 'follow', 'comment'].includes(n.type)),
      }
    : { all: filteredNotifications };

  const renderNotification = (notification) => {
    const icon = getNotificationIcon(notification.type);
    const message = getNotificationMessage(notification);

    return (
      <TouchableOpacity style={styles(isDark).notificationItem}>
        <View
          style={[
            styles(isDark).notificationIcon,
            { backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0' },
          ]}
        >
          <Icon name={icon.name} size={20} color={icon.color} />
        </View>
        <View style={styles(isDark).notificationContent}>
          <Text style={styles(isDark).notificationUserName}>
            {notification.actionUserName}
          </Text>
          <Text style={styles(isDark).notificationMessage}>{message}</Text>
          <Text style={styles(isDark).notificationTime}>
            {new Date(notification.createdAt?.toDate?.()).toLocaleString()}
          </Text>
        </View>
        {!notification.read && <View style={styles(isDark).unreadDot} />}
      </TouchableOpacity>
    );
  };

  const renderNotificationGroup = (title, items) => {
    if (items.length === 0) return null;

    return (
      <View key={title}>
        <Text style={styles(isDark).groupTitle}>{title}</Text>
        {items.map((notification) => (
          <View key={notification.id}>{renderNotification(notification)}</View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles(isDark).container}>
      {/* Header */}
      <View style={styles(isDark).header}>
        <Text style={styles(isDark).headerTitle}>{t('notifications')}</Text>
        <View style={styles(isDark).headerActions}>
          <TouchableOpacity>
            <Icon name="magnify" size={24} color="#FF1493" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Icon name="cog" size={24} color="#FF1493" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles(isDark).tabsContainer}>
        {[
          { id: 'all', label: t('all') },
          { id: 'like', label: t('likes') },
          { id: 'follow', label: t('follows') },
          { id: 'comment', label: t('comments') },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles(isDark).tab,
              filter === tab.id && styles(isDark).tabActive,
            ]}
            onPress={() => setFilter(tab.id)}
          >
            <Text
              style={[
                styles(isDark).tabLabel,
                filter === tab.id && styles(isDark).tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Toggle Grouping */}
      <View style={styles(isDark).toggleContainer}>
        <TouchableOpacity
          style={styles(isDark).toggleButton}
          onPress={() => setGroupByType(!groupByType)}
        >
          <Icon
            name={groupByType ? 'folder' : 'list'}
            size={18}
            color="#FF1493"
          />
          <Text style={styles(isDark).toggleLabel}>
            {groupByType ? t('grouped') : t('all_list')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {groupByType ? (
          <>
            {renderNotificationGroup(t('likes'), groupedNotifications.likes)}
            {renderNotificationGroup(t('follows'), groupedNotifications.follows)}
            {renderNotificationGroup(t('comments'), groupedNotifications.comments)}
            {renderNotificationGroup(t('other'), groupedNotifications.others)}
          </>
        ) : (
          groupedNotifications.all.map((notification) => (
            <View key={notification.id}>{renderNotification(notification)}</View>
          ))
        )}
        {filteredNotifications.length === 0 && (
          <View style={styles(isDark).emptyContainer}>
            <Icon name="bell-off" size={50} color="#ddd" />
            <Text style={styles(isDark).emptyText}>{t('no_notifications')}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1a1a1a' : '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333' : '#eee',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tabsContainer: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333' : '#eee',
    },
    tab: {
      marginRight: 15,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    tabActive: {
      borderBottomColor: '#FF1493',
    },
    tabLabel: {
      fontSize: 13,
      color: '#999',
      fontWeight: '500',
    },
    tabLabelActive: {
      color: '#FF1493',
      fontWeight: 'bold',
    },
    toggleContainer: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333' : '#eee',
    },
    toggleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    toggleLabel: {
      fontSize: 12,
      color: '#FF1493',
      fontWeight: 'bold',
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#2a2a2a' : '#f0f0f0',
    },
    notificationIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    notificationContent: {
      flex: 1,
    },
    notificationUserName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    notificationMessage: {
      fontSize: 13,
      color: isDark ? '#bbb' : '#666',
      marginTop: 2,
    },
    notificationTime: {
      fontSize: 11,
      color: '#999',
      marginTop: 4,
    },
    unreadDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#FF1493',
      marginLeft: 10,
    },
    groupTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: isDark ? '#999' : '#ccc',
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 16,
      color: '#999',
      marginTop: 15,
    },
  });

export default AdvancedNotificationsScreen;
