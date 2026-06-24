import { axiosApi } from "@/lib/axios";
import { userAccessToken } from "@/types/auth";
import { create } from "zustand";
import { useHotelStore } from "./hotel.store";
import { useBikesStore } from "./bikes.store";
import { useCabsStore } from "./cabs.store";
import { useToursStore } from "./tours.store";
import { useAdventureStore } from "./adventure.store";

export const clearBookingDates = () => {
  try {
    useHotelStore.getState().setDate(undefined);
  } catch (e) {}
  try {
    useBikesStore.getState().setDate(undefined);
  } catch (e) {}
  try {
    useCabsStore.getState().setDate(undefined);
  } catch (e) {}
  try {
    useToursStore.getState().setDate(undefined);
  } catch (e) {}
  try {
    useAdventureStore.getState().setDate(undefined);
  } catch (e) {}
};

interface User {
  id: string;
  email: string;
  role: string;
  isVerified: boolean;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phoneNumber?: string;
  gender?: string;
  country?: string;
  address?: string;
  zipCode?: string;
}

interface AuthStates {
  loginBoxOpen: boolean;
  setLoginBoxOpen: (open: boolean) => void;
  signupBoxOpen: boolean;
  setSignupBoxOpen: (open: boolean) => void;
  isLoging: boolean;
  isSiging: boolean;
  currUser: User | null;
  userLogin: (
    data: Login_signup_Data,
  ) => Promise<{ success: boolean; message: string }>;
  userSignup: (
    data: Login_signup_Data,
  ) => Promise<{ success: boolean; message: string }>;
  verifyOTP: (data: {
    phone?: string;
    email?: string;
    otp: string;
    endpoint: string;
  }) => Promise<{ success: boolean; message: string }>;
  verifyForgotPasswordOTP: (data: {
    phone?: string;
    email?: string;
    otp: string;
    endpoint: string;
  }) => Promise<{ success: boolean; message: string }>;
  resendOTP: (email: string) => Promise<{ success: boolean; message: string }>;
  forgotPassword: (
    data: ForgotPassword_Data,
  ) => Promise<{ success: boolean; message: string }>;
  resetPassword: (data: {
    phone?: string;
    email?: string;
    otp: string;
    newPassword: string;
  }) => Promise<{ success: boolean; message: string }>;
  updateUser: (
    data: Partial<User>,
  ) => Promise<{ success: boolean; message: string }>;
  uploadFile: (
    file: File,
  ) => Promise<{ success: boolean; url?: string; message: string }>;
}

interface Login_signup_Data {
  phone?: string;
  email?: string;
  password?: string;
}
interface ForgotPassword_Data {
  phone?: string;
  email?: string;
}

export const useAuthStore = create<AuthStates>()((set) => ({
  loginBoxOpen: false,
  setLoginBoxOpen: (open: boolean) => set({ loginBoxOpen: open }),
  signupBoxOpen: false,
  setSignupBoxOpen: (open: boolean) => set({ signupBoxOpen: open }),
  isLoging: false,
  isSiging: false,
  currUser: null,

  userLogin: async (data: Login_signup_Data) => {
    set({ isLoging: true });
    try {
      const res = await axiosApi.post("/auth/email-login", data);
      if (res.data.success) {
        set({ currUser: res.data.data.user });
        const token = res.data.accessToken;
        localStorage.setItem(userAccessToken, token);
        clearBookingDates();
        return { success: true, message: res.data.message };
      }
      return { success: false, message: res.data.message || "Login failed" };
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    } finally {
      set({ isLoging: false });
    }
  },

  resetPassword: async (data: {
    // phone?: string;
    email?: string;
    otp: string;
    newPassword: string;
  }) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.patch("/auth/reset-password", data);
      return { success: res.data.success, message: res.data.message };
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || "Reset password failed",
      };
    } finally {
      set({ isSiging: false });
    }
  },
  forgotPassword: async (data: ForgotPassword_Data) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.post("/auth/forgot-password", data);
      return { success: res.data.success, message: res.data.message };
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message:
          err.response?.data?.message || "Forgot password request failed",
      };
    } finally {
      set({ isSiging: false });
    }
  },
  userSignup: async (data: Login_signup_Data) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.post("/auth/email-signup", data);
      return { success: res.data.success, message: res.data.message };
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    } finally {
      set({ isSiging: false });
    }
  },

  verifyOTP: async (data: {
    phone?: string;
    email?: string;
    otp: string;
    endpoint: string;
  }) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.post(data.endpoint, {
        phone: data.phone,
        email: data.email,
        otp: data.otp,
      });

      if (res.data.success) {
        set({ currUser: res.data.data.user });
        const token = res.data.accessToken;
        localStorage.setItem(userAccessToken, token);
        clearBookingDates();
        return { success: true, message: res.data.message };
      }
      return {
        success: false,
        message: res.data.message || "Verification failed",
      };
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || "Verification failed",
      };
    } finally {
      set({ isSiging: false });
    }
  },
  verifyForgotPasswordOTP: async (data: {
    phone?: string;
    email?: string;
    otp: string;
    endpoint: string;
  }) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.post(data.endpoint, {
        phone: data.phone,
        email: data.email,
        otp: data.otp,
      });

      if (res.data.success) {
        // set({ currUser: res.data.data.user });
        return { success: true, message: res.data.message };
      }
      return {
        success: false,
        message: res.data.message || "Verification failed",
      };
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || "Verification failed",
      };
    } finally {
      set({ isSiging: false });
    }
  },
  resendOTP: async (email: string) => {
    try {
      const res = await axiosApi.post("/auth/email-resend-otp", { email });
      return { success: res.data.success, message: res.data.message };
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || "Failed to resend OTP",
      };
    }
  },

  updateUser: async (data: Partial<User>) => {
    try {
      const res = await axiosApi.patch("/users/update-me", data);
      if (res.data.success) {
        set({ currUser: res.data.data });
        return { success: true, message: "Profile updated successfully" };
      }
      return {
        success: false,
        message: res.data.message || "Failed to update profile",
      };
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || "Failed to update profile",
      };
    }
  },

  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("folder", "profiles");

    try {
      const res = await axiosApi.post("/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        return {
          success: true,
          url: res.data.files[0].url,
          message: "File uploaded successfully",
        };
      }
      return {
        success: false,
        message: res.data.message || "Upload failed",
      };
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || "Upload failed",
      };
    }
  },
}));
