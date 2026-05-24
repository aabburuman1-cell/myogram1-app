import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const SettingsScreen = ({ navigation }) => {
  const { isDark, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('settings')}</Text>
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('theme')}</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name={isDark ? 'moon' : 'white-balance-sunny'} size={24} color="#FF1493" />
              <Text style={styles.settingLabel}>
                {isDark ? t('dark_mode') : t('light_mode')}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, isDark && styles.toggleActive]}
              onPress={toggleTheme}
            >
              <View
                style={[
                  styles.toggleCircle,
                  isDark && styles.toggleCircleActive,
                ]}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('language')}</Text>
          {[
            { code: 'ar', label: 'العربية' },
            { code: 'en', label: 'English' },
          ].map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={styles.settingItem}
              onPress={() => changeLanguage(lang.code)}
            >
              <Text
                style={[
                  styles.settingLabel,
                  language === lang.code && styles.settingLabelActive,
                ]}
              >
                {lang.label}
              </Text>
              {language === lang.code && (
                <Icon name="check" size={24} color="#FF1493" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('account')}</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="account" size={24} color="#FF1493" />
              <Text style={styles.settingLabel}>{t('account')}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('privacy')}</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="shield-account" size={24} color="#FF1493" />
              <Text style={styles.settingLabel}>{t('privacy')}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="logout" size={20} color="#FF1493" />
          <Text style={styles.logoutButtonText}>{t('logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1a1a1a' : '#fff',
    },
    header: {
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
    section: {
      marginVertical: 15,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#999',
      paddingHorizontal: 15,
      marginBottom: 10,
      textTransform: 'uppercase',
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#2a2a2a' : '#f0f0f0',
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingLabel: {
      fontSize: 15,
      color: isDark ? '#bbb' : '#666',
      marginLeft: 12,
      flex: 1,
    },
    settingLabelActive: {
      color: '#FF1493',
      fontWeight: 'bold',
    },
    toggle: {
      width: 50,
      height: 28,
      borderRadius: 14,
      backgroundColor: isDark ? '#333' : '#ddd',
      justifyContent: 'center',
      paddingHorizontal: 2,
    },
    toggleActive: {
      backgroundColor: '#FF1493',
    },
    toggleCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#fff',
    },
    toggleCircleActive: {
      alignSelf: 'flex-end',
    },
    logoutButton: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#2a2a2a' : '#f9f9f9',
      paddingVertical: 13,
      marginHorizontal: 15,
      marginVertical: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderWidth: 1,
      borderColor: '#FF1493',
    },
    logoutButtonText: {
      color: '#FF1493',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default SettingsScreen;
