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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, X, User } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/ui/image-upload";
import { apiFetch } from "@/lib/api";

const leadershipSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  bio: z.string().min(1, "Bio is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  linkedin: z.string().optional(),
  website: z.string().optional(),
  photoUrl: z.string().optional(),
  expertise: z.array(z.string().min(1, "Expertise area is required")),
  order: z.number().default(0),
  active: z.boolean().default(true),
});

type LeadershipFormData = z.infer<typeof leadershipSchema>;

export default function LeadershipManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<LeadershipFormData>({
    resolver: zodResolver(leadershipSchema),
    defaultValues: {
      name: "",
      title: "",
      role: "",
      department: "",
      bio: "",
      email: "",
      linkedin: "",
      website: "",
      photoUrl: "",
      expertise: [""],
      order: 0,
      active: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "expertise",
  });

  // Fetch leadership
  const { data: leadership, isLoading } = useQuery({
    queryKey: ["/api/leadership"],
    queryFn: async () => {
      const response = await apiFetch("/api/leadership");
      if (!response.ok) throw new Error("Failed to fetch leadership");
      return response.json();
    },
  });

  // Create leadership mutation
  const createMutation = useMutation({
    mutationFn: async (data: LeadershipFormData) => {
      const formattedData = {
        ...data,
        email: data.email || null,
        expertise: data.expertise.filter(exp => exp.trim() !== ""),
      };
      const response = await apiFetch("/api/admin/leadership", {
        method: "POST",
        body: JSON.stringify(formattedData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to create leadership member");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leadership"] });
      toast({ title: "Success", description: "Leadership member created successfully!" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Update leadership mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: LeadershipFormData }) => {
      const formattedData = {
        ...data,
        email: data.email || null,
        expertise: data.expertise.filter(exp => exp.trim() !== ""),
      };
      const response = await apiFetch(`/api/admin/leadership/${id}`, {
        method: "PUT",
        body: JSON.stringify(formattedData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update leadership member");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leadership"] });
      toast({ title: "Success", description: "Leadership member updated successfully!" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Delete leadership mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiFetch(`/api/admin/leadership/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete leadership member");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leadership"] });
      toast({ title: "Success", description: "Leadership member deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    form.reset({
      name: "",
      title: "",
      role: "",
      department: "",
      bio: "",
      email: "",
      linkedin: "",
      website: "",
      photoUrl: "",
      expertise: [""],
      order: 0,
      active: true,
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const onSubmit = (data: LeadershipFormData) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const startEdit = (member: any) => {
    form.reset({
      name: member.name,
      title: member.title,
      role: member.role,
      department: member.department,
      bio: member.bio,
      email: member.email || "",
      linkedin: member.linkedin || "",
      website: member.website || "",
      photoUrl: member.photoUrl || "",
      expertise: member.expertise.length > 0 ? member.expertise : [""],
      order: member.order,
      active: member.active,
    });
    setEditingId(member.id);
    setIsCreating(true);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Leadership Management</h2>
        <Button 
          onClick={() => {
            resetForm();
            setIsCreating(true);
          }}
          data-testid="button-add-leadership"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Leadership Member
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? "Edit Leadership Member" : "Add New Leadership Member"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Dr. John Doe" 
                            data-testid="input-leadership-name"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="President" 
                            data-testid="input-leadership-title"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Category</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Society Leadership" 
                            data-testid="input-leadership-role"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Department of Space Science, IST" 
                            data-testid="input-leadership-department"
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
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biography</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief professional biography..." 
                          className="min-h-24"
                          data-testid="textarea-leadership-bio"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="john.doe@ist.edu.pk" 
                            data-testid="input-leadership-email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://linkedin.com/in/johndoe" 
                            data-testid="input-leadership-linkedin"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://johndoe.ist.edu.pk" 
                            data-testid="input-leadership-website"
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
                  name="photoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Upload member photo..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Areas of Expertise</FormLabel>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name={`expertise.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                placeholder="Remote Sensing" 
                                data-testid={`input-expertise-${index}`}
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
                          data-testid={`button-remove-expertise-${index}`}
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
                    data-testid="button-add-expertise"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expertise
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="0" 
                            data-testid="input-leadership-order"
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 pt-8">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-leadership-active"
                          />
                        </FormControl>
                        <FormLabel>Active Member</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-save-leadership"
                  >
                    {editingId ? "Update Member" : "Add Member"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    data-testid="button-cancel-leadership"
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
        {leadership?.map((member: any) => (
          <Card key={member.id} className="hover-elevate transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  {member.photoUrl ? (
                    <img 
                      src={member.photoUrl} 
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg" data-testid={`text-leadership-name-${member.id}`}>
                        {member.name}
                      </h3>
                      <Badge variant={member.active ? "default" : "secondary"}>
                        {member.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium text-sm mb-1">
                      {member.title}
                    </p>
                    <p className="text-muted-foreground text-sm mb-2">
                      {member.department}
                    </p>
                    <p className="text-muted-foreground text-sm mb-3" data-testid={`text-leadership-bio-${member.id}`}>
                      {member.bio.substring(0, 120)}...
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((exp: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(member)}
                    data-testid={`button-edit-leadership-${member.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMutation.mutate(member.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-leadership-${member.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {leadership?.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No leadership members yet. Add your first team member!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}