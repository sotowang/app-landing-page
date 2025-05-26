// 认证相关翻译
export const authTranslations = {
  login: {
    title: "Login",
    email: "Email",
    password: "Password",
    submit: "Login",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    register: "Register now",
    success: "Login successful",
    error: "Login failed",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email",
    passwordRequired: "Password is required"
  },
  register: {
    title: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    verificationCode: "Verification Code",
    getCode: "Get Code",
    submit: "Register",
    hasAccount: "Already have an account?",
    login: "Login now",
    success: "Registration successful",
    error: "Registration failed",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email",
    passwordRequired: "Password is required",
    passwordTooShort: "Password must be at least 8 characters",
    passwordMismatch: "Passwords do not match",
    passwordsDoNotMatch: "Passwords do not match",
    confirmPasswordRequired: "Please confirm your password",
    codeRequired: "Verification code is required",
    verificationCodeRequired: "Verification code is required",
    codeSent: "Verification code sent",
    codeSendError: "Failed to send verification code"
  },
  resetPassword: {
    title: "Reset Password",
    email: "Email",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    verificationCode: "Verification Code",
    getCode: "Get Code",
    submit: "Reset Password",
    backToLogin: "Back to login",
    success: "Password reset successful",
    error: "Password reset failed",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email",
    passwordRequired: "New password is required",
    passwordMismatch: "Passwords do not match",
    codeRequired: "Verification code is required",
    codeSent: "Verification code sent",
    codeSendError: "Failed to send verification code"
  }
};

// 为了向后兼容，保留enTranslations导出
export const enTranslations = {
  auth: authTranslations
};