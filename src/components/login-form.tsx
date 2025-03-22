/* eslint-disable max-lines-per-function */
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import * as z from 'zod';

const schema = z.object({
  username: z.string().nonempty('Username is required'),
  password: z.string().nonempty('Password is required'),
});

export type FormType = z.infer<typeof schema>;
export type LoginFormProps = { onSubmit?: (data: FormType) => void };

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control, formState } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { username: '', password: '' },
  });
  const { isSubmitting } = formState;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };
    lockOrientation();
  }, []);

  const responsiveWidth = (percentage: number) => (percentage / 100) * width;
  const responsiveHeight = (percentage: number) => (percentage / 100) * height;
  const responsiveFontSize = (percentage: number) =>
    (percentage / 100) * Math.sqrt(width * height);

  return (
    <ImageBackground
      source={require('../../assets/bg.webp')}
      style={styles.background}
    >
      <ImageBackground
        source={require('../../assets/lady.png')}
        style={styles.ladyBackground}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={[
                styles.innerContainer,
                { paddingVertical: responsiveHeight(5) },
              ]}
            >
              <View
                style={[
                  styles.formContainer,
                  {
                    padding: responsiveWidth(5),
                    borderRadius: responsiveWidth(3),
                  },
                ]}
              >
                <Image
                  source={require('../../assets/logoDingDing.png')}
                  style={[
                    styles.logo,
                    {
                      width: responsiveWidth(50),
                      height: responsiveHeight(12),
                    },
                  ]}
                />

                {/* Username Input */}
                <View
                  style={[
                    styles.inputContainer,
                    {
                      height: responsiveHeight(6),
                      borderRadius: responsiveWidth(20),
                      paddingHorizontal: responsiveWidth(4),
                    },
                  ]}
                >
                  <Image
                    source={require('../../assets/user.png')}
                    style={[
                      styles.icon,
                      {
                        width: responsiveWidth(6),
                        height: responsiveHeight(3),
                      },
                    ]}
                  />
                  <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Username"
                        style={[
                          styles.input,
                          { fontSize: responsiveFontSize(1.7) },
                        ]}
                        placeholderTextColor="#FFFFFF"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>

                {/* Password Input */}
                <View
                  style={[
                    styles.inputContainer,
                    {
                      height: responsiveHeight(6),
                      borderRadius: responsiveWidth(20),
                      paddingHorizontal: responsiveWidth(4),
                    },
                  ]}
                >
                  <Image
                    source={require('../../assets/lock.png')}
                    style={[
                      styles.icon,
                      {
                        width: responsiveWidth(6),
                        height: responsiveHeight(3),
                      },
                    ]}
                  />
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Password"
                        style={[
                          styles.input,
                          { fontSize: responsiveFontSize(1.7) },
                        ]}
                        placeholderTextColor="#FFFFFF"
                        secureTextEntry={!passwordVisible}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    <Ionicons
                      name={passwordVisible ? 'eye' : 'eye-off'}
                      size={responsiveFontSize(2)}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  style={[
                    styles.button,
                    {
                      paddingVertical: responsiveWidth(3),
                      borderRadius: responsiveWidth(10),
                    },
                  ]}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text
                      style={[
                        styles.buttonText,
                        { fontSize: responsiveFontSize(2) },
                      ]}
                    >
                      Login
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '85%',
    alignItems: 'center',
  },
  logo: { resizeMode: 'contain', marginBottom: 20 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#FFB302',
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 15,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#FFFFFF' },
  button: { backgroundColor: '#F69E04', width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  ladyBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 1,
  },
});
