import { api } from "@/lib/api";

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  token?: string;
}

export interface AuthResponse {
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface RegisterResponse {
  message: string;
  data: {
    email: string;
  };
}

export interface OtpVerifyResponse {
  status: boolean;
  code: number;
  data: {
    _id: string;
    username: string;
    email: string;
    userType: string;
    password: string;
    plainPassword: string;
    otpCode: string;
    uid: string;
    isVerifyEmail: boolean;
    isVerifyNumber: boolean;
    number: string;
    firstName: string;
    lastName: string;
    image: string;
    otpExpiresAt: string;
    tokenFCM: string;
    status: boolean;
    userStatus: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  error?: {
    type: string;
    message: string;
  };
}

/**
 * Service for authentication-related API calls
 */
export const AuthService = {
  /**
   * Register a new user
   */
  register: async (
    email: string,
    username: string,
    password = "123456",
    loginType = "email",
  ): Promise<RegisterResponse> => {
    try {
      
      const response = await api.post<RegisterResponse>(
        "api/v1/user/register",
        {
          email,
          username,
          password,
          loginType,
        },
      );
      return response;
    } catch (error) {
      console.error("Failed to register user:", error);
      throw error;
    }
  },

  /**
   * Login a user
   */
  login: async (
    email: string,
    password: string,
  ): Promise<AuthResponse | any> => {
    try {
    
      const data = await api.post<AuthResponse>("api/v1/user/user-login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.data.token);

      return { message: "Login successful", data };
    } catch (error: any) {
      // error is actually the object returned from fetchApi with { ok, status, data, message }
      console.error("Auth service error:", error);
      if (
        error.status === 400 &&
        error.data?.error?.type === "NUMBERVERIFY" &&
        error.data?.data
      ) {
        const userData = error.data.data;

        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: userData._id,
            username: userData.username || userData.email.split("@")[0],
            email: userData.email,
            role: userData.userType,
          }),
        );
        localStorage.setItem("token", `temp_${userData._id}`);

        return error.data;
      }

      // For other errors, throw the original error with proper message
      throw new Error(error.data?.message || error.message || "Login failed");
    }
  },

  /**
   * Verify OTP - handles optional number verification
   */
  verifyOtp: async (email: string, otp: string): Promise<OtpVerifyResponse> => {
    try {
      const response = await api.post<OtpVerifyResponse>(
        "api/v1/user/otp-verify",
        {
          email,
          otp,
        },
      );

      // Check if we have user data even with a 400 status
      if (response.data && response.status) {
        // Store user data in localStorage
        const userData = {
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email,
          role: response.data.userType,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        // For now, we'll use a temporary token since the API doesn't provide one
        // You might want to get a proper token from the login endpoint
        localStorage.setItem("token", `temp_${response.data._id}`);
      }

      return response;
    } catch (error: any) {
      
      // Check if it's a 400 error
      if (error?.status === 400) {
        const responseData = error.data as OtpVerifyResponse;

        return responseData;
      }

      console.error("Failed to verify OTP:", error);
      throw error;
    }
  },

  /**
   * Resend OTP
   */
  resendOtp: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>(
        "api/v1/user/resend-otp",
        {
          email,
        },
      );
      return response;
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      throw error;
    }
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  },

  /**
   * Get current user
   */
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    
    const userStr = localStorage.getItem("user");

    if (!userStr || userStr === "undefined" || userStr === "null") {
      return null;
    }

    try {
      return JSON.parse(userStr) as User;
    } catch (err) {
      console.error("Invalid JSON in localStorage[user]:", userStr);
      return null;
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (
    userId: string,
    firstName: string,
    lastName: string,
    number: string,
    image?: string,
  ): Promise<{ message: string }> => {
    try {
      const requestBody: any = {
        firstName,
        lastName,
        number,
      };

      // Only include image if it's provided
      if (image) {
        requestBody.image = image;
      }

      const response = await api.post<{ message: string }>(
        `api/v1/user/user-additional/${userId}`,
        requestBody,
      );
      return response;
    } catch (error: any) {
      console.error("Failed to update profile:", error);

      // Handle NUMBERVERIFY error as success (number verification is optional)
      if (
        error.status === 400 &&
        error.data?.error?.type === "NUMBERVERIFY" &&
        error.data?.status === true
      ) {
        return { message: "Profile updated successfully" };
      }

      throw new Error(
        error.data?.message || error.message || "Failed to update profile",
      );
    }
  },

  /**
   * Change user password
   */
  changePassword: async (
    email: string,
    password: string,
    cPassword: string,
  ): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>(
        "api/v1/user/change-password",
        {
          email,
          password,
          cPassword,
        },
      );
      return response;
    } catch (error) {
      console.error("Failed to change password:", error);
      throw error;
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (userId: string): Promise<any> => {
    try {
      const response = await api.get<any>(`api/v1/user/userById/${userId}`);
      return response;
    } catch (error) {
      console.error("Failed to get user by ID:", error);
      throw error;
    }
  },

  /**
   * Update profile image
   */
  updateProfileImage: async (
    userId: string,
    image: string,
  ): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>(
        `api/v1/user/user-additional/${userId}`,
        {
          image,
        },
      );
      return response;
    } catch (error: any) {
      console.error("Failed to update profile image:", error);

      // Handle NUMBERVERIFY error as success (number verification is optional)
      if (
        error.status === 400 &&
        error.data?.error?.type === "NUMBERVERIFY" &&
        error.data?.status === true
      ) {
        return { message: "Profile image updated successfully" };
      }

      throw new Error(
        error.data?.message ||
          error.message ||
          "Failed to update profile image",
      );
    }
  },

  /**
   * Update user address
   */
  updateAddress: async (
    userId: string,
    addressData: {
      doorNumber: string;
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    },
  ): Promise<{ message: string }> => {
    try {
      const response = await api.put<{ message: string }>(
        `api/v1/user/updateAddress/${userId}`,
        addressData,
      );
      return response;
    } catch (error: any) {
      console.error("Failed to update address:", error);
      throw new Error(
        error.data?.message || error.message || "Failed to update address",
      );
    }
  },

  /**
   * Get user addresses
   */
  getUserAddresses: async (userId: string): Promise<any> => {
    try {
      const response = await api.get<any>(
        `api/v1/user/userAddresses/${userId}`,
      );
      return response;
    } catch (error: any) {
      console.error("Failed to get user addresses:", error);
      throw new Error(
        error.data?.message || error.message || "Failed to get user addresses",
      );
    }
  },

  /**
   * Send OTP to phone number
   */
  sendNumberOtp: async (number: string): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>(
        "api/v1/user/sentNumberOtp",
        {
          number,
        },
      );
      return response;
    } catch (error) {
      console.error("Failed to send number OTP:", error);
      throw error;
    }
  },

  /**
   * Verify phone number OTP
   */
  verifyNumberOtp: async (
    otp: string,
    number: string,
  ): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>(
        "api/v1/user/verifyOtpCode/phone",
        {
          otp,
          number,
        },
      );
      return response;
    } catch (error) {
      console.error("Failed to verify number OTP:", error);
      throw error;
    }
  },

  /**
   * Send OTP to phone number (alias for sendNumberOtp for consistency)
   */
  sendOtpToNumber: async (number: string): Promise<{ message: string }> => {
    return AuthService.sendNumberOtp(number);
  },

  /**
   * Verify OTP code (alias for verifyNumberOtp for consistency)
   */
  verifyOtpCode: async (
    otp: string,
    number: string,
  ): Promise<{ message: string }> => {
    return AuthService.verifyNumberOtp(otp, number);
  },

  /**
   * Update user additional details (including number)
   */
  updateAdditionalDetails: async (
    userId: string,
    firstName: string,
    lastName: string,
    number: string,
  ): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>(
        `api/v1/user/user-additional/${userId}`,
        {
          firstName,
          lastName,
          number,
        },
      );
      return response;
    } catch (error: any) {
      console.error("Failed to update additional details:", error);

      // Handle NUMBERVERIFY error as expected (400 error when isVerifyNumber=false)
      if (error.status === 400 && error.data?.error?.type === "NUMBERVERIFY") {
        return { message: "Details updated, number verification required" };
      }

      throw new Error(
        error.data?.message || error.message || "Failed to update details",
      );
    }
  },

  /**
   * Logout user
   */
  logout: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};
