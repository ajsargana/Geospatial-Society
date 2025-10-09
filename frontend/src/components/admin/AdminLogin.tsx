import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { apiFetch } from "@/lib/api";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoggingIn(true);
    try {
      console.log('[AdminLogin] Submitting login with username:', data.username);

      const response = await apiFetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log('[AdminLogin] Response status:', response.status);
      console.log('[AdminLogin] Response headers:', Object.fromEntries(response.headers.entries()));

      // Get response text first to handle both JSON and non-JSON responses
      const responseText = await response.text();
      console.log('[AdminLogin] Response text:', responseText.substring(0, 500)); // First 500 chars

      if (!response.ok) {
        // Try to parse as JSON, if it fails, show the text
        try {
          const error = JSON.parse(responseText);
          console.log('[AdminLogin] Error from backend:', error);
          throw new Error(error.error || error.message || "Login failed");
        } catch (parseError) {
          // If it's not JSON, it's likely an HTML error page (CORS issue)
          console.error('[AdminLogin] Could not parse response as JSON');
          console.error('[AdminLogin] Full response text:', responseText);
          throw new Error(`Server error: ${response.status}. Response: ${responseText.substring(0, 200)}`);
        }
      }

      // Parse successful response
      const result = JSON.parse(responseText);
      console.log('[AdminLogin] Login successful!');

      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });

      onLoginSuccess(result.user);
    } catch (error: any) {
      console.error("[AdminLogin] Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <p className="text-muted-foreground">Sign in to manage IST GeoSpatial Society content</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your username" 
                        data-testid="input-username"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        data-testid="input-password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoggingIn}
                data-testid="button-login"
              >
                {isLoggingIn ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
          
        </CardContent>
      </Card>
    </div>
  );
}