import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const USER_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  passportNo: true,
  address: true,
  zipCode: true,
  city: true,
  country: true,
  phoneCode: true,
  phoneNumber: true,
  role: true,
  profileImage: true,
} as const;

type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  passportNo: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
};

type UpdateProfileData = {
  firstName: string;
  lastName: string;
  passportNo: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
};

// Kolla om användare redan finns med samma email eller passnummer
export const findExistingUser = async (email: string, passportNo: string) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email }, { passportNo }],
    },
  });
};

// Skapa ny användare med hashat lösenord
export const createUser = async (data: RegisterData) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      passportNo: data.passportNo,
      address: data.address,
      zipCode: data.zipCode,
      city: data.city,
      country: data.country,
      phoneCode: data.phoneCode,
      phoneNumber: data.phoneNumber,
    },
  });
};

// Hitta användare via email och verifiera lösenord
export const verifyUserCredentials = async (
  email: string,
  password: string,
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};

// Skapa JWT-token för inloggad användare
export const createToken = (userId: number, role: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET saknas i miljövariabler.");
  }

  return jwt.sign({ userId, role }, secret, { expiresIn: "1d" });
};

// Uppdatera profilbild
export const updateUserProfileImage = async (
  userId: number,
  imageBase64: string,
) => {
  return prisma.user.update({
    where: { id: userId },
    data: { profileImage: imageBase64 },
    select: USER_SELECT,
  });
};

// Uppdatera profildata
export const updateUserProfile = async (
  userId: number,
  data: UpdateProfileData,
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: USER_SELECT,
  });
};
