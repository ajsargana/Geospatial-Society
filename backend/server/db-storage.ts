import { eq, desc, asc, and, gt } from "drizzle-orm";
import { db } from "./db";
import * as schema from "@shared/schema";
import {
  type AdminUser, type InsertAdminUser,
  type News, type InsertNews, type UpdateNews,
  type Event, type InsertEvent, type UpdateEvent,
  type Publication, type InsertPublication, type UpdatePublication,
  type Leadership, type InsertLeadership, type UpdateLeadership,
  type Gallery, type InsertGallery, type UpdateGallery,
  type InductionForm, type InsertInductionForm, type UpdateInductionForm,
  type Setting, type InsertSetting, type UpdateSetting,
  type Resource, type InsertResource, type UpdateResource,
  type Course, type InsertCourse, type UpdateCourse,
  type Scholarship, type InsertScholarship, type UpdateScholarship,
  type User, type InsertUser
} from "@shared/schema";
import type { IStorage } from "./storage";

export class DbStorage implements IStorage {
  // Admin Users
  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    const result = await db.select().from(schema.adminUsers).where(eq(schema.adminUsers.id, id)).limit(1);
    return result[0];
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const result = await db.select().from(schema.adminUsers).where(eq(schema.adminUsers.username, username)).limit(1);
    return result[0];
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const result = await db.select().from(schema.adminUsers).where(eq(schema.adminUsers.email, email)).limit(1);
    return result[0];
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const result = await db.insert(schema.adminUsers).values(user).returning();
    return result[0];
  }

  async updateAdminUser(id: string, user: Partial<InsertAdminUser>): Promise<AdminUser | undefined> {
    const result = await db.update(schema.adminUsers)
      .set({ ...user, updatedAt: new Date() })
      .where(eq(schema.adminUsers.id, id))
      .returning();
    return result[0];
  }

  async deleteAdminUser(id: string): Promise<boolean> {
    const result = await db.delete(schema.adminUsers).where(eq(schema.adminUsers.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    return await db.select().from(schema.adminUsers);
  }

  // News
  async getNews(id: string): Promise<News | undefined> {
    const result = await db.select().from(schema.news).where(eq(schema.news.id, id)).limit(1);
    return result[0];
  }

  async getAllNews(published?: boolean): Promise<News[]> {
    if (published !== undefined) {
      return await db.select().from(schema.news)
        .where(eq(schema.news.published, published))
        .orderBy(desc(schema.news.createdAt));
    }
    return await db.select().from(schema.news).orderBy(desc(schema.news.createdAt));
  }

  async createNews(news: InsertNews): Promise<News> {
    const result = await db.insert(schema.news).values(news).returning();
    return result[0];
  }

  async updateNews(id: string, newsData: UpdateNews): Promise<News | undefined> {
    const result = await db.update(schema.news)
      .set({ ...newsData, updatedAt: new Date() })
      .where(eq(schema.news.id, id))
      .returning();
    return result[0];
  }

  async deleteNews(id: string): Promise<boolean> {
    const result = await db.delete(schema.news).where(eq(schema.news.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getFeaturedNews(): Promise<News[]> {
    return await db.select().from(schema.news)
      .where(and(eq(schema.news.featured, true), eq(schema.news.published, true)))
      .orderBy(desc(schema.news.createdAt));
  }

  // Events
  async getEvent(id: string): Promise<Event | undefined> {
    const result = await db.select().from(schema.events).where(eq(schema.events.id, id)).limit(1);
    return result[0];
  }

  async getAllEvents(published?: boolean): Promise<Event[]> {
    if (published !== undefined) {
      return await db.select().from(schema.events)
        .where(eq(schema.events.published, published))
        .orderBy(asc(schema.events.date));
    }
    return await db.select().from(schema.events).orderBy(asc(schema.events.date));
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const eventData = {
      ...event,
      date: typeof event.date === 'string' ? new Date(event.date) : event.date,
    };
    const result = await db.insert(schema.events).values(eventData).returning();
    return result[0];
  }

  async updateEvent(id: string, eventData: UpdateEvent): Promise<Event | undefined> {
    const updateData = {
      ...eventData,
      date: eventData.date ? (typeof eventData.date === 'string' ? new Date(eventData.date) : eventData.date) : undefined,
      updatedAt: new Date()
    };
    const result = await db.update(schema.events)
      .set(updateData)
      .where(eq(schema.events.id, id))
      .returning();
    return result[0];
  }

  async deleteEvent(id: string): Promise<boolean> {
    const result = await db.delete(schema.events).where(eq(schema.events.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return await db.select().from(schema.events)
      .where(and(eq(schema.events.published, true), gt(schema.events.date, now)))
      .orderBy(asc(schema.events.date));
  }

  // Publications
  async getPublication(id: string): Promise<Publication | undefined> {
    const result = await db.select().from(schema.publications).where(eq(schema.publications.id, id)).limit(1);
    return result[0];
  }

  async getAllPublications(published?: boolean): Promise<Publication[]> {
    if (published !== undefined) {
      return await db.select().from(schema.publications)
        .where(eq(schema.publications.published, published))
        .orderBy(desc(schema.publications.date));
    }
    return await db.select().from(schema.publications).orderBy(desc(schema.publications.date));
  }

  async createPublication(publication: InsertPublication): Promise<Publication> {
    const pubData = {
      ...publication,
      date: typeof publication.date === 'string' ? new Date(publication.date) : publication.date,
    };
    const result = await db.insert(schema.publications).values(pubData).returning();
    return result[0];
  }

  async updatePublication(id: string, publicationData: UpdatePublication): Promise<Publication | undefined> {
    const updateData = {
      ...publicationData,
      date: publicationData.date ? (typeof publicationData.date === 'string' ? new Date(publicationData.date) : publicationData.date) : undefined,
      updatedAt: new Date()
    };
    const result = await db.update(schema.publications)
      .set(updateData)
      .where(eq(schema.publications.id, id))
      .returning();
    return result[0];
  }

  async deletePublication(id: string): Promise<boolean> {
    const result = await db.delete(schema.publications).where(eq(schema.publications.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getPublicationsByType(type: string): Promise<Publication[]> {
    return await db.select().from(schema.publications)
      .where(and(eq(schema.publications.type, type), eq(schema.publications.published, true)))
      .orderBy(desc(schema.publications.date));
  }

  // Leadership
  async getLeadershipMember(id: string): Promise<Leadership | undefined> {
    const result = await db.select().from(schema.leadership).where(eq(schema.leadership.id, id)).limit(1);
    return result[0];
  }

  async getAllLeadership(active?: boolean): Promise<Leadership[]> {
    if (active !== undefined) {
      return await db.select().from(schema.leadership)
        .where(eq(schema.leadership.active, active))
        .orderBy(asc(schema.leadership.order));
    }
    return await db.select().from(schema.leadership).orderBy(asc(schema.leadership.order));
  }

  async createLeadershipMember(member: InsertLeadership): Promise<Leadership> {
    const result = await db.insert(schema.leadership).values(member).returning();
    return result[0];
  }

  async updateLeadershipMember(id: string, memberData: UpdateLeadership): Promise<Leadership | undefined> {
    const result = await db.update(schema.leadership)
      .set({ ...memberData, updatedAt: new Date() })
      .where(eq(schema.leadership.id, id))
      .returning();
    return result[0];
  }

  async deleteLeadershipMember(id: string): Promise<boolean> {
    const result = await db.delete(schema.leadership).where(eq(schema.leadership.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Gallery
  async getGalleryImage(id: string): Promise<Gallery | undefined> {
    const result = await db.select().from(schema.gallery).where(eq(schema.gallery.id, id)).limit(1);
    return result[0];
  }

  async getAllGalleryImages(published?: boolean): Promise<Gallery[]> {
    if (published !== undefined) {
      return await db.select().from(schema.gallery)
        .where(eq(schema.gallery.published, published))
        .orderBy(desc(schema.gallery.uploadedAt));
    }
    return await db.select().from(schema.gallery).orderBy(desc(schema.gallery.uploadedAt));
  }

  async createGalleryImage(image: InsertGallery): Promise<Gallery> {
    const result = await db.insert(schema.gallery).values(image).returning();
    return result[0];
  }

  async updateGalleryImage(id: string, imageData: UpdateGallery): Promise<Gallery | undefined> {
    const result = await db.update(schema.gallery)
      .set(imageData)
      .where(eq(schema.gallery.id, id))
      .returning();
    return result[0];
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    const result = await db.delete(schema.gallery).where(eq(schema.gallery.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getGalleryByCategory(category: string): Promise<Gallery[]> {
    return await db.select().from(schema.gallery)
      .where(and(eq(schema.gallery.category, category), eq(schema.gallery.published, true)))
      .orderBy(desc(schema.gallery.uploadedAt));
  }

  // Induction Forms
  async createInductionForm(formData: InsertInductionForm): Promise<InductionForm> {
    const result = await db.insert(schema.inductionForms).values(formData).returning();
    return result[0];
  }

  async getAllInductionForms(): Promise<InductionForm[]> {
    return await db.select().from(schema.inductionForms).orderBy(desc(schema.inductionForms.submittedAt));
  }

  async getInductionFormById(id: string): Promise<InductionForm | undefined> {
    const result = await db.select().from(schema.inductionForms).where(eq(schema.inductionForms.id, id)).limit(1);
    return result[0];
  }

  async updateInductionForm(id: string, formData: UpdateInductionForm): Promise<InductionForm | undefined> {
    const result = await db.update(schema.inductionForms)
      .set(formData)
      .where(eq(schema.inductionForms.id, id))
      .returning();
    return result[0];
  }

  async deleteInductionForm(id: string): Promise<boolean> {
    const result = await db.delete(schema.inductionForms).where(eq(schema.inductionForms.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Settings
  async getSettingByKey(key: string): Promise<Setting | undefined> {
    const result = await db.select().from(schema.settings).where(eq(schema.settings.key, key)).limit(1);
    return result[0];
  }

  async upsertSetting(key: string, value: string): Promise<Setting> {
    const existing = await this.getSettingByKey(key);

    if (existing) {
      const result = await db.update(schema.settings)
        .set({ value, updatedAt: new Date() })
        .where(eq(schema.settings.key, key))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(schema.settings).values({ key, value }).returning();
      return result[0];
    }
  }

  // Resources
  async getResource(id: string): Promise<Resource | undefined> {
    const result = await db.select().from(schema.resources).where(eq(schema.resources.id, id)).limit(1);
    return result[0];
  }

  async getAllResources(published?: boolean): Promise<Resource[]> {
    if (published !== undefined) {
      return await db.select().from(schema.resources)
        .where(eq(schema.resources.published, published))
        .orderBy(asc(schema.resources.order));
    }
    return await db.select().from(schema.resources).orderBy(asc(schema.resources.order));
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const result = await db.insert(schema.resources).values(resource).returning();
    return result[0];
  }

  async updateResource(id: string, resourceData: UpdateResource): Promise<Resource | undefined> {
    const result = await db.update(schema.resources)
      .set({ ...resourceData, updatedAt: new Date() })
      .where(eq(schema.resources.id, id))
      .returning();
    return result[0];
  }

  async deleteResource(id: string): Promise<boolean> {
    const result = await db.delete(schema.resources).where(eq(schema.resources.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Courses
  async getCourse(id: string): Promise<Course | undefined> {
    const result = await db.select().from(schema.courses).where(eq(schema.courses.id, id)).limit(1);
    return result[0];
  }

  async getAllCourses(published?: boolean): Promise<Course[]> {
    if (published !== undefined) {
      return await db.select().from(schema.courses)
        .where(eq(schema.courses.published, published))
        .orderBy(asc(schema.courses.order));
    }
    return await db.select().from(schema.courses).orderBy(asc(schema.courses.order));
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const result = await db.insert(schema.courses).values(course).returning();
    return result[0];
  }

  async updateCourse(id: string, courseData: UpdateCourse): Promise<Course | undefined> {
    const result = await db.update(schema.courses)
      .set({ ...courseData, updatedAt: new Date() })
      .where(eq(schema.courses.id, id))
      .returning();
    return result[0];
  }

  async deleteCourse(id: string): Promise<boolean> {
    const result = await db.delete(schema.courses).where(eq(schema.courses.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Scholarships
  async getScholarship(id: string): Promise<Scholarship | undefined> {
    const result = await db.select().from(schema.scholarships).where(eq(schema.scholarships.id, id)).limit(1);
    return result[0];
  }

  async getAllScholarships(published?: boolean): Promise<Scholarship[]> {
    if (published !== undefined) {
      return await db.select().from(schema.scholarships)
        .where(eq(schema.scholarships.published, published))
        .orderBy(asc(schema.scholarships.order));
    }
    return await db.select().from(schema.scholarships).orderBy(asc(schema.scholarships.order));
  }

  async createScholarship(scholarship: InsertScholarship): Promise<Scholarship> {
    const result = await db.insert(schema.scholarships).values(scholarship).returning();
    return result[0];
  }

  async updateScholarship(id: string, scholarshipData: UpdateScholarship): Promise<Scholarship | undefined> {
    const result = await db.update(schema.scholarships)
      .set({ ...scholarshipData, updatedAt: new Date() })
      .where(eq(schema.scholarships.id, id))
      .returning();
    return result[0];
  }

  async deleteScholarship(id: string): Promise<boolean> {
    const result = await db.delete(schema.scholarships).where(eq(schema.scholarships.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Legacy compatibility
  async getUser(id: string): Promise<User | undefined> {
    return this.getAdminUser(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.getAdminUserByUsername(username);
  }

  async createUser(user: InsertUser): Promise<User> {
    return this.createAdminUser(user);
  }
}
