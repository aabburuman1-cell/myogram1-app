import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const [userProfile] = React.useState({
    name: 'أحمد محمد',
    username: '@ahmed_m',
    bio: 'مصور وعاشق للسفر ✈️',
    followers: 1234,
    following: 567,
    posts: 89,
  });

  const [posts] = React.useState([
    { id: 1, title: 'رحلة الصيف' },
    { id: 2, title: 'لحظة جميلة' },
    { id: 3, title: 'غروب الشمس' },
    { id: 4, title: 'الطبيعة الخضراء' },
    { id: 5, title: 'الشاطئ' },
    { id: 6, title: 'المدينة' },
  ]);

  const renderPost = ({ item }) => (
    <View style={styles.postGrid}>
      <View style={styles.post}>
        <Text style={styles.postText}>📸</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>الملف الشخصي</Text>
          <TouchableOpacity>
            <Icon name="cog" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.largeAvatar}>👨</Text>
          </View>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileUsername}>{userProfile.username}</Text>
          <Text style={styles.profileBio}>{userProfile.bio}</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.posts}</Text>
              <Text style={styles.statLabel}>منشور</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.followers}</Text>
              <Text style={styles.statLabel}>متابع</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.following}</Text>
              <Text style={styles.statLabel}>يتابع</Text>
            </View>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>تعديل الملف الشخصي</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tab}>
            <Icon name="grid" size={24} color="#FF1493" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Icon name="bookmark" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Icon name="heart" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        <View style={styles.postsGrid}>
          {posts.map((post) => (
            <TouchableOpacity key={post.id} style={styles.postItem}>
              <Text style={styles.postPlaceholder}>📷</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  profileSection: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  largeAvatar: {
    fontSize: 80,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  profileUsername: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  profileBio: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#eee',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#FF1493',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#FF1493',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 12,
  },
  tab: {
    padding: 10,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 2,
  },
  postItem: {
    width: '33.33%',
    aspectRatio: 1,
    margin: 2,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postPlaceholder: {
    fontSize: 40,
  },
});

export default ProfileScreen;
