/* eslint-disable max-lines-per-function */

import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
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
  // const { width, height } = useWindowDimensions();

  const handleLogin = async (data: FormType) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View className="flex-1 flex-row">
      {/* Left Panel: Decorative Image */}
      <View className="flex-1">
        <Image
          source={require('../../assets/lady.png')}
          className="size-full"
          resizeMode="cover"
        />
      </View>
      {/* Right Panel: Login Form */}
      <View className="flex-1 justify-center rounded-lg p-6 ">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center">
            <Image
              source={require('../../assets/logoDingDing.png')}
              className="mb-6 h-20 w-1/2"
              resizeMode="contain"
            />

            {/* Username Input */}
            <View className="mb-4 h-12 flex-row items-center rounded-full border border-yellow-500 bg-black bg-opacity-60 px-4">
              <Image
                source={require('../../assets/user.png')}
                className="mr-2 size-6"
                resizeMode="contain"
              />
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor="#fff"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="flex-1 text-base text-white"
                  />
                )}
              />
            </View>

            {/* Password Input */}
            <View className="mb-4 h-12 flex-row items-center rounded-full border border-yellow-500 bg-black bg-opacity-60 px-4">
              <Image
                source={require('../../assets/lock.png')}
                className="mr-2 size-6"
                resizeMode="contain"
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    secureTextEntry={!passwordVisible}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="flex-1 text-base text-white"
                  />
                )}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Ionicons
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleSubmit(handleLogin)}
              className="w-full items-center rounded-full bg-orange-500 py-3"
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-lg font-bold text-white">Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
