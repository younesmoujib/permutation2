import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Card, Icon } from 'react-native-elements';

const LoginScreen = ({ route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const setToken = route.params?.setToken;
  const setAuthenticated=route.params?.setAuthenticated;

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://troubled-red-garb.cyclic.app/login', {
        email,
        password,
      });

      const { message, token } = response.data;
      if (message === 'Authentication successful') {
        const professorsResponse = await axios.get('https://troubled-red-garb.cyclic.app/professeurs');
        const professorsData = professorsResponse.data;
        const professor = professorsData.find((prof) => prof.email === email);
        if (professor) {
          console.log(professor);
          setToken({ token });
          setAuthenticated(true);

          navigation.navigate('Professor', { professor });
        } else {
          throw new Error('Professor not found');
        }
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      Alert.alert('Error', message);
    }
  };

  return (
    <View style={{ marginTop: 30 }}>
      <Card>
        <View style={styles.inputContainer}>
          <Icon name="mail" type="material" />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" type="material" />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = {
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
  },
  input: {
    flex: 1,
    marginLeft: 25,
  },
  button: {
    marginTop: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    width: 130,
    height: 35,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default LoginScreen;
