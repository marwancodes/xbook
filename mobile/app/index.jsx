import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useAuthStore } from "../store/authStore"



export default function Index() {

  const { user, token } = useAuthStore();
  console.log(user, token);

  return (
    <View style={styles.container} >
      <Text style={styles.text}>Welcome to England 123</Text>
      
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