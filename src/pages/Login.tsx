import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Check if user is already logged in
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("User signed in, redirecting to home");
        navigate("/");
      }
      
      // Clear error when auth state changes
      if (event === "SIGNED_OUT") {
        setError("");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleAuthError = (error: AuthError) => {
    console.error("Auth error:", error);
    switch (error.message) {
      case "User already registered":
        setError("This email is already registered. Please try signing in instead.");
        break;
      case "Invalid login credentials":
        setError("Invalid email or password. Please check your credentials and try again.");
        break;
      default:
        setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-foreground">Welcome Back</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'rgb(var(--primary))',
                  brandAccent: 'rgb(var(--primary))',
                }
              }
            }
          }}
          providers={[]}
          redirectTo={window.location.origin}
          onError={handleAuthError}
        />
      </div>
    </div>
  );
};

export default Login;