import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useAuthStore } from "../store/authStore"
import { useEffect } from "react";



export default function Index() {

  const { user, token, checkAuth } = useAuthStore();
  console.log(user, token);

  useEffect(() => {
    checkAuth();
  },[]);

  return (
    <View style={styles.container} >
      <Text style={styles.text}>Welcome {user?.username}</Text>
      <Text style={styles.text}>Token: {token}</Text>

      
      <Link href="/(auth)/signup" style={styles.text}>Signup</Link>
      <Link href="/(auth)" style={styles.text}>Login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
})