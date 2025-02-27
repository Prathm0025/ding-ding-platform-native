import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  Image, ImageBackground, KeyboardAvoidingView, Platform, Dimensions,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  responsiveWidth, responsiveHeight, responsiveFontSize
} from 'react-native-responsive-dimensions';
import { loginUser } from '../api/auth';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(username, password);
      console.log(response, "res")
      if (response?.role==='player') {
        if (response?.token) {
          Alert.alert('Success', 'Login Successful');
          router.push('/home')
        }
      }


    } catch (error) {
      // Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Login Form */}
        <View style={styles.formContainer}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Image source={require('../assets/images/user.png')} style={styles.icon} />
            <TextInput
              placeholder="Username"
              style={styles.input}
              placeholderTextColor="#FFFFFF"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Password Input with Show/Hide Toggle */}
          <View style={styles.inputContainer}>
            <Image source={require('../assets/images/lock.png')} style={styles.icon} />
            <TextInput
              placeholder="Password"
              style={styles.input}
              placeholderTextColor="#FFFFFF"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Lady Image at Bottom */}
        <Image source={require('../assets/images/lady.png')} style={styles.ladyImage} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: responsiveWidth(60),
    height: responsiveHeight(15),
    marginBottom: responsiveHeight(2),
    resizeMode: 'contain',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: responsiveWidth(5),
    borderRadius: responsiveWidth(3),
    width: responsiveWidth(87),
    alignItems: 'center',
    elevation: responsiveHeight(5),
    position: 'absolute',
    top: responsiveHeight(35),
    transform: [{ translateY: -50 }],
    zIndex: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: responsiveHeight(6),
    borderColor: '#FFB302',
    borderWidth: responsiveWidth(.5),
    borderRadius: responsiveWidth(20),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    marginBottom: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
  },
  icon: {
    width: responsiveWidth(6),
    height: responsiveHeight(3),
    marginRight: responsiveWidth(3),
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.7),
  },
  button: {
    backgroundColor: '#F69E04',
    paddingVertical: responsiveWidth(2),
    borderRadius: responsiveWidth(10),
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  ladyImage: {
    position: 'absolute',
    bottom: 0,
    width: responsiveWidth(100),
    height: responsiveHeight(90),
    resizeMode: 'cover',
  },
});
