import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }
    
    setLoading(true);
    // محاكاة تسجيل الدخول
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Icon name="camera-iris" size={60} color="#FF1493" />
          <Text style={styles.appName}>MyoGram</Text>
          <Text style={styles.tagline}>شارك لحظاتك</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="البريد الإلكتروني"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!loading}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="كلمة المرور"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#888"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'جاري التحميل...' : 'دخول'}
            </Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>هل نسيت كلمة المرور؟</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>ليس لديك حساب؟ </Text>
          <TouchableOpacity>
            <Text style={styles.signupLink}>إنشاء حساب</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF1493',
    marginTop: 10,
  },
  tagline: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#FF1493',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#FF1493',
    marginTop: 15,
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#888',
    fontSize: 14,
  },
  signupLink: {
    color: '#FF1493',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
