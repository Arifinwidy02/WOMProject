import React, { useContext, useState } from 'react';
import { Alert, View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import { Controller, useForm } from 'react-hook-form';
import { loginFormValues, loginSchema } from '../../utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginScreen = () => {
  const { signIn, isLoading } = useContext(AuthContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [userInputLogin, setUserInputLogin] = useState({
    email: '',
    password: '',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: loginFormValues) => {
    const result = await signIn(data);
    if (!result.success) {
      Alert.alert('Gagal', result.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text
        variant="headlineMedium"
        style={{ marginBottom: 20, textAlign: 'center' }}
      >
        Login
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!errors.email}
            autoCapitalize="none"
            style={{ ...(!errors.email && { marginBottom: 12 }) }}
          />
        )}
      />
      {errors.email && (
        <Text style={{ color: 'red' }}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!errors.password}
            autoCapitalize="none"
            secureTextEntry={secureTextEntry}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? 'eye-off' : 'eye'}
                onPress={() => setSecureTextEntry(prev => !prev)}
              />
            }
          />
        )}
      />
      {errors.password && (
        <Text style={{ color: 'red' }}>{errors.password.message}</Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        disabled={isLoading}
        style={{ marginTop: 24 }}
      >
        Login
      </Button>
    </View>
  );
};
export default LoginScreen;
