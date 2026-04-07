import { Router } from "express";
import z from "zod";
import { prisma } from "../db";
import { isAuthenticated, AuthRequest } from "../middleware/isLogined";

const router = Router();

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
});

router.post("/", isAuthenticated, async (req: AuthRequest, res) => {
  try {
    const validation = postSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        ok: false,
        error: "Validation failed",
        details: validation.error.format(),
      });
    }

    const { title, content } = validation.data;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.userId!,
      },
    });

    res.status(201).json({ ok: true, post });
  } catch (e) {
    console.error("Create post error:", e);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { id: true, username: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json({ ok: true, posts });
  } catch (e) {
    console.error("Get posts error:", e);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ ok: false, error: "Invalid post ID" });
    }

    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, username: true } } },
    });

    if (!post) {
      return res.status(404).json({ ok: false, error: "Post not found" });
    }

    res.json({ ok: true, post });
  } catch (e) {
    console.error("Get post error:", e);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.put("/:id", isAuthenticated, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ ok: false, error: "Invalid post ID" });
    }

    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      return res.status(404).json({ ok: false, error: "Post not found" });
    }
    if (existingPost.authorId !== req.userId) {
      return res.status(403).json({ ok: false, error: "You can only edit your own posts" });
    }

    const validation = postSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        ok: false,
        error: "Validation failed",
        details: validation.error.format(),
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: validation.data,
    });

    res.json({ ok: true, post: updatedPost });
  } catch (e) {
    console.error("Update post error:", e);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.delete("/:id", isAuthenticated, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ ok: false, error: "Invalid post ID" });
    }

    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      return res.status(404).json({ ok: false, error: "Post not found" });
    }
    if (existingPost.authorId !== req.userId) {
      return res.status(403).json({ ok: false, error: "You can only delete your own posts" });
    }

    await prisma.post.delete({ where: { id } });
    res.json({ ok: true });
  } catch (e) {
    console.error("Delete post error:", e);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

export default router;