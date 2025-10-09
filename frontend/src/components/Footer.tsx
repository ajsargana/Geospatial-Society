import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Society Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">IST</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">IST GeoSpatial</span>
                <span className="text-sm text-muted-foreground -mt-1">Society</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Institute of Space Technology, Islamabad - Advancing research and education in remote sensing, GIS, and spatial information sciences.
            </p>
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
              <Button
                variant="outline"
                size="icon"
                data-testid="button-email"
                onClick={() => window.open('mailto:geospatial@ist.edu.pk', '_blank')}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-news">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-events">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-publications">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-gallery">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/membership" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-membership">
                  Become a Member
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-research">
                  Research Projects
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-opportunities">
                  Job Opportunities
                </Link>
              </li>
              <li>
                <Link href="/student-resources" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-student-resources">
                  Student Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground" data-testid="text-address">
                  Institute of Space Technology<br />
                  Islamabad Highway<br />
                  Islamabad 44000, Pakistan
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground" data-testid="text-email">
                  geospatial@ist.edu.pk
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground" data-testid="text-phone">
                  +92 51 9075 4301
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © 2025 Institute of Space Technology GeoSpatial Society. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors" data-testid="link-privacy">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-foreground transition-colors" data-testid="link-terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}