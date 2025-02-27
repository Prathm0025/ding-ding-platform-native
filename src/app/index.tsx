import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Expo Icons

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')} // Background Image
      style={styles.background}
    >
      {/* Login Form - Centered */}
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
            <Ionicons 
              name={passwordVisible ? 'eye' : 'eye-off'} 
              size={20} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Lady Image at Bottom */}
      <Image
        source={require('../assets/images/lady.png')}
        style={styles.ladyImage}
      />
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
  logo: {
    width: '80%',
    height: 130,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    position: 'absolute',
    top: '40%',
    transform: [{ translateY: -50 }],
    zIndex: 2,
  },
  inputContainer: {
    flexDirection: 'row',  
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#FFB302', 
    borderWidth: 2,
    borderRadius: 25, 
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  icon: {
    width: 24, 
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1, 
    color: '#FFFFFF', 
    fontSize: 16,
  },
  button: {
    backgroundColor: '#F69E04',
    padding: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ladyImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '90%',
    resizeMode: 'cover',
  },
});
