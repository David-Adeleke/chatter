import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hfvyhvbaskidtsnvadfb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmdnlodmJhc2tpZHRzbnZhZGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NzEwMDQsImV4cCI6MjA5NjE0NzAwNH0.RC20Qw0-dV97TUenlREfuoHhbLTrfcaHVSlhRgkVP1o";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);