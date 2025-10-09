import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import { storage } from "./storage";
import { uploadMiddleware, handleImageUpload } from "./upload";
import {
  insertNewsSchema, updateNewsSchema,
  insertEventSchema, updateEventSchema,
  insertPublicationSchema, updatePublicationSchema,
  insertLeadershipSchema, updateLeadershipSchema,
  insertGallerySchema, updateGallerySchema,
  insertInductionFormSchema, updateInductionFormSchema,
  insertSettingSchema, updateSettingSchema,
  insertAdminUserSchema,
  type AdminUser
} from "@shared/schema";

// Extend Express Request to include session and adminUser
declare module 'express-serve-static-core' {
  interface Request {
    session: {
      adminId?: string;
      destroy: (callback: (err: any) => void) => void;
    };
    adminUser?: AdminUser;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files statically
  app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

  // Admin Authentication Routes
  app.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      console.log('[Login] Attempt - Username:', username);
      console.log('[Login] Password length received:', password?.length);

      const user = await storage.getAdminUserByUsername(username);
      console.log('[Login] User found:', user ? 'YES' : 'NO');

      if (user) {
        console.log('[Login] Stored username:', user.username);
        console.log('[Login] Stored password length:', user.password?.length);
        console.log('[Login] Password match:', user.password === password);
        console.log('[Login] User active:', user.isActive);
      }

      if (!user || user.password !== password || !user.isActive) {
        console.log('[Login] FAILED - Invalid credentials');
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // In a real app, you'd generate a JWT here
      req.session.adminId = user.id;
      console.log('[Login] SUCCESS - User logged in');
      res.json({ user: { ...user, password: undefined } });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/logout", (req: Request, res: Response) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ error: "Could not log out" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", async (req: Request, res: Response) => {
    try {
      if (!req.session.adminId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      const user = await storage.getAdminUser(req.session.adminId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      
      res.json({ user: { ...user, password: undefined } });
    } catch (error: any) {
      console.error("Get admin user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Middleware to check admin authentication
  const requireAuth = async (req: Request, res: Response, next: any) => {
    if (!req.session.adminId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const user = await storage.getAdminUser(req.session.adminId);
    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Invalid or inactive user" });
    }
    
    req.adminUser = user;
    next();
  };

  // News Routes
  app.get("/api/news", async (req: Request, res: Response) => {
    try {
      const { published } = req.query;
      const publishedFilter = published === "true" ? true : published === "false" ? false : undefined;
      const news = await storage.getAllNews(publishedFilter);
      res.json(news);
    } catch (error: any) {
      console.error("Get news error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/news/featured", async (req, res) => {
    try {
      const news = await storage.getFeaturedNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const news = await storage.getNews(req.params.id);
      if (!news) {
        return res.status(404).json({ error: "News article not found" });
      }
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/news", requireAuth, async (req, res) => {
    try {
      const validatedData = insertNewsSchema.parse(req.body);
      const news = await storage.createNews({ 
        ...validatedData, 
        authorId: req.adminUser.id 
      });
      res.status(201).json(news);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/news/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = updateNewsSchema.parse(req.body);
      const news = await storage.updateNews(req.params.id, validatedData);
      if (!news) {
        return res.status(404).json({ error: "News article not found" });
      }
      res.json(news);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/news/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteNews(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "News article not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Events Routes
  app.get("/api/events", async (req, res) => {
    try {
      const { published } = req.query;
      const publishedFilter = published === "true" ? true : published === "false" ? false : undefined;
      const events = await storage.getAllEvents(publishedFilter);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/events/upcoming", async (req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/events", requireAuth, async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/events/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = updateEventSchema.parse(req.body);
      const event = await storage.updateEvent(req.params.id, validatedData);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/events/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteEvent(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Publications Routes
  app.get("/api/publications", async (req, res) => {
    try {
      const { published, type } = req.query;
      const publishedFilter = published === "true" ? true : published === "false" ? false : undefined;
      
      if (type) {
        const publications = await storage.getPublicationsByType(type as string);
        res.json(publications);
      } else {
        const publications = await storage.getAllPublications(publishedFilter);
        res.json(publications);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/publications/:id", async (req, res) => {
    try {
      const publication = await storage.getPublication(req.params.id);
      if (!publication) {
        return res.status(404).json({ error: "Publication not found" });
      }
      res.json(publication);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/publications", requireAuth, async (req, res) => {
    try {
      const validatedData = insertPublicationSchema.parse(req.body);
      const publication = await storage.createPublication(validatedData);
      res.status(201).json(publication);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/publications/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = updatePublicationSchema.parse(req.body);
      const publication = await storage.updatePublication(req.params.id, validatedData);
      if (!publication) {
        return res.status(404).json({ error: "Publication not found" });
      }
      res.json(publication);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/publications/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deletePublication(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Publication not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Leadership Routes
  app.get("/api/leadership", async (req, res) => {
    try {
      const { active } = req.query;
      const activeFilter = active === "true" ? true : active === "false" ? false : undefined;
      const leadership = await storage.getAllLeadership(activeFilter);
      res.json(leadership);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/leadership/:id", async (req, res) => {
    try {
      const member = await storage.getLeadershipMember(req.params.id);
      if (!member) {
        return res.status(404).json({ error: "Leadership member not found" });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/leadership", requireAuth, async (req, res) => {
    try {
      const validatedData = insertLeadershipSchema.parse(req.body);
      const member = await storage.createLeadershipMember(validatedData);
      res.status(201).json(member);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/leadership/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = updateLeadershipSchema.parse(req.body);
      const member = await storage.updateLeadershipMember(req.params.id, validatedData);
      if (!member) {
        return res.status(404).json({ error: "Leadership member not found" });
      }
      res.json(member);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/leadership/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteLeadershipMember(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Leadership member not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Gallery Routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const { published, category } = req.query;
      
      if (category) {
        const images = await storage.getGalleryByCategory(category as string);
        res.json(images);
      } else {
        const publishedFilter = published === "true" ? true : published === "false" ? false : undefined;
        const images = await storage.getAllGalleryImages(publishedFilter);
        res.json(images);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const image = await storage.getGalleryImage(req.params.id);
      if (!image) {
        return res.status(404).json({ error: "Gallery image not found" });
      }
      res.json(image);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/gallery", requireAuth, async (req, res) => {
    try {
      const validatedData = insertGallerySchema.parse(req.body);
      const image = await storage.createGalleryImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/gallery/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = updateGallerySchema.parse(req.body);
      const image = await storage.updateGalleryImage(req.params.id, validatedData);
      if (!image) {
        return res.status(404).json({ error: "Gallery image not found" });
      }
      res.json(image);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/gallery/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteGalleryImage(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Gallery image not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Induction Form Routes (Public submission, Admin management)
  app.post("/api/induction-forms", async (req, res) => {
    try {
      const validatedData = insertInductionFormSchema.parse(req.body);
      const form = await storage.createInductionForm(validatedData);
      res.json(form);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/induction-forms", requireAuth, async (req, res) => {
    try {
      const forms = await storage.getAllInductionForms();
      res.json(forms);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/induction-forms/:id", requireAuth, async (req, res) => {
    try {
      const form = await storage.getInductionFormById(req.params.id);
      if (!form) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.json(form);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/induction-forms/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = updateInductionFormSchema.parse(req.body);
      const form = await storage.updateInductionForm(req.params.id, validatedData);
      if (!form) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.json(form);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/induction-forms/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteInductionForm(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Settings Routes (Admin only)
  app.get("/api/settings/:key", async (req, res) => {
    try {
      const setting = await storage.getSettingByKey(req.params.key);
      if (!setting) {
        return res.status(404).json({ error: "Setting not found" });
      }
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/settings/:key", requireAuth, async (req, res) => {
    try {
      const { value } = req.body;
      if (!value) {
        return res.status(400).json({ error: "Value is required" });
      }
      const setting = await storage.upsertSetting(req.params.key, value);
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Resources Routes
  app.get("/api/resources", async (req, res) => {
    try {
      const { published } = req.query;
      const publishedFilter = published === "true" ? true : published === "false" ? false : undefined;
      const resources = await storage.getAllResources(publishedFilter);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/resources", requireAuth, async (req, res) => {
    try {
      const resource = await storage.createResource(req.body);
      res.status(201).json(resource);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/resources/:id", requireAuth, async (req, res) => {
    try {
      const resource = await storage.updateResource(req.params.id, req.body);
      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/resources/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteResource(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Courses Routes
  app.get("/api/courses", async (req, res) => {
    try {
      const { published } = req.query;
      const publishedFilter = published === "true" ? true : published === "false" ? false : undefined;
      const courses = await storage.getAllCourses(publishedFilter);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/courses", requireAuth, async (req, res) => {
    try {
      const course = await storage.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/courses/:id", requireAuth, async (req, res) => {
    try {
      const course = await storage.updateCourse(req.params.id, req.body);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/courses/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteCourse(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Scholarships Routes
  app.get("/api/scholarships", async (req, res) => {
    try {
      const { published } = req.query;
      const publishedFilter = published === "true" ? true : published === "false" ? false : undefined;
      const scholarships = await storage.getAllScholarships(publishedFilter);
      res.json(scholarships);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/scholarships", requireAuth, async (req, res) => {
    try {
      const scholarship = await storage.createScholarship(req.body);
      res.status(201).json(scholarship);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/scholarships/:id", requireAuth, async (req, res) => {
    try {
      const scholarship = await storage.updateScholarship(req.params.id, req.body);
      if (!scholarship) {
        return res.status(404).json({ error: "Scholarship not found" });
      }
      res.json(scholarship);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/scholarships/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteScholarship(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Scholarship not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Image Upload Route
  app.post("/api/upload/image", requireAuth, uploadMiddleware, handleImageUpload);

  const httpServer = createServer(app);
  return httpServer;
}
