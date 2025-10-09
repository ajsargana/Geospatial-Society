import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";

export default function InductionForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    department: '',
    semester: '',
    interests: [] as string[],
    experience: '',
    motivation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    'GIS & Remote Sensing',
    'Geospatial Analysis',
    'Cartography',
    'Satellite Imagery',
    'GPS & Navigation',
    'Environmental Monitoring',
    'Urban Planning',
    'Disaster Management',
    'Web Mapping',
    'Spatial Data Science',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiFetch('/api/induction-forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit form');
      }

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll review your application soon.",
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        studentId: '',
        department: '',
        semester: '',
        interests: [],
        experience: '',
        motivation: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our Society
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Become a member of the IST GeoSpatial Society and be part of an innovative community
            dedicated to geospatial technology, research, and learning.
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Induction Application Form</CardTitle>
            <CardDescription>
              Please fill out all required fields. We'll review your application and get back to you soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+92 XXX XXXXXXX"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID *</Label>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      onChange={(e) => handleInputChange('studentId', e.target.value)}
                      placeholder="Your student ID"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Academic Information</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="e.g., Remote Sensing"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Current Semester *</Label>
                    <Input
                      id="semester"
                      value={formData.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                      placeholder="e.g., 5th Semester"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Areas of Interest *</h3>
                <p className="text-sm text-muted-foreground">Select at least one area you're interested in</p>

                <div className="grid gap-3 md:grid-cols-2">
                  {interestOptions.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={() => handleInterestToggle(interest)}
                      />
                      <Label
                        htmlFor={interest}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience">Previous Experience (Optional)</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="Tell us about any relevant experience, projects, or coursework..."
                  className="min-h-24"
                />
              </div>

              {/* Motivation */}
              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to join? *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  placeholder="Share your motivation for joining the GeoSpatial Society (minimum 10 characters)..."
                  className="min-h-32"
                  required
                  minLength={10}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting || formData.interests.length === 0}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Application
                    <UserPlus className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Our team will review your application within 3-5 business days</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You'll receive an email notification about your application status</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>If accepted, you'll get access to exclusive resources, events, and workshops</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Join our community and collaborate on exciting geospatial projects</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
