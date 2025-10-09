
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, UserCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-privacy-title">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: January 2024
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The IST GeoSpatial Society ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website, attend our events, or engage with our services.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Name, email address, and contact information</li>
                  <li>Academic and professional background</li>
                  <li>Membership application details</li>
                  <li>Event registration information</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Technical Information</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>IP addresses and browser information</li>
                  <li>Website usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Communication Data</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Email correspondence and feedback</li>
                  <li>Survey responses and research participation</li>
                  <li>Social media interactions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To process membership applications and maintain member records</li>
                <li>To organize and manage events, workshops, and conferences</li>
                <li>To send newsletters, announcements, and relevant communications</li>
                <li>To facilitate research collaborations and academic networking</li>
                <li>To improve our website and services based on user feedback</li>
                <li>To comply with legal obligations and institutional requirements</li>
                <li>To protect the security and integrity of our systems</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personal information to third parties, 
                except in the following circumstances:
              </p>
              
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>With trusted service providers who assist in our operations</li>
                <li>For academic collaboration with partner institutions</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security measures to protect 
                your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Encrypted data transmission and storage</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Staff training on data protection practices</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">You have the following rights regarding your personal information:</p>
              
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Access: Request copies of your personal data</li>
                <li>Rectification: Request correction of inaccurate information</li>
                <li>Erasure: Request deletion of your personal data</li>
                <li>Portability: Request transfer of your data</li>
                <li>Opt-out: Unsubscribe from marketing communications</li>
              </ul>
              
              <p className="text-muted-foreground mt-4">
                To exercise these rights, please contact us at privacy@ist.edu.pk
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our website uses cookies and similar technologies to enhance your browsing experience, 
                analyze website traffic, and provide personalized content.
              </p>
              
              <div>
                <h4 className="font-semibold mb-2">Types of Cookies We Use:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand website usage</li>
                  <li>Preference cookies to remember your settings</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any 
                significant changes by posting the new Privacy Policy on this page and updating 
                the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="space-y-2 text-muted-foreground">
                <div><strong>Email:</strong> privacy@ist.edu.pk</div>
                <div><strong>Address:</strong> IST GeoSpatial Society, Institute of Space Technology, Islamabad Highway, Islamabad 44000, Pakistan</div>
                <div><strong>Phone:</strong> +92 51 9075 4301</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
