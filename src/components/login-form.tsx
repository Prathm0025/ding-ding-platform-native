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
  const { errors, isSubmitting } = formState;
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
      source={require('../../assets/bg.png')}
      className="size-full flex-1 items-center justify-center"
    >
      <ImageBackground
        source={require('../../assets/lady.png')}
        className="absolute z-10 size-full"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View
            className="flex-1 items-center justify-center"
            style={{ paddingVertical: responsiveHeight(5) }}
          >
            <View
              className="w-[85%] items-center bg-black/50"
              style={{
                padding: responsiveWidth(5),
                borderRadius: responsiveWidth(3),
              }}
            >
              <Image
                source={require('../../assets/logoDingDing.png')}
                className="mb-5"
                style={{
                  width: responsiveWidth(50),
                  height: responsiveHeight(12),
                }}
              />

              {/* Username Input */}
              <View
                className={`mb-4 w-full flex-row items-center border bg-black/60 ${
                  errors.username ? 'border-red-500' : 'border-[#FFB302]'
                }`}
                style={{
                  height: responsiveHeight(6),
                  borderRadius: responsiveWidth(20),
                  paddingHorizontal: responsiveWidth(4),
                }}
              >
                <Image
                  source={require('../../assets/user.png')}
                  className="mr-2.5"
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveHeight(3),
                  }}
                />
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Username"
                      className="flex-1 text-white"
                      style={{ fontSize: responsiveFontSize(1.7) }}
                      placeholderTextColor="#FFFFFF"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
              {/* {errors.username && (
                <Text className="mb-2 text-sm text-red-500">
                  {errors.username.message}
                </Text>
              )} */}

              {/* Password Input */}
              <View
                className={`mb-4 w-full flex-row items-center border bg-black/60 ${
                  errors.password ? 'border-red-500' : 'border-[#FFB302]'
                }`}
                style={{
                  height: responsiveHeight(6),
                  borderRadius: responsiveWidth(20),
                  paddingHorizontal: responsiveWidth(4),
                }}
              >
                <Image
                  source={require('../../assets/lock.png')}
                  className="mr-2.5"
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveHeight(3),
                  }}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Password"
                      className="flex-1 text-white"
                      style={{ fontSize: responsiveFontSize(1.7) }}
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
              {/* {errors.password && (
                <Text className="mb-2 text-sm text-red-500">
                  {errors.password.message}
                </Text>
              )} */}

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="w-full items-center bg-[#F69E04]"
                style={{
                  paddingVertical: responsiveWidth(3),
                  borderRadius: responsiveWidth(10),
                }}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text
                    className="font-bold text-white"
                    style={{ fontSize: responsiveFontSize(2) }}
                  >
                    Login
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ImageBackground>
  );
};
