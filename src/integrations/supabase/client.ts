// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://soiakpcgqfdjklzqygjj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaWFrcGNncWZkamtsenF5Z2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0ODM5NzgsImV4cCI6MjA0OTA1OTk3OH0.abGkxFki92455Ef1hQ3o2mG4t7yTsyq8KqFimsj3cek";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);