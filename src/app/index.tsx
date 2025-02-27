import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Image, ImageBackground, KeyboardAvoidingView, Platform, Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window'); // Get screen width & height

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

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
            <TextInput placeholder="Username" style={styles.input} placeholderTextColor="#FFFFFF" />
          </View>

          {/* Password Input with Show/Hide Toggle */}
          <View style={styles.inputContainer}>
            <Image source={require('../assets/images/lock.png')} style={styles.icon} />
            <TextInput 
              placeholder="Password" 
              style={styles.input} 
              placeholderTextColor="#FFFFFF" 
              secureTextEntry={!passwordVisible} 
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.button}>
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
    width: width * 0.6, // 60% of screen width
    height: height * 0.15, // 15% of screen height
    marginBottom: height * 0.02,
    resizeMode: 'contain',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: width * 0.05,
    borderRadius: 10,
    width: width * 0.8, // 80% of screen width
    alignItems: 'center',
    elevation: 5,
    position: 'absolute',
    top: height * 0.35, // Adjust based on screen size
    transform: [{ translateY: -50 }],
    zIndex: 2,
  },
  inputContainer: {
    flexDirection: 'row',  
    alignItems: 'center',
    width: '100%',
    height: height * 0.07, // Dynamic height
    borderColor: '#FFB302', 
    borderWidth: 2,
    borderRadius: 25, 
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    marginBottom: height * 0.02, // Dynamic margin
    paddingHorizontal: width * 0.04,
  },
  icon: {
    width: width * 0.06, // Scale icon size dynamically
    height: width * 0.06,
    marginRight: width * 0.02,
  },
  input: {
    flex: 1, 
    color: '#FFFFFF', 
    fontSize: width * 0.04, // Scales font size dynamically
  },
  button: {
    backgroundColor: '#F69E04',
    paddingVertical: height * 0.015, 
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045, 
    fontWeight: 'bold',
  },
  ladyImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.45, // Scales with screen size
    resizeMode: 'cover',
  },
});
