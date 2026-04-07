import { Router } from "express";
import type { Request, Response } from "express";
import type { LoginBody, RegisterBody } from "../types/auth.types";
import { prisma } from "../db";
import { userRegistrationSchema } from "../schemas/registrationSchema";
import { hashPass } from "../utils/hashPassword";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

// Регистрация
router.post("/register", async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const validation = await userRegistrationSchema.safeParseAsync(req.body);
    if (!validation.success) {
      return res.status(400).json({
        ok: false,
        error: "Validation failed",
        details: validation.error.format(),
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({
        ok: false,
        error: "User already exists",
      });
    }

    const hashedPass = await hashPass(password);
    const newUser = await prisma.user.create({
      data: { username, password: hashedPass, email },
    });

    const shortLivedToken = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: "30m" }
    );

    const longLivedToken = jwt.sign(
      { userId: newUser.id },
      process.env.REFRESH_SECRET!,
      { expiresIn: "90d" }
    );

    await prisma.hashedTokens.create({
      data: {
        userId: newUser.id,
        token: await hashPass(longLivedToken),
      },
    });

    res.cookie("short-lived-token", shortLivedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    });

    res.cookie("long-lived-token", longLivedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 90 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      ok: true,
      user_id: newUser.id,
    });
  } catch (e) {
    console.error("Registration error:", e);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// Логин
router.post("/login", async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ ok: false, error: "Invalid password" });
    }

    const shortLivedToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "30m" }
    );

    const longLivedToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_SECRET!,
      { expiresIn: "90d" }
    );

    res.cookie("short-lived-token", shortLivedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    });

    res.cookie("long-lived-token", longLivedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 90 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      ok: true,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// Обновление токена
router.post("/refresh", async (req: Request, res: Response) => {
  const longLivedToken = req.cookies["long-lived-token"];
  if (!longLivedToken) {
    return res.status(401).json({ ok: false, error: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(longLivedToken, process.env.REFRESH_SECRET!) as { userId: number };
    const hashed = await hashPass(longLivedToken);

    const storedToken = await prisma.hashedTokens.findFirst({
      where: {
        token: hashed,
        userId: decoded.userId,
      },
    });
    if (!storedToken) {
      return res.status(401).json({ ok: false, error: "Refresh token revoked" });
    }

    const newShortLived = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "30m" }
    );

    res.cookie("short-lived-token", newShortLived, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    });

    res.json({ ok: true });
  } catch (e) {
    return res.status(401).json({ ok: false, error: "Invalid refresh token" });
  }
});

// Выход
router.post("/logout", async (req: Request, res: Response) => {
  const longLivedToken = req.cookies["long-lived-token"];
  if (longLivedToken) {
    try {
      const hashed = await hashPass(longLivedToken);
      await prisma.hashedTokens.deleteMany({ where: { token: hashed } });
    } catch (e) {
    }
  }

  res.clearCookie("short-lived-token");
  res.clearCookie("long-lived-token");
  res.json({ ok: true });
});

export default router;
