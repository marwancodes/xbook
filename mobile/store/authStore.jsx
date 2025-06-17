import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "https://react-native-xbook-api.onrender.com/api/auth";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,

    register: async (username, email, password) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${API_URL}/register`, {
                username,
                email,
                password
            });

            //* This is normal fetching */
            // const response = await fetch(`${API_URL}/register`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ username, email, password }),
            // });

            // if (!response.ok) {
            //     throw new Error(response.data.message || "Error signing up");
            // }

            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

            set({
                user: response.data.user,
                token: response.data.token,
                isLoading: false,
            });

            console.log("User after signup: ", response.data.user);
            console.log("Token after: ", response.data.token);

            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message || error.message || "Error signing up", isLoading: false });
			return { success: false, error: error.message || "Error signing up" };
        }
    }

}));