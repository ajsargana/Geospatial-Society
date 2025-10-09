import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { apiRequest } from "@/lib/queryClient";
import { apiFetch } from "@/lib/api";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already authenticated
  const { data: authData, isLoading } = useQuery({
    queryKey: ["/api/admin/me"],
    queryFn: async () => {
      try {
        const response = await apiFetch("/api/admin/me");
        if (!response.ok) {
          throw new Error("Not authenticated");
        }
        return response.json();
      } catch (error) {
        return null;
      }
    },
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (authData?.user) {
        setUser(authData.user);
      }
      setIsCheckingAuth(false);
    }
  }, [authData, isLoading]);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard user={user} onLogout={handleLogout} />;
}