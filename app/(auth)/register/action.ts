import { z } from "zod";

const emailSchema = z.string().email("올바른 이메일 형식이 아닙니다");
const verificationCodeSchema = z
  .string()
  .length(6, "6자리 숫자를 입력해주세요");

const nameSchema = z
  .string()
  .min(2, "이름은 최소 2자 이상이어야 합니다")
  .max(50, "이름이 너무 깁니다");

const birthSchema = z
  .string()
  .length(6, "생년월일은 6자리여야 합니다")
  .regex(/^\d+$/, "숫자만 입력해주세요");

const nicknameSchema = z
  .string()
  .min(2, "닉네임은 최소 2자 이상이어야 합니다")
  .max(20, "닉네임은 최대 20자까지 가능합니다")
  .optional();

export const validateEmail = (
  email: string
): {
  success: boolean;
  error?: string;
} => {
  try {
    emailSchema.parse(email);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }
    return {
      success: false,
      error: "올바른 이메일 형식이 아닙니다",
    };
  }
};

export const validateVerificationCode = (
  verificationCode: string
): {
  success: boolean;
  error?: string;
} => {
  try {
    verificationCodeSchema.parse(verificationCode);
    return { success: true };
  } catch (error) {
    return { success: false, error: "올바른 인증코드를 입력해주세요" };
  }
};

export const validateName = (name: string) => {
  try {
    nameSchema.parse(name);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }
    return {
      success: false,
      error: "올바른 이름을 입력해주세요",
    };
  }
};

export const validateBirth = (birth: string) => {
  try {
    birthSchema.parse(birth);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }
    return {
      success: false,
      error: "올바른 생년월일을 입력해주세요",
    };
  }
};

export const validateNickname = (nickname?: string) => {
  if (!nickname) return { success: true };
  try {
    nicknameSchema.parse(nickname);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }
    return {
      success: false,
      error: "올바른 닉네임을 입력해주세요",
    };
  }
};
