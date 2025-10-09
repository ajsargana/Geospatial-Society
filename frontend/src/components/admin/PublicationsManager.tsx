import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Plus, Edit, Trash2, X, BookOpen } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";

const publicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  authors: z.array(z.string().min(1, "Author name is required")),
  journal: z.string().min(1, "Journal/Conference is required"),
  abstract: z.string().min(1, "Abstract is required"),
  type: z.string().min(1, "Type is required"),
  date: z.string().min(1, "Date is required"),
  published: z.boolean().default(false),
  coverUrl: z.string().optional(),
  downloadUrl: z.string().optional(),
  externalUrl: z.string().optional(),
  doi: z.string().optional(),
});

type PublicationFormData = z.infer<typeof publicationSchema>;

export default function PublicationsManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<PublicationFormData>({
    resolver: zodResolver(publicationSchema),
    defaultValues: {
      title: "",
      authors: [""],
      journal: "",
      abstract: "",
      type: "",
      date: "",
      published: false,
      coverUrl: "",
      downloadUrl: "",
      externalUrl: "",
      doi: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "authors",
  });

  // Fetch publications
  const { data: publications, isLoading } = useQuery({
    queryKey: ["/api/publications"],
    queryFn: async () => {
      const response = await apiFetch("/api/publications");
      if (!response.ok) throw new Error("Failed to fetch publications");
      return response.json();
    },
  });

  // Create publication mutation
  const createMutation = useMutation({
    mutationFn: async (data: PublicationFormData) => {
      const formattedData = {
        ...data,
        date: new Date(data.date).toISOString(),
        authors: data.authors.filter(author => author.trim() !== ""),
      };
      const response = await apiFetch("/api/admin/publications", {
        method: "POST",
        body: JSON.stringify(formattedData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to create publication");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/publications"] });
      toast({ title: "Success", description: "Publication created successfully!" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Update publication mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PublicationFormData }) => {
      const formattedData = {
        ...data,
        date: new Date(data.date).toISOString(),
        authors: data.authors.filter(author => author.trim() !== ""),
      };
      const response = await apiFetch(`/api/admin/publications/${id}`, {
        method: "PUT",
        body: JSON.stringify(formattedData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update publication");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/publications"] });
      toast({ title: "Success", description: "Publication updated successfully!" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Delete publication mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiFetch(`/api/admin/publications/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete publication");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/publications"] });
      toast({ title: "Success", description: "Publication deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    form.reset({
      title: "",
      authors: [""],
      journal: "",
      abstract: "",
      type: "",
      date: "",
      published: false,
      coverUrl: "",
      downloadUrl: "",
      externalUrl: "",
      doi: "",
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const onSubmit = (data: PublicationFormData) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const startEdit = (publication: any) => {
    form.reset({
      title: publication.title,
      authors: publication.authors.length > 0 ? publication.authors : [""],
      journal: publication.journal,
      abstract: publication.abstract,
      type: publication.type,
      date: new Date(publication.date).toISOString().split('T')[0],
      published: publication.published,
      coverUrl: publication.coverUrl || "",
      downloadUrl: publication.downloadUrl || "",
      externalUrl: publication.externalUrl || "",
      doi: publication.doi || "",
    });
    setEditingId(publication.id);
    setIsCreating(true);
  };

  const publicationTypes = ["journal", "conference", "report", "newsletter"];

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Publications Management</h2>
        <Button 
          onClick={() => setIsCreating(true)}
          data-testid="button-add-publication"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Publication
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? "Edit Publication" : "Create New Publication"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Publication title..." 
                            data-testid="input-publication-title"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-publication-type">
                              <SelectValue placeholder="Select publication type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {publicationTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>Authors</FormLabel>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name={`authors.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                placeholder="Author name..." 
                                data-testid={`input-author-${index}`}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => remove(index)}
                          data-testid={`button-remove-author-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append("")}
                    className="mt-2"
                    data-testid="button-add-author"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Author
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="journal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Journal/Conference</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Publication venue..." 
                            data-testid="input-publication-journal"
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
                        <FormLabel>Publication Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            data-testid="input-publication-date"
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
                  name="abstract"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Abstract</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Publication abstract..." 
                          className="min-h-32"
                          data-testid="textarea-publication-abstract"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="downloadUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Download URL (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/paper.pdf" 
                            data-testid="input-publication-download"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="externalUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>External URL (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://doi.org/..." 
                            data-testid="input-publication-external"
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
                  name="coverUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Upload publication cover..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DOI (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="10.xxxx/xxxxx" 
                          data-testid="input-publication-doi"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-publication-published"
                        />
                      </FormControl>
                      <FormLabel>Publish Publication</FormLabel>
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-save-publication"
                  >
                    {editingId ? "Update Publication" : "Create Publication"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    data-testid="button-cancel-publication"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {publications?.map((publication: any) => (
          <Card key={publication.id} className="hover-elevate transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg" data-testid={`text-publication-title-${publication.id}`}>
                      {publication.title}
                    </h3>
                    <Badge variant={publication.published ? "default" : "secondary"}>
                      {publication.published ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline">
                      {publication.type.charAt(0).toUpperCase() + publication.type.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    By: {publication.authors.join(", ")}
                  </p>
                  <p className="text-muted-foreground text-sm mb-2" data-testid={`text-publication-abstract-${publication.id}`}>
                    {publication.abstract.substring(0, 150)}...
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {publication.journal}
                    </span>
                    <span>{new Date(publication.date).toLocaleDateString()}</span>
                    {publication.doi && (
                      <span>DOI: {publication.doi}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(publication)}
                    data-testid={`button-edit-publication-${publication.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMutation.mutate(publication.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-publication-${publication.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {publications?.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No publications yet. Add your first publication!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}