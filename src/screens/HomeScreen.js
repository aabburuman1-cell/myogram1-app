import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const [reels, setReels] = React.useState([
    { id: 1, user: 'أحمد', avatar: '👨', description: 'رحلة جميلة', likes: 234 },
    { id: 2, user: 'فاطمة', avatar: '👩', description: 'يوم مميز', likes: 567 },
    { id: 3, user: 'علي', avatar: '👨', description: 'لحظة رائعة', likes: 345 },
  ]);

  const renderReel = ({ item }) => (
    <View style={styles.reelContainer}>
      {/* Header */}
      <View style={styles.reelHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.avatar}>{item.avatar}</Text>
          <View>
            <Text style={styles.userName}>{item.user}</Text>
            <Text style={styles.timestamp}>منذ ساعة</Text>
          </View>
        </View>
        <Icon name="dots-vertical" size={24} color="#000" />
      </View>

      {/* Video/Content */}
      <View style={styles.reelContent}>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      {/* Footer - Actions */}
      <View style={styles.reelFooter}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="heart-outline" size={24} color="#000" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="comment-outline" size={24} color="#000" />
            <Text style={styles.actionText}>45</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share-outline" size={24} color="#000" />
            <Text style={styles.actionText}>12</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>MyoGram</Text>
        <TouchableOpacity>
          <Icon name="send" size={24} color="#FF1493" />
        </TouchableOpacity>
      </View>

      {/* Stories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} style={styles.storyItem}>
            <View style={styles.storyAvatar}>
              <Text style={styles.storyText}>👤</Text>
            </View>
            <Text style={styles.storyName}>صديق {item}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Reels */}
      <FlatList
        data={reels}
        renderItem={renderReel}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
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
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF1493',
  },
  storiesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FF1493',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  storyText: {
    fontSize: 24,
  },
  storyName: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  reelContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  reelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 32,
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  reelContent: {
    height: 400,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 10,
  },
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  reelFooter: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    fontSize: 12,
    color: '#000',
  },
});

export default HomeScreen;
