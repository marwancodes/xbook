import { Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import styles from "../../assets/styles/signup.styles";
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/authStore';



const Signup = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { user, isLoading, register, token } = useAuthStore();

    const handleSignup = async () => {
        const result = await register(username, email, password);

        if (!result.success) {
            Alert.alert("Signup Error", result.error || "An error occurred during signup. Please try again.");
        }

        console.log("User after signup:", useAuthStore.getState().user);
        console.log("Token after signup:", useAuthStore.getState().token);
    };

  return (
      
    <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.container}>
            {/* Illustration */}
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>XBOOK</Text>
                    <Text style={styles.subtitle}>Share your favorite reads</Text>
                </View>

                {/* Form */}
                <View style={styles.formContainer}>

                    {/* Username input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Username</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons 
                                name="person-outline"
                                size={20}
                                color={COLORS.primary}
                                style={styles.inputIcon}
                            />
                            <TextInput 
                                style={styles.input}
                                placeholder="AdamSmith"
                                placeholderTextColor={COLORS.placeholderText}
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons 
                                name="mail-outline"
                                size={20}
                                color={COLORS.primary}
                                style={styles.inputIcon}
                            />
                            <TextInput 
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor={COLORS.placeholderText}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            {/* Left Icon */}
                            <Ionicons 
                                name="lock-closed-outline"
                                size={20}
                                color={COLORS.primary}
                                style={styles.inputIcon}
                            />
                            {/* Input */}
                            <TextInput 
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            
                            {/* Right Icon */}
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons 
                                    name={showPassword ? "eye-outline" : "eye-off-outline" }
                                    size={20}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Signup Button */}
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleSignup}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Signup</Text>
                        )}
                    </TouchableOpacity>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.link}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

export default Signup

