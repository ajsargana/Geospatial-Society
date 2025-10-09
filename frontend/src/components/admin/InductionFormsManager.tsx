import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, EyeOff, Mail, Phone, User, GraduationCap } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { apiFetch } from "@/lib/api";

interface InductionForm {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  semester: string;
  interests: string[];
  experience?: string;
  motivation: string;
  status: string;
  submittedAt: string;
}

export default function InductionFormsManager() {
  const [selectedForm, setSelectedForm] = useState<InductionForm | null>(null);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const { toast } = useToast();

  // Fetch induction forms
  const { data: forms, isLoading } = useQuery({
    queryKey: ["/api/admin/induction-forms"],
    queryFn: async () => {
      const response = await apiFetch("/api/admin/induction-forms");
      if (!response.ok) throw new Error("Failed to fetch induction forms");
      return response.json();
    },
  });

  // Fetch form visibility setting
  const { data: formSetting } = useQuery({
    queryKey: ["/api/settings/induction_form_visible"],
    queryFn: async () => {
      const response = await apiFetch("/api/settings/induction_form_visible");
      if (!response.ok) return { value: "true" };
      return response.json();
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiFetch(`/api/admin/induction-forms/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete form");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/induction-forms"] });
      toast({ title: "Success", description: "Form deleted successfully!" });
      setShowFormDialog(false);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Update form visibility mutation
  const updateVisibilityMutation = useMutation({
    mutationFn: async (visible: boolean) => {
      const response = await apiFetch("/api/admin/settings/induction_form_visible", {
        method: "PUT",
        body: JSON.stringify({ value: visible.toString() }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update setting");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings/induction_form_visible"] });
      toast({
        title: "Success",
        description: "Form visibility updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleView = (form: InductionForm) => {
    setSelectedForm(form);
    setShowFormDialog(true);
  };

  const handleVisibilityToggle = (checked: boolean) => {
    updateVisibilityMutation.mutate(checked);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formVisible = formSetting?.value === "true";

  return (
    <div className="space-y-6">
      {/* Header with visibility toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Induction Form Settings</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Control whether the induction form is visible to students
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="form-visibility">
                {formVisible ? (
                  <>
                    <Eye className="h-4 w-4 inline mr-1" />
                    Visible
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4 inline mr-1" />
                    Hidden
                  </>
                )}
              </Label>
              <Switch
                id="form-visibility"
                checked={formVisible}
                onCheckedChange={handleVisibilityToggle}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Submissions list */}
      <Card>
        <CardHeader>
          <CardTitle>Induction Form Submissions</CardTitle>
          <p className="text-sm text-muted-foreground">
            View and manage student induction applications
          </p>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : !forms || forms.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No submissions yet
            </div>
          ) : (
            <div className="space-y-4">
              {forms.map((form: InductionForm) => (
                <div
                  key={form.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{form.fullName}</h3>
                        <Badge className={getStatusColor(form.status)}>
                          {form.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {form.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {form.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {form.studentId}
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          {form.department} - {form.semester}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {form.interests.slice(0, 3).map((interest) => (
                          <Badge key={interest} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                        {form.interests.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{form.interests.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Submitted: {new Date(form.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(form)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(form.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View dialog */}
      <Dialog open={showFormDialog} onOpenChange={setShowFormDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Complete information about the student's application
            </DialogDescription>
          </DialogHeader>
          {selectedForm && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Full Name</p>
                    <p className="font-medium">{selectedForm.fullName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedForm.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedForm.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Student ID</p>
                    <p className="font-medium">{selectedForm.studentId}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Academic Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Department</p>
                    <p className="font-medium">{selectedForm.department}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Semester</p>
                    <p className="font-medium">{selectedForm.semester}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Areas of Interest</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedForm.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedForm.experience && (
                <div>
                  <h3 className="font-semibold mb-2">Previous Experience</h3>
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedForm.experience}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Motivation</h3>
                <p className="text-sm whitespace-pre-wrap">
                  {selectedForm.motivation}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Submitted: {new Date(selectedForm.submittedAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedForm.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button variant="outline" onClick={() => setShowFormDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
