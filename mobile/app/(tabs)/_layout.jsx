import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const TabLayout = () => {

  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide the header for all tabs
        tabBarActiveTintColor: COLORS.primary, // Active tab icon color
        levation: 0, // Remove shadow on Android
        headerTitleStyle: { 
          fontWeight: "600", // Header title font weight 
          color: COLORS.primary
        }, // Header title style
        headerShadowVisible: false, // Hide header shadow
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground, // Tab bar background color
          borderTopWidth: 1, // Add border to the top of the tab bar
          borderTopColor: COLORS.border, // Border color
          paddingTop: 5, // Padding at the top of the tab bar
          paddingBottom: insets.bottom, // Padding at the bottom of the tab bar to account for safe area insets
          height: 60 + insets.bottom, // Height of the tab bar, adjusted for safe area insets
        }
      }}
    >

      <Tabs.Screen
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )
        }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{ 
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }} 
      />

    </Tabs>
  )
}

export default TabLayout;