import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ProgressViewIOS,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../contexts/AuthContext';
import { uploadReel } from '../services/reelsService';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const UploadReelScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [videoUri, setVideoUri] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('none');

  const filters = [
    { id: 'none', name: t('no_filter'), icon: 'format-clear', color: '#888' },
    { id: 'vintage', name: t('vintage'), icon: 'image-filter-vintage', color: '#D4A574' },
    { id: 'sepia', name: t('sepia'), icon: 'image-filter', color: '#8B7355' },
    { id: 'grayscale', name: t('grayscale'), icon: 'image-filter-black-and-white', color: '#666' },
    { id: 'blur', name: t('blur'), icon: 'blur', color: '#9999FF' },
  ];

  const handleSelectVideo = () => {
    // محاكاة اختيار فيديو
    setVideoUri('file:///path/to/video.mp4');
    Alert.alert(t('success'), t('video_selected'));
  };

  const handleSelectThumbnail = () => {
    // محاكاة اختيار صورة
    setThumbnail('file:///path/to/thumbnail.jpg');
    Alert.alert(t('success'), t('thumbnail_selected'));
  };

  const handleUpload = async () => {
    if (!videoUri || !description.trim()) {
      Alert.alert(t('error'), t('fill_all_fields'));
      return;
    }

    try {
      setUploading(true);
      // محاكاة رفع الفيديو
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      await uploadReel(user.uid, videoUri, description, thumbnail);
      Alert.alert(t('success'), t('reel_uploaded_successfully'));
      setVideoUri('');
      setThumbnail('');
      setDescription('');
      setSelectedFilter('none');
      navigation.goBack();
    } catch (error) {
      Alert.alert(t('error'), error.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={isDark ? '#fff' : '#000'} />
          </TouchableOpacity>
          <Text style={styles.title}>{t('upload_reel')}</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Video Preview */}
        <View style={styles.previewContainer}>
          {videoUri ? (
            <View style={styles.videoPreview}>
              <Icon name="video" size={60} color="#FF1493" />
              <Text style={styles.previewText}>{t('video_selected')}</Text>
              <TouchableOpacity style={styles.changeButton} onPress={handleSelectVideo}>
                <Text style={styles.changeButtonText}>{t('change')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadBox} onPress={handleSelectVideo}>
              <Icon name="cloud-upload" size={50} color="#FF1493" />
              <Text style={styles.uploadText}>{t('select_video')}</Text>
              <Text style={styles.uploadSubText}>{t('max_size')}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Thumbnail */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('thumbnail')}</Text>
          <TouchableOpacity style={styles.thumbnailBox} onPress={handleSelectThumbnail}>
            {thumbnail ? (
              <View style={styles.thumbnailPreview}>
                <Icon name="image" size={40} color="#FF1493" />
                <Text style={styles.thumbnailText}>{t('thumbnail_selected')}</Text>
              </View>
            ) : (
              <View style={styles.thumbnailEmpty}>
                <Icon name="image-plus" size={35} color="#888" />
                <Text style={styles.emptyText}>{t('choose_thumbnail')}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('filters')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterItem,
                  selectedFilter === filter.id && styles.filterItemActive,
                  { borderColor: filter.color },
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Icon name={filter.icon} size={24} color={filter.color} />
                <Text style={styles.filterName}>{filter.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('description')}</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder={t('write_description')}
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={500}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{description.length}/500</Text>
        </View>

        {/* Upload Progress */}
        {uploading && (
          <View style={styles.progressContainer}>
            <ActivityIndicator size="large" color="#FF1493" />
            <Text style={styles.progressText}>{t('uploading')} {uploadProgress}%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${uploadProgress}%` }]} />
            </View>
          </View>
        )}

        {/* Upload Button */}
        <TouchableOpacity
          style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
          onPress={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Icon name="upload" size={20} color="#fff" />
              <Text style={styles.uploadButtonText}>{t('upload_now')}</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (isDark) => StyleSheet.create({
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDark ? '#fff' : '#000',
  },
  previewContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FF1493',
    borderRadius: 15,
    paddingVertical: 50,
    alignItems: 'center',
    backgroundColor: isDark ? '#2a2a2a' : '#f9f9f9',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDark ? '#fff' : '#000',
    marginTop: 10,
  },
  uploadSubText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  videoPreview: {
    backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    fontSize: 14,
    color: isDark ? '#bbb' : '#666',
    marginTop: 10,
  },
  changeButton: {
    marginTop: 15,
    backgroundColor: '#FF1493',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  section: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDark ? '#fff' : '#000',
    marginBottom: 10,
  },
  thumbnailBox: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
  },
  thumbnailPreview: {
    padding: 40,
    alignItems: 'center',
  },
  thumbnailText: {
    fontSize: 12,
    color: isDark ? '#bbb' : '#666',
    marginTop: 8,
  },
  thumbnailEmpty: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  filtersContainer: {
    marginBottom: 10,
  },
  filterItem: {
    alignItems: 'center',
    marginRight: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: isDark ? '#2a2a2a' : '#f9f9f9',
  },
  filterItemActive: {
    backgroundColor: '#FF1493',
    borderColor: '#FF1493',
  },
  filterName: {
    fontSize: 11,
    color: isDark ? '#bbb' : '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: isDark ? '#333' : '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    minHeight: 100,
    color: isDark ? '#fff' : '#000',
    backgroundColor: isDark ? '#2a2a2a' : '#f9f9f9',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'right',
  },
  progressContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: isDark ? '#bbb' : '#666',
    marginTop: 10,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: isDark ? '#333' : '#eee',
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF1493',
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#FF1493',
    paddingVertical: 13,
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadButtonDisabled: {
    opacity: 0.6,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UploadReelScreen;
