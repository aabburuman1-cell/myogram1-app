import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const ImageFiltersScreen = ({ navigation }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [intensity, setIntensity] = useState(50);

  const filters = [
    {
      id: 'none',
      name: t('original'),
      icon: 'image',
      description: t('no_changes'),
    },
    {
      id: 'brightness',
      name: t('brightness'),
      icon: 'brightness-7',
      description: t('increase_light'),
    },
    {
      id: 'contrast',
      name: t('contrast'),
      icon: 'contrast-box',
      description: t('adjust_contrast'),
    },
    {
      id: 'saturation',
      name: t('saturation'),
      icon: 'palette',
      description: t('adjust_colors'),
    },
    {
      id: 'vintage',
      name: t('vintage'),
      icon: 'image-filter-vintage',
      description: t('classic_look'),
    },
    {
      id: 'sepia',
      name: t('sepia'),
      icon: 'image-filter',
      description: t('warm_tone'),
    },
    {
      id: 'grayscale',
      name: t('grayscale'),
      icon: 'image-filter-black-and-white',
      description: t('black_white'),
    },
    {
      id: 'blur',
      name: t('blur'),
      icon: 'blur',
      description: t('soft_focus'),
    },
    {
      id: 'sharpen',
      name: t('sharpen'),
      icon: 'focus-field',
      description: t('increase_clarity'),
    },
    {
      id: 'cool',
      name: t('cool'),
      icon: 'snowflake',
      description: t('blue_tone'),
    },
    {
      id: 'warm',
      name: t('warm'),
      icon: 'fire',
      description: t('orange_tone'),
    },
    {
      id: 'invert',
      name: t('invert'),
      icon: 'invert-colors',
      description: t('negative_effect'),
    },
  ];

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={isDark ? '#fff' : '#000'} />
          </TouchableOpacity>
          <Text style={styles.title}>{t('image_filters')}</Text>
          <TouchableOpacity>
            <Icon name="check" size={24} color="#FF1493" />
          </TouchableOpacity>
        </View>

        {/* Image Preview */}
        <View style={styles.previewContainer}>
          <View style={styles.imagePreview}>
            <Icon name="image" size={80} color="#FF1493" />
            <Text style={styles.previewText}>{t('select_image_to_filter')}</Text>
          </View>
        </View>

        {/* Intensity Slider */}
        <View style={styles.intensityContainer}>
          <View style={styles.intensityHeader}>
            <Text style={styles.intensityLabel}>{t('intensity')}</Text>
            <Text style={styles.intensityValue}>{intensity}%</Text>
          </View>
          <View style={styles.slider}>
            <View style={[styles.sliderFill, { width: `${intensity}%` }]} />
          </View>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>0%</Text>
            <Text style={styles.sliderLabel}>50%</Text>
            <Text style={styles.sliderLabel}>100%</Text>
          </View>
        </View>

        {/* Filters Grid */}
        <View style={styles.filtersSection}>
          <Text style={styles.filtersSectionTitle}>{t('available_filters')}</Text>
          <View style={styles.filtersGrid}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterCard,
                  selectedFilter === filter.id && styles.filterCardActive,
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <View style={styles.filterIcon}>
                  <Icon name={filter.icon} size={32} color="#FF1493" />
                </View>
                <Text style={styles.filterName}>{filter.name}</Text>
                <Text style={styles.filterDescription}>{filter.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton}>
            <Icon name="check-circle" size={20} color="#fff" />
            <Text style={styles.applyButtonText}>{t('apply_filter')}</Text>
          </TouchableOpacity>
        </View>
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
    marginVertical: 20,
    marginHorizontal: 15,
  },
  imagePreview: {
    backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
    borderRadius: 15,
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    fontSize: 14,
    color: isDark ? '#bbb' : '#666',
    marginTop: 10,
  },
  intensityContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  intensityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  intensityLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: isDark ? '#fff' : '#000',
  },
  intensityValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF1493',
  },
  slider: {
    height: 8,
    backgroundColor: isDark ? '#333' : '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#FF1493',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 11,
    color: '#999',
  },
  filtersSection: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  filtersSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDark ? '#fff' : '#000',
    marginBottom: 12,
  },
  filtersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterCard: {
    width: '48%',
    backgroundColor: isDark ? '#2a2a2a' : '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterCardActive: {
    borderColor: '#FF1493',
    backgroundColor: isDark ? '#3a3a3a' : '#fff',
  },
  filterIcon: {
    marginBottom: 8,
  },
  filterName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: isDark ? '#fff' : '#000',
    marginBottom: 3,
  },
  filterDescription: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FF1493',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FF1493',
    fontSize: 14,
    fontWeight: 'bold',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#FF1493',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ImageFiltersScreen;
