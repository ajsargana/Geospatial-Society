import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin Users
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("admin"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// News Articles
export const news = pgTable("news", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(false),
  imageUrl: text("image_url"),
  authorId: varchar("author_id").references(() => adminUsers.id),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
  publishedAt: timestamp("published_at"),
});

// Events
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // workshop, seminar, conference, webinar
  date: timestamp("date").notNull(),
  endDate: timestamp("end_date"),
  time: text("time").notNull(),
  location: text("location").notNull(),
  capacity: integer("capacity"),
  registered: integer("registered").notNull().default(0),
  published: boolean("published").notNull().default(false),
  imageUrl: text("image_url"),
  registrationUrl: text("registration_url"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Publications
export const publications = pgTable("publications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  authors: text("authors").array().notNull(),
  journal: text("journal").notNull(),
  abstract: text("abstract").notNull(),
  type: text("type").notNull(), // journal, conference, report, newsletter
  date: timestamp("date").notNull(),
  published: boolean("published").notNull().default(false),
  coverUrl: text("cover_url"),
  downloadUrl: text("download_url"),
  externalUrl: text("external_url"),
  doi: text("doi"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Leadership Team
export const leadership = pgTable("leadership", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  role: text("role").notNull(),
  department: text("department").notNull(),
  bio: text("bio").notNull(),
  email: text("email"),
  linkedin: text("linkedin"),
  website: text("website"),
  photoUrl: text("photo_url"),
  expertise: text("expertise").array().notNull(),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Gallery Images
export const gallery = pgTable("gallery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  eventId: varchar("event_id").references(() => events.id),
  published: boolean("published").notNull().default(false),
  uploadedAt: timestamp("uploaded_at").notNull().default(sql`now()`),
});

// Induction Forms (Student Registration)
export const inductionForms = pgTable("induction_forms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  studentId: text("student_id").notNull(),
  department: text("department").notNull(),
  semester: text("semester").notNull(),
  interests: text("interests").array().notNull(),
  experience: text("experience"),
  motivation: text("motivation").notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  submittedAt: timestamp("submitted_at").notNull().default(sql`now()`),
});

// Settings
export const settings = pgTable("settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Resources
export const resources = pgTable("resources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // Software, Platform, License, PDF, Video, eBook, Dataset, Shapefile, Raster
  category: text("category").notNull(), // Software & Tools, Learning Materials, Datasets
  link: text("link").notNull(),
  published: boolean("published").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Courses
export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  instructor: text("instructor").notNull(),
  duration: text("duration").notNull(),
  level: text("level").notNull(), // Beginner, Intermediate, Advanced
  description: text("description").notNull(),
  published: boolean("published").notNull().default(false),
  order: integer("order").notNull().default(0),
  enrollmentUrl: text("enrollment_url"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Scholarships
export const scholarships = pgTable("scholarships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  amount: text("amount").notNull(),
  criteria: text("criteria").notNull(),
  deadline: text("deadline").notNull(),
  published: boolean("published").notNull().default(false),
  order: integer("order").notNull().default(0),
  applicationUrl: text("application_url"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Insert Schemas
export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.string().min(1, "Type is required"),
  date: z.string().min(1, "Date is required").or(z.date()),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  capacity: z.number().optional().nullable(),
  published: z.boolean().default(false),
  imageUrl: z.string().optional().nullable(),
  registrationUrl: z.string().optional().nullable(),
});

export const insertPublicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  authors: z.array(z.string()).min(1, "At least one author is required"),
  journal: z.string().min(1, "Journal/Conference is required"),
  abstract: z.string().min(1, "Abstract is required"),
  type: z.string().min(1, "Type is required"),
  date: z.string().min(1, "Date is required").or(z.date()),
  published: z.boolean().default(false),
  coverUrl: z.string().optional().nullable(),
  downloadUrl: z.string().optional().nullable(),
  externalUrl: z.string().optional().nullable(),
  doi: z.string().optional().nullable(),
});

export const insertLeadershipSchema = createInsertSchema(leadership).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGallerySchema = createInsertSchema(gallery).omit({
  id: true,
  uploadedAt: true,
});

export const insertInductionFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  studentId: z.string().min(1, "Student ID is required"),
  department: z.string().min(1, "Department is required"),
  semester: z.string().min(1, "Semester is required"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  experience: z.string().optional(),
  motivation: z.string().min(10, "Please provide your motivation (minimum 10 characters)"),
});

export const insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
  updatedAt: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertScholarshipSchema = createInsertSchema(scholarships).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update Schemas
export const updateNewsSchema = insertNewsSchema.partial();
export const updateEventSchema = insertEventSchema.partial();
export const updatePublicationSchema = insertPublicationSchema.partial();
export const updateLeadershipSchema = insertLeadershipSchema.partial();
export const updateGallerySchema = insertGallerySchema.partial();
export const updateInductionFormSchema = insertInductionFormSchema.partial();
export const updateSettingSchema = insertSettingSchema.partial();
export const updateResourceSchema = insertResourceSchema.partial();
export const updateCourseSchema = insertCourseSchema.partial();
export const updateScholarshipSchema = insertScholarshipSchema.partial();

// Types
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;

export type News = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type UpdateNews = z.infer<typeof updateNewsSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;

export type Publication = typeof publications.$inferSelect;
export type InsertPublication = z.infer<typeof insertPublicationSchema>;
export type UpdatePublication = z.infer<typeof updatePublicationSchema>;

export type Leadership = typeof leadership.$inferSelect;
export type InsertLeadership = z.infer<typeof insertLeadershipSchema>;
export type UpdateLeadership = z.infer<typeof updateLeadershipSchema>;

export type Gallery = typeof gallery.$inferSelect;
export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type UpdateGallery = z.infer<typeof updateGallerySchema>;

export type InductionForm = typeof inductionForms.$inferSelect;
export type InsertInductionForm = z.infer<typeof insertInductionFormSchema>;
export type UpdateInductionForm = z.infer<typeof updateInductionFormSchema>;

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type UpdateSetting = z.infer<typeof updateSettingSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type UpdateResource = z.infer<typeof updateResourceSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type UpdateCourse = z.infer<typeof updateCourseSchema>;

export type Scholarship = typeof scholarships.$inferSelect;
export type InsertScholarship = z.infer<typeof insertScholarshipSchema>;
export type UpdateScholarship = z.infer<typeof updateScholarshipSchema>;

// Legacy compatibility
export const users = adminUsers;
export const insertUserSchema = insertAdminUserSchema;
export type InsertUser = InsertAdminUser;
export type User = AdminUser;