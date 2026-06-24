import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginuser } from "./auth.interface";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtutils } from "../../utils/jwt";

const loginUer = async (payload: ILoginuser) => {
  const { email, password } = payload;

  //   const user = await prisma.user.findUnique({
  //     where: { email },
  //   });
  //   if (!user) {
  //     throw new Error("user not found");
  //   }
  // };

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("password is incorrect");
  }

  const jwtPaylad = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  //   const accessToken = jwt.sign(jwtPaylad, config.jwt_access_secret, {
  //     expiresIn: config.jwt_access_expires_in,
  //   } as SignOptions);

  const accessToken = jwtutils.createToken(
    jwtPaylad,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  //   const refreshToken = jwt.sign(jwtPaylad, config.jwt_refresh_secret, {
  //     expiresIn: config.jwt_refresh_expires_in,
  //   } as SignOptions);

  const refreshToken = jwtutils.createToken(
    jwtPaylad,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken
  };
};


export const authService = {
  loginUer
};
