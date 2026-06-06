import { userAccessToken } from "@/constants/auth";
import { axiosApi } from "@/lib/axios";
import { create } from "zustand";
interface Login_signup_Data {
  phone?: string;
  password?: string;
}
interface ForgotPassword_Data {
  phone?: string;
}
interface Login_signup_Data_Email {
  email?: string;
  password?: string;
}
interface ForgotPassword_Data_Email {
  email?: string;
}
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

  //phone
  userLogin: (
    data: Login_signup_Data,
  ) => Promise<{ success: boolean; message: string }>;

  //email
  userLoginByEmail: (
    data: Login_signup_Data_Email,
  ) => Promise<{ success: boolean; message: string }>;

  userSignup: (
    data: Login_signup_Data,
  ) => Promise<{ success: boolean; message: string }>;
  userSignupEmail: (
    data: Login_signup_Data_Email,
  ) => Promise<{ success: boolean; message: string }>;

  verifyOTP: (data: {
    phone: string;
    otp: string;
    endpoint: string;
  }) => Promise<{ success: boolean; message: string }>;

  verifyOTPEmail: (data: {
    email: string;
    otp: string;
    endpoint: string;
  }) => Promise<{ success: boolean; message: string }>;

  verifyForgotPasswordOTP: (data: {
    phone: string;
    otp: string;
    endpoint: string;
  }) => Promise<{ success: boolean; message: string }>;
  verifyForgotPasswordOTPEmail: (data: {
    email: string;
    otp: string;
    endpoint: string;
  }) => Promise<{ success: boolean; message: string }>; //email

  resendOTP: (phone: string) => Promise<{ success: boolean; message: string }>;
  resendOTPEmail: (
    email: string,
  ) => Promise<{ success: boolean; message: string }>;

  forgotPassword: (
    data: ForgotPassword_Data,
  ) => Promise<{ success: boolean; message: string }>;
  forgotPasswordEmail: (
    data: ForgotPassword_Data_Email,
  ) => Promise<{ success: boolean; message: string }>;

  resetPassword: (data: {
    phone: string;
    otp: string;
    newPassword: string;
  }) => Promise<{ success: boolean; message: string }>;
  resetPasswordEmail: (data: {
    email: string;
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

export const useAuthStore = create<AuthStates>()((set) => ({
  loginBoxOpen: false,
  setLoginBoxOpen: (open: boolean) => set({ loginBoxOpen: open }),
  signupBoxOpen: false,
  setSignupBoxOpen: (open: boolean) => set({ signupBoxOpen: open }),
  isLoging: false,
  isSiging: false,
  currUser: null,

  userLoginByEmail: async (data: Login_signup_Data_Email) => {
    set({ isLoging: true });
    try {
      const res = await axiosApi.post("/auth/email-login", data);
      if (res.data.success) {
        set({ currUser: res.data.data.user });
        const token = res.data.accessToken;
        localStorage.setItem(userAccessToken, token);
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
  forgotPasswordEmail: async (data: ForgotPassword_Data_Email) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.post("/auth/forgot-password", data);
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
  resetPasswordEmail: async (data: {
    email: string;
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
        message: err.response?.data?.message || "Signup failed",
      };
    } finally {
      set({ isSiging: false });
    }
  },
  verifyForgotPasswordOTPEmail: async (data: {
    email: string;
    otp: string;
    endpoint: string;
  }) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.post("/auth/email-verify-otp", {
        email: data.email,
        otp: data.otp,
      });
      return { success: res.data.success, message: res.data.message };
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
  userSignupEmail: async (data: Login_signup_Data_Email) => {
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
  verifyOTPEmail: async (data: {
    email: string;
    otp: string;
    endpoint: string;
  }) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.post("/auth/email-verify-otp", {
        email: data.email,
        otp: data.otp,
      });

      if (res.data.success) {
        set({ currUser: res.data.data.user });
        const token = res.data.accessToken;
        localStorage.setItem(userAccessToken, token);
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

  resendOTPEmail: async (email: string) => {
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  userLogin: async (data: Login_signup_Data) => {
    set({ isLoging: true });
    try {
      const res = await axiosApi.post("/auth/whatsapp-login", data);
      if (res.data.success) {
        set({ currUser: res.data.data.user });
        const token = res.data.accessToken;
        localStorage.setItem(userAccessToken, token);
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
    phone: string;
    otp: string;
    newPassword: string;
  }) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.patch("/auth/reset-password-whatsapp", data);
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

  forgotPassword: async (data: ForgotPassword_Data) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.post("/auth/forgot-password-whatsapp", data);
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

  userSignup: async (data: Login_signup_Data) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.post("/auth/whatsapp-signup", data);
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

  verifyOTP: async (data: { phone: string; otp: string; endpoint: string }) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.post(data.endpoint, {
        phone: data.phone,
        otp: data.otp,
      });

      if (res.data.success) {
        set({ currUser: res.data.data.user });
        const token = res.data.accessToken;
        localStorage.setItem(userAccessToken, token);
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
      const res = await axiosApi.post("/auth/resend-otp", { email });
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
  verifyForgotPasswordOTP: async (data: {
    phone: string;
    otp: string;
    endpoint: string;
  }) => {
    set({ isSiging: true });
    try {
      const res = await axiosApi.post(data.endpoint, {
        phone: data.phone,
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
