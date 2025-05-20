// app/screens/LoginScreen.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async () => {
    setError("");

    try {
      const res = await fetch("http://10.0.2.2:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Login reușit!");
        console.log("Login successful, userId:", data.id);
      } else {
        setError(data.email || data.password || data.general || "Login failed!");
      }
    } catch (e) {
      console.error("Login API call error:", e);
      setError("An error occurred. Please try again.");
    }
  };

  const handleNavigateToSignUp = () => {
    console.log("Navigating to Sign Up");
    router.push('/screens/SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.formContainer}>
          <Text style={[styles.subtitle, { fontFamily: 'Montserrat-SemiBold' }]}>Log In to</Text>
          <Text style={[styles.title, { fontFamily: 'Montserrat-SemiBold' }]}>BANK of Young Programmers</Text>

          {error ? <Text style={[styles.errorText, { fontFamily: 'Montserrat-SemiBold' }]}>{error}</Text> : null}

          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { fontFamily: 'Montserrat-SemiBold' }]}
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputWrapper}>
            <TextInput
                style={[styles.input, { fontFamily: 'Montserrat-SemiBold' }]}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={[styles.loginButtonText, { fontFamily: 'Montserrat-SemiBold' }]}>Log In</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.signupPrompt, { fontFamily: 'Montserrat-SemiBold' }]}>Don't have an account?</Text>
          <TouchableOpacity style={styles.signupButton} onPress={handleNavigateToSignUp}>
            <Text style={[styles.signupButtonText, { fontFamily: 'Montserrat-SemiBold' }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8BB394',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 39,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '90%',
    maxWidth: 400,
    padding: 20,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    marginBottom: 25,
    width: '100%',
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  loginButton: {
    backgroundColor: '#458454',
    borderRadius: 25,
    paddingVertical: 15,
    width: '75%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
  },
  signupPrompt: {
    marginTop: 15,
    color: '#555',
    fontSize: 14,
    marginBottom: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
  signupButton: {
    backgroundColor: '#458454',
    borderRadius: 25,
    paddingVertical: 15,
    width: '75%',
    alignItems: 'center',
    marginBottom: 20,
    opacity: 0.75,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 0.75,
    fontFamily: 'Montserrat-SemiBold',
  },
  bannerTitle: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  bannerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    marginTop: 5,
  },
  bannerTextBold: {
    fontWeight: 'bold',
  }
});

export default LoginScreen;
