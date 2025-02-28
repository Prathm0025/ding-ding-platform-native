import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  Image, ImageBackground, KeyboardAvoidingView, Platform, Alert,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  responsiveWidth, responsiveHeight, responsiveFontSize
} from 'react-native-responsive-dimensions';
import { loginUser } from '../api/auth';
import { useFocusEffect, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import Loader from '../components/Loader';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };
      lockOrientation();
    }, [])
  );

  const handleLogin = async () => {
    if (!username) {
      Toast.show({
        text1Style: { fontSize: 16 },
        type: 'success',
        text1: 'Enter username 👋'
      });
      return;
    } else if (!password) {
      Toast.show({
        text1Style: { fontSize: 16 },
        type: 'success',
        text1: 'Enter password 👋'
      });
      return;
    } else {

      setLoading(true);
      try {
        const response = await loginUser(username, password);
        if (response?.role === 'player' && response?.token) {
          Toast.show({
            text1Style: { fontSize: 16 },
            type: 'success',
            text1: 'Login successfully 😊'
          });
          router.push('/home');
        } else {
          Toast.show({
            text1Style: { fontSize: 16 },
            type: 'error',
            text1: 'Login Failed 😔'
          });
        }
      } catch (error) {
        Toast.show({
          text1Style: { fontSize: 16 },
          type: 'error',
          text1: 'Login Failed 😔'
        });
      } finally {
        setLoading(false);
      }
    }

  };

  return (
    <>
      <ImageBackground
        source={require('../assets/images/bg.png')}
        style={styles.background}
      >
        {/* Lady Image as Background */}
        <ImageBackground
          source={require('../assets/images/lady.png')}
          style={styles.ladyBackground}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.innerContainer}>
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

                  {/* Password Input */}
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
                  <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

        </ImageBackground>
      </ImageBackground>

      {loading && <Loader />}
    </>
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
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: responsiveHeight(5),
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: responsiveWidth(5),
    borderRadius: responsiveWidth(3),
    width: responsiveWidth(87),
    alignItems: 'center',
    elevation: responsiveHeight(5),
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(12),
    marginBottom: responsiveHeight(2),
    resizeMode: 'contain',
  },
  ladyBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 1, // Above the bg.png
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: responsiveHeight(6),
    borderColor: '#FFB302',
    borderWidth: responsiveWidth(0.5),
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
    paddingVertical: responsiveWidth(3),
    borderRadius: responsiveWidth(10),
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },

});
