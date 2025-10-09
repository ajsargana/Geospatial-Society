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
import { nanoid } from "nanoid";
import { randomUUID } from "crypto";

export interface IStorage {
  // Admin Users
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminUser(id: string, user: Partial<InsertAdminUser>): Promise<AdminUser | undefined>;
  deleteAdminUser(id: string): Promise<boolean>;
  getAllAdminUsers(): Promise<AdminUser[]>;

  // News
  getNews(id: string): Promise<News | undefined>;
  getAllNews(published?: boolean): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: string, news: UpdateNews): Promise<News | undefined>;
  deleteNews(id: string): Promise<boolean>;
  getFeaturedNews(): Promise<News[]>;

  // Events
  getEvent(id: string): Promise<Event | undefined>;
  getAllEvents(published?: boolean): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: UpdateEvent): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;
  getUpcomingEvents(): Promise<Event[]>;

  // Publications
  getPublication(id: string): Promise<Publication | undefined>;
  getAllPublications(published?: boolean): Promise<Publication[]>;
  createPublication(publication: InsertPublication): Promise<Publication>;
  updatePublication(id: string, publication: UpdatePublication): Promise<Publication | undefined>;
  deletePublication(id: string): Promise<boolean>;
  getPublicationsByType(type: string): Promise<Publication[]>;

  // Leadership
  getLeadershipMember(id: string): Promise<Leadership | undefined>;
  getAllLeadership(active?: boolean): Promise<Leadership[]>;
  createLeadershipMember(member: InsertLeadership): Promise<Leadership>;
  updateLeadershipMember(id: string, member: UpdateLeadership): Promise<Leadership | undefined>;
  deleteLeadershipMember(id: string): Promise<boolean>;

  // Gallery
  getGalleryImage(id: string): Promise<Gallery | undefined>;
  getAllGalleryImages(published?: boolean): Promise<Gallery[]>;
  createGalleryImage(image: InsertGallery): Promise<Gallery>;
  updateGalleryImage(id: string, image: UpdateGallery): Promise<Gallery | undefined>;
  deleteGalleryImage(id: string): Promise<boolean>;
  getGalleryByCategory(category: string): Promise<Gallery[]>;

  // Resources
  getResource(id: string): Promise<Resource | undefined>;
  getAllResources(published?: boolean): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: string, resource: UpdateResource): Promise<Resource | undefined>;
  deleteResource(id: string): Promise<boolean>;

  // Courses
  getCourse(id: string): Promise<Course | undefined>;
  getAllCourses(published?: boolean): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: UpdateCourse): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<boolean>;

  // Scholarships
  getScholarship(id: string): Promise<Scholarship | undefined>;
  getAllScholarships(published?: boolean): Promise<Scholarship[]>;
  createScholarship(scholarship: InsertScholarship): Promise<Scholarship>;
  updateScholarship(id: string, scholarship: UpdateScholarship): Promise<Scholarship | undefined>;
  deleteScholarship(id: string): Promise<boolean>;

  // Legacy compatibility
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private adminUsers: Map<string, AdminUser> = new Map();
  private news: Map<string, News> = new Map();
  private events: Map<string, Event> = new Map();
  private publications: Map<string, Publication> = new Map();
  private leadership: Map<string, Leadership> = new Map();
  private gallery: Map<string, Gallery> = new Map();
  private inductionForms: Map<string, InductionForm> = new Map();
  private settings: Map<string, Setting> = new Map();
  private resources: Map<string, Resource> = new Map();
  private courses: Map<string, Course> = new Map();
  private scholarships: Map<string, Scholarship> = new Map();

  constructor() {
    // Initialize with some default data for testing
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default admin user from environment variables or defaults
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin123";

    // Debug logging for production
    console.log('[Storage] Initializing admin user...');
    console.log('[Storage] ADMIN_USERNAME from env:', process.env.ADMIN_USERNAME ? 'SET' : 'NOT SET');
    console.log('[Storage] ADMIN_PASSWORD from env:', process.env.ADMIN_PASSWORD ? 'SET' : 'NOT SET');
    console.log('[Storage] Using username:', username);
    console.log('[Storage] Password length:', password.length);

    const defaultAdmin: AdminUser = {
      id: randomUUID(),
      username,
      password, // In real app, this should be hashed
      email: "admin@ist.edu.pk",
      role: "admin",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.adminUsers.set(defaultAdmin.id, defaultAdmin);

    // Add some sample data
    const sampleNews: News = {
      id: randomUUID(),
      title: "Welcome to IST GeoSpatial Society",
      excerpt: "Official launch of our new website and digital platform",
      content: "We are excited to announce the launch of our new website...",
      category: "Announcement",
      featured: true,
      published: true,
      imageUrl: null,
      authorId: defaultAdmin.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
    };
    this.news.set(sampleNews.id, sampleNews);
  }

  // Admin Users
  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    return this.adminUsers.get(id);
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(user => user.username === username);
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(user => user.email === email);
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const id = randomUUID();
    const now = new Date();
    const adminUser: AdminUser = { 
      ...user, 
      id, 
      role: user.role || "admin",
      isActive: user.isActive !== undefined ? user.isActive : true,
      createdAt: now, 
      updatedAt: now 
    };
    this.adminUsers.set(id, adminUser);
    return adminUser;
  }

  async updateAdminUser(id: string, user: Partial<InsertAdminUser>): Promise<AdminUser | undefined> {
    const existing = this.adminUsers.get(id);
    if (!existing) return undefined;
    
    const updated: AdminUser = { 
      ...existing, 
      ...user, 
      updatedAt: new Date() 
    };
    this.adminUsers.set(id, updated);
    return updated;
  }

  async deleteAdminUser(id: string): Promise<boolean> {
    return this.adminUsers.delete(id);
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    return Array.from(this.adminUsers.values());
  }

  // News
  async getNews(id: string): Promise<News | undefined> {
    return this.news.get(id);
  }

  async getAllNews(published?: boolean): Promise<News[]> {
    const allNews = Array.from(this.news.values());
    if (published !== undefined) {
      return allNews.filter(news => news.published === published);
    }
    return allNews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createNews(news: InsertNews): Promise<News> {
    const id = randomUUID();
    const now = new Date();
    const newsItem: News = { 
      ...news, 
      id, 
      createdAt: now, 
      updatedAt: now,
      publishedAt: news.published ? now : null
    };
    this.news.set(id, newsItem);
    return newsItem;
  }

  async updateNews(id: string, news: UpdateNews): Promise<News | undefined> {
    const existing = this.news.get(id);
    if (!existing) return undefined;
    
    const updated: News = { 
      ...existing, 
      ...news, 
      updatedAt: new Date(),
      publishedAt: news.published && !existing.published ? new Date() : existing.publishedAt
    };
    this.news.set(id, updated);
    return updated;
  }

  async deleteNews(id: string): Promise<boolean> {
    return this.news.delete(id);
  }

  async getFeaturedNews(): Promise<News[]> {
    return Array.from(this.news.values())
      .filter(news => news.featured && news.published)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Events
  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getAllEvents(published?: boolean): Promise<Event[]> {
    const allEvents = Array.from(this.events.values());
    if (published !== undefined) {
      return allEvents.filter(event => event.published === published);
    }
    return allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const now = new Date();
    const eventItem: Event = { 
      ...event, 
      id,
      published: event.published ?? false,
      createdAt: now, 
      updatedAt: now 
    };
    this.events.set(id, eventItem);
    return eventItem;
  }

  async updateEvent(id: string, event: UpdateEvent): Promise<Event | undefined> {
    const existing = this.events.get(id);
    if (!existing) return undefined;
    
    const updated: Event = { 
      ...existing, 
      ...event, 
      updatedAt: new Date() 
    };
    this.events.set(id, updated);
    return updated;
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.events.delete(id);
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.events.values())
      .filter(event => event.published && event.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  // Publications
  async getPublication(id: string): Promise<Publication | undefined> {
    return this.publications.get(id);
  }

  async getAllPublications(published?: boolean): Promise<Publication[]> {
    const allPublications = Array.from(this.publications.values());
    if (published !== undefined) {
      return allPublications.filter(pub => pub.published === published);
    }
    return allPublications.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async createPublication(publication: InsertPublication): Promise<Publication> {
    const id = randomUUID();
    const now = new Date();
    const pubItem: Publication = { 
      ...publication, 
      id,
      published: publication.published ?? false,
      createdAt: now, 
      updatedAt: now 
    };
    this.publications.set(id, pubItem);
    return pubItem;
  }

  async updatePublication(id: string, publication: UpdatePublication): Promise<Publication | undefined> {
    const existing = this.publications.get(id);
    if (!existing) return undefined;
    
    const updated: Publication = { 
      ...existing, 
      ...publication, 
      updatedAt: new Date() 
    };
    this.publications.set(id, updated);
    return updated;
  }

  async deletePublication(id: string): Promise<boolean> {
    return this.publications.delete(id);
  }

  async getPublicationsByType(type: string): Promise<Publication[]> {
    return Array.from(this.publications.values())
      .filter(pub => pub.type === type && pub.published)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // Leadership
  async getLeadershipMember(id: string): Promise<Leadership | undefined> {
    return this.leadership.get(id);
  }

  async getAllLeadership(active?: boolean): Promise<Leadership[]> {
    const allLeadership = Array.from(this.leadership.values());
    if (active !== undefined) {
      return allLeadership.filter(member => member.active === active);
    }
    return allLeadership.sort((a, b) => a.order - b.order);
  }

  async createLeadershipMember(member: InsertLeadership): Promise<Leadership> {
    const id = randomUUID();
    const now = new Date();
    const leadershipMember: Leadership = { 
      ...member, 
      id,
      email: member.email ?? null,
      active: member.active ?? true,
      order: member.order ?? 0,
      createdAt: now, 
      updatedAt: now 
    };
    this.leadership.set(id, leadershipMember);
    return leadershipMember;
  }

  async updateLeadershipMember(id: string, member: UpdateLeadership): Promise<Leadership | undefined> {
    const existing = this.leadership.get(id);
    if (!existing) return undefined;
    
    const updated: Leadership = { 
      ...existing, 
      ...member, 
      updatedAt: new Date() 
    };
    this.leadership.set(id, updated);
    return updated;
  }

  async deleteLeadershipMember(id: string): Promise<boolean> {
    return this.leadership.delete(id);
  }

  // Gallery
  async getGalleryImage(id: string): Promise<Gallery | undefined> {
    return this.gallery.get(id);
  }

  async getAllGalleryImages(published?: boolean): Promise<Gallery[]> {
    const allImages = Array.from(this.gallery.values());
    if (published !== undefined) {
      return allImages.filter(image => image.published === published);
    }
    return allImages.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  }

  async createGalleryImage(image: InsertGallery): Promise<Gallery> {
    const id = randomUUID();
    const galleryImage: Gallery = { 
      ...image, 
      id,
      published: image.published ?? false,
      uploadedAt: new Date() 
    };
    this.gallery.set(id, galleryImage);
    return galleryImage;
  }

  async updateGalleryImage(id: string, image: UpdateGallery): Promise<Gallery | undefined> {
    const existing = this.gallery.get(id);
    if (!existing) return undefined;
    
    const updated: Gallery = { 
      ...existing, 
      ...image 
    };
    this.gallery.set(id, updated);
    return updated;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    return this.gallery.delete(id);
  }

  async getGalleryByCategory(category: string): Promise<Gallery[]> {
    return Array.from(this.gallery.values())
      .filter(image => image.category === category && image.published)
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  }

  // Induction Form Methods
  async createInductionForm(formData: InsertInductionForm): Promise<InductionForm> {
    const form: InductionForm = {
      id: nanoid(),
      ...formData,
      status: "pending",
      submittedAt: new Date(),
    };
    this.inductionForms.set(form.id, form);
    return form;
  }

  async getAllInductionForms(): Promise<InductionForm[]> {
    return Array.from(this.inductionForms.values())
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  async getInductionFormById(id: string): Promise<InductionForm | undefined> {
    return this.inductionForms.get(id);
  }

  async updateInductionForm(id: string, formData: UpdateInductionForm): Promise<InductionForm | undefined> {
    const existing = this.inductionForms.get(id);
    if (!existing) return undefined;

    const updated: InductionForm = {
      ...existing,
      ...formData
    };
    this.inductionForms.set(id, updated);
    return updated;
  }

  async deleteInductionForm(id: string): Promise<boolean> {
    return this.inductionForms.delete(id);
  }

  // Settings Methods
  async getSettingByKey(key: string): Promise<Setting | undefined> {
    return Array.from(this.settings.values()).find(s => s.key === key);
  }

  async upsertSetting(key: string, value: string): Promise<Setting> {
    const existing = await this.getSettingByKey(key);

    if (existing) {
      const updated: Setting = {
        ...existing,
        value,
        updatedAt: new Date()
      };
      this.settings.set(existing.id, updated);
      return updated;
    } else {
      const newSetting: Setting = {
        id: nanoid(),
        key,
        value,
        updatedAt: new Date(),
      };
      this.settings.set(newSetting.id, newSetting);
      return newSetting;
    }
  }

  // Resources
  async getResource(id: string): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async getAllResources(published?: boolean): Promise<Resource[]> {
    const allResources = Array.from(this.resources.values());
    if (published !== undefined) {
      return allResources.filter(resource => resource.published === published);
    }
    return allResources.sort((a, b) => a.order - b.order);
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const id = randomUUID();
    const now = new Date();
    const resourceItem: Resource = {
      ...resource,
      id,
      published: resource.published ?? false,
      order: resource.order ?? 0,
      createdAt: now,
      updatedAt: now
    };
    this.resources.set(id, resourceItem);
    return resourceItem;
  }

  async updateResource(id: string, resource: UpdateResource): Promise<Resource | undefined> {
    const existing = this.resources.get(id);
    if (!existing) return undefined;

    const updated: Resource = {
      ...existing,
      ...resource,
      updatedAt: new Date()
    };
    this.resources.set(id, updated);
    return updated;
  }

  async deleteResource(id: string): Promise<boolean> {
    return this.resources.delete(id);
  }

  // Courses
  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getAllCourses(published?: boolean): Promise<Course[]> {
    const allCourses = Array.from(this.courses.values());
    if (published !== undefined) {
      return allCourses.filter(course => course.published === published);
    }
    return allCourses.sort((a, b) => a.order - b.order);
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const now = new Date();
    const courseItem: Course = {
      ...course,
      id,
      published: course.published ?? false,
      order: course.order ?? 0,
      enrollmentUrl: course.enrollmentUrl ?? null,
      createdAt: now,
      updatedAt: now
    };
    this.courses.set(id, courseItem);
    return courseItem;
  }

  async updateCourse(id: string, course: UpdateCourse): Promise<Course | undefined> {
    const existing = this.courses.get(id);
    if (!existing) return undefined;

    const updated: Course = {
      ...existing,
      ...course,
      updatedAt: new Date()
    };
    this.courses.set(id, updated);
    return updated;
  }

  async deleteCourse(id: string): Promise<boolean> {
    return this.courses.delete(id);
  }

  // Scholarships
  async getScholarship(id: string): Promise<Scholarship | undefined> {
    return this.scholarships.get(id);
  }

  async getAllScholarships(published?: boolean): Promise<Scholarship[]> {
    const allScholarships = Array.from(this.scholarships.values());
    if (published !== undefined) {
      return allScholarships.filter(scholarship => scholarship.published === published);
    }
    return allScholarships.sort((a, b) => a.order - b.order);
  }

  async createScholarship(scholarship: InsertScholarship): Promise<Scholarship> {
    const id = randomUUID();
    const now = new Date();
    const scholarshipItem: Scholarship = {
      ...scholarship,
      id,
      published: scholarship.published ?? false,
      order: scholarship.order ?? 0,
      applicationUrl: scholarship.applicationUrl ?? null,
      createdAt: now,
      updatedAt: now
    };
    this.scholarships.set(id, scholarshipItem);
    return scholarshipItem;
  }

  async updateScholarship(id: string, scholarship: UpdateScholarship): Promise<Scholarship | undefined> {
    const existing = this.scholarships.get(id);
    if (!existing) return undefined;

    const updated: Scholarship = {
      ...existing,
      ...scholarship,
      updatedAt: new Date()
    };
    this.scholarships.set(id, updated);
    return updated;
  }

  async deleteScholarship(id: string): Promise<boolean> {
    return this.scholarships.delete(id);
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

// Choose storage implementation based on environment
async function initializeStorage(): Promise<IStorage> {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    console.log('[Storage] Using PostgreSQL database storage');
    try {
      const { DbStorage } = await import('./db-storage');
      const dbStorage = new DbStorage();

      // Initialize default admin user if database is empty
      const existingUsers = await dbStorage.getAllAdminUsers();
      if (existingUsers.length === 0) {
        const username = process.env.ADMIN_USERNAME || "admin";
        const password = process.env.ADMIN_PASSWORD || "admin123";

        console.log('[Storage] Initializing default admin user...');
        await dbStorage.createAdminUser({
          username,
          password,
          email: "admin@ist.edu.pk",
          role: "admin",
          isActive: true,
        });
        console.log('[Storage] Default admin user created');
      }

      return dbStorage;
    } catch (error) {
      console.error('[Storage] Failed to initialize database storage:', error);
      console.log('[Storage] Falling back to in-memory storage');
      return new MemStorage();
    }
  } else {
    console.log('[Storage] No DATABASE_URL found, using in-memory storage');
    return new MemStorage();
  }
}

// Export a promise that resolves to the storage instance
export const storagePromise = initializeStorage();

// For backwards compatibility, export a synchronous storage instance
// This will be replaced once the async initialization completes
export let storage: IStorage = new MemStorage();

// Update the storage reference once initialization completes
storagePromise.then((initializedStorage) => {
  storage = initializedStorage;
  console.log('[Storage] Storage initialization complete');
}).catch((error) => {
  console.error('[Storage] Critical error during storage initialization:', error);
});
