import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore"; 
import { useEffect } from "react";

export default function RootLayout() {

  const router = useRouter(); // The useRouter hook provides access to the router object, which can be used to navigate between screens
  const segments = useSegments(); // The useSegments hook tells you which route segments are currently active, which can be useful for conditional rendering or navigation logic
  console.log("Current segments:", segments); 

  const { checkAuth, user, token } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // handle navigation based on authentication state
  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)"; // Check if the first segment is the auth screen
    const isSignedIn = user && token; // Check if user and token are available

    if (!inAuthScreen && !isSignedIn) {
      router.replace("/(auth)"); // If not on auth screen and not signed in, redirect to login
    } else if (inAuthScreen && isSignedIn) {
      router.replace("/(tabs)"); // If on auth screen and signed in, redirect to home
    }

  }, []);



  return (

    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false}}>
          <Stack.Screen name="(tabs)" />;
          <Stack.Screen name="(auth)" />;
        </Stack>
      </SafeScreen>

      <StatusBar style="dark"/>
      {/* The StatusBar component is used to control the appearance of the status bar */}
    </SafeAreaProvider>
  );
}
