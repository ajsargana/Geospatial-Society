import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin } from "lucide-react";
import backdropImage from "@/assets/Gemini_Generated_Image_wqou7swqou7swqou.png";

export default function Contact() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src={backdropImage} alt="" className="w-full h-full object-cover opacity-30 fixed" />
      </div>
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-contact-title">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our team for inquiries about membership, events, research collaborations, 
            or any other questions you may have.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-sm text-muted-foreground" data-testid="text-address">
                        Institute of Space Technology<br />
                        Islamabad Highway<br />
                        Islamabad 44000, Pakistan
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-muted-foreground" data-testid="text-phone">
                        +92 51 9075 4301
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground" data-testid="text-email">
                        geospatial@ist.edu.pk
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Office Hours</div>
                      <div className="text-sm text-muted-foreground" data-testid="text-hours">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: Closed <br />
                        Sunday: Closed
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-4">Follow Us</h4>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      data-testid="button-instagram"
                      onClick={() => window.open('https://www.instagram.com/geospatialsociety_ist?igsh=N2cwcTJlYXF5Ymtt', '_blank')}
                    >
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      data-testid="button-linkedin"
                      onClick={() => window.open('https://www.linkedin.com/company/geospatial-society/', '_blank')}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <a href="/membership" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-membership">
                    Membership Info
                  </a>
                  <a href="/events" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-events">
                    Upcoming Events
                  </a>
                  <a href="/publications" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-publications">
                    Research Papers
                  </a>
                  <a href="/opportunities" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-opportunities">
                    Job Opportunities
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.4234567890123!2d73.1545678!3d33.6436789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df948974e96c95%3A0x2d8d4b7e8f6a1234!2sInstitute%20of%20Space%20Technology%2C%20Islamabad!5e0!3m2!1sen!2spk!4v1234567890123!5m2!1sen!2spk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="IST Campus Location"
                    data-testid="map-embed"
                  />
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Institute of Space Technology, Islamabad Highway, Islamabad 44000, Pakistan</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}