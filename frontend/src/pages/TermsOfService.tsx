
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, Scale, Users } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-terms-title">
            Terms of Service
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
                <FileText className="h-5 w-5" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                These Terms of Service ("Terms") govern your use of the IST GeoSpatial Society website, 
                services, events, and related activities operated by the Institute of Space Technology 
                GeoSpatial Society ("we," "our," or "us"). By accessing or using our services, you agree 
                to be bound by these Terms.
              </p>
            </CardContent>
          </Card>

          {/* Membership Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Membership Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Eligibility</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Student membership is open to enrolled students at recognized institutions</li>
                  <li>Professional membership is available to working professionals in related fields</li>
                  <li>All members must provide accurate and current information</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Member Responsibilities</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Maintain professional conduct during all society activities</li>
                  <li>Respect intellectual property rights of others</li>
                  <li>Follow academic integrity and research ethics guidelines</li>
                  <li>Pay membership fees on time (for paid memberships)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Membership Benefits</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Access to events, workshops, and seminars</li>
                  <li>Networking opportunities with professionals</li>
                  <li>Access to research resources and publications</li>
                  <li>Participation in collaborative projects</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Website Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Website and Service Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Acceptable Use</h4>
                <p className="text-muted-foreground mb-2">You agree to use our services only for lawful purposes and in accordance with these Terms. You shall not:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon intellectual property rights</li>
                  <li>Transmit harmful, threatening, or offensive content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of the website</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Content Guidelines</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>All submitted content must be original or properly attributed</li>
                  <li>Content should be relevant to geospatial sciences and technology</li>
                  <li>Maintain professional and respectful communication</li>
                  <li>Do not post spam, advertisements, or irrelevant material</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Our Content</h4>
                <p className="text-muted-foreground">
                  The website content, including text, graphics, logos, images, and software, is owned by 
                  IST GeoSpatial Society or its licensors and is protected by copyright and other intellectual 
                  property laws.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">User-Generated Content</h4>
                <p className="text-muted-foreground">
                  By submitting content to our website or services, you grant us a non-exclusive, 
                  royalty-free license to use, modify, and display such content for society purposes.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Research and Publications</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Proper attribution required for all research citations</li>
                  <li>Collaborative work ownership as agreed upon by participants</li>
                  <li>Respect for confidential and proprietary information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Events and Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Events and Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Registration and Participation</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Registration required for most events and workshops</li>
                  <li>Participants must arrive on time and follow event guidelines</li>
                  <li>Photography and recording may occur during events</li>
                  <li>Event schedules and content subject to change</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Events may be cancelled due to unforeseen circumstances</li>
                  <li>Participants will be notified of cancellations promptly</li>
                  <li>Refunds for paid events as per specific event terms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your privacy is important to us. Our collection, use, and protection of your personal 
                information is governed by our Privacy Policy, which is incorporated into these Terms 
                by reference. Please review our Privacy Policy to understand our practices.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Disclaimers and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Service Availability</h4>
                <p className="text-muted-foreground">
                  We strive to maintain continuous service availability but cannot guarantee uninterrupted 
                  access. Services may be temporarily unavailable for maintenance or technical issues.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Content Accuracy</h4>
                <p className="text-muted-foreground">
                  While we endeavor to provide accurate and up-to-date information, we make no warranties 
                  about the completeness, reliability, or accuracy of content on our website.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Third-Party Links</h4>
                <p className="text-muted-foreground">
                  Our website may contain links to third-party websites. We are not responsible for the 
                  content, privacy policies, or practices of external sites.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend your membership or access to our services 
                at any time, with or without notice, for conduct that we believe violates these Terms 
                or is harmful to other users, us, or third parties.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Governing Law
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                These Terms are governed by and construed in accordance with the laws of Pakistan. 
                Any disputes arising from these Terms shall be subject to the jurisdiction of the 
                courts in Islamabad, Pakistan.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will notify users of 
                significant changes by posting the updated Terms on our website. Continued use of 
                our services after changes constitutes acceptance of the new Terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              
              <div className="space-y-2 text-muted-foreground">
                <div><strong>Email:</strong> legal@ist.edu.pk</div>
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
