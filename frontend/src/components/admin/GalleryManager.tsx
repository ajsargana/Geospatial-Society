
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, X, Image, Calendar, MapPin } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";

const gallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  imageUrl: z.string().min(1, "Image URL is required"),
  category: z.string().min(1, "Category is required"),
  event: z.string().optional(),
  location: z.string().optional(),
  date: z.string().optional(),
  published: z.boolean().default(false),
});

type GalleryFormData = z.infer<typeof gallerySchema>;

const categories = [
  "Event",
  "Workshop", 
  "Fieldwork",
  "Seminar",
  "Meeting",
  "Showcase",
  "Research",
  "Training",
  "Conference",
  "Other"
];

export default function GalleryManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<GalleryFormData>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      event: "",
      location: "",
      date: "",
      published: false,
    },
  });

  // Fetch gallery images
  const { data: galleryImages = [], isLoading } = useQuery({
    queryKey: ["/api/gallery"],
    queryFn: async () => {
      const response = await apiFetch("/api/gallery");
      if (!response.ok) throw new Error("Failed to fetch gallery images");
      return response.json();
    },
  });

  // Create gallery image mutation
  const createMutation = useMutation({
    mutationFn: async (data: GalleryFormData) => {
      const response = await apiFetch("/api/admin/gallery", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to create gallery image");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Success", description: "Gallery image added successfully!" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Update gallery image mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: GalleryFormData }) => {
      const response = await apiFetch(`/api/admin/gallery/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update gallery image");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Success", description: "Gallery image updated successfully!" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Delete gallery image mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiFetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete gallery image");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Success", description: "Gallery image deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    form.reset();
    setEditingId(null);
    setShowForm(false);
  };

  const onSubmit = (data: GalleryFormData) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (image: any) => {
    form.reset({
      title: image.title,
      description: image.description || "",
      imageUrl: image.imageUrl,
      category: image.category,
      event: image.event || "",
      location: image.location || "",
      date: image.date ? new Date(image.date).toISOString().split('T')[0] : "",
      published: image.published,
    });
    setEditingId(image.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this gallery image?")) {
      deleteMutation.mutate(id);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Event: "bg-blue-100 text-blue-800",
      Workshop: "bg-green-100 text-green-800",
      Fieldwork: "bg-orange-100 text-orange-800",
      Seminar: "bg-purple-100 text-purple-800",
      Meeting: "bg-red-100 text-red-800",
      Showcase: "bg-yellow-100 text-yellow-800",
      Research: "bg-indigo-100 text-indigo-800",
      Training: "bg-pink-100 text-pink-800",
      Conference: "bg-teal-100 text-teal-800",
      Other: "bg-gray-100 text-gray-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return <div>Loading gallery images...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" data-testid="text-gallery-manager-title">
          Gallery Management
        </h2>
        <Button 
          onClick={() => setShowForm(!showForm)}
          data-testid="button-toggle-gallery-form"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Gallery Image
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {editingId ? "Edit Gallery Image" : "Add New Gallery Image"}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetForm}
                data-testid="button-close-gallery-form"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Gallery image title..." 
                          data-testid="input-gallery-title"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of the image..." 
                          className="min-h-20"
                          data-testid="textarea-gallery-description"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || ''}
                          onChange={field.onChange}
                          placeholder="Upload gallery image"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-gallery-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="event"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Name (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Associated event name..." 
                            data-testid="input-gallery-event"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Location where photo was taken..." 
                            data-testid="input-gallery-location"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            data-testid="input-gallery-date"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-gallery-published"
                        />
                      </FormControl>
                      <FormLabel>Publish Image</FormLabel>
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-save-gallery"
                  >
                    {editingId ? "Update Image" : "Add Image"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    data-testid="button-cancel-gallery"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Gallery Images List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image: any) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative overflow-hidden">
              {image.imageUrl ? (
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <Image className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className={`${getCategoryColor(image.category)} border-0`}>
                  {image.category}
                </Badge>
                {image.published ? (
                  <Badge className="bg-green-100 text-green-800 border-0">
                    Published
                  </Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800 border-0">
                    Draft
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(image)}
                  data-testid="button-edit-gallery"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(image.id)}
                  data-testid="button-delete-gallery"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid="text-gallery-item-title">
                {image.title}
              </h3>
              {image.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {image.description}
                </p>
              )}
              <div className="space-y-2 text-sm text-muted-foreground">
                {image.event && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span data-testid="text-gallery-event">{image.event}</span>
                  </div>
                )}
                {image.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span data-testid="text-gallery-location">{image.location}</span>
                  </div>
                )}
                {image.date && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span data-testid="text-gallery-date">
                      {new Date(image.date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {galleryImages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Gallery Images</h3>
            <p className="text-muted-foreground mb-4">
              Start building your gallery by adding your first image.
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Image
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
