 import { createClient } from "@supabase/supabase-js";
 
 const supabaseUrl = "https://atgdgvckuvemhecttxva.supabase.co";
 const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0Z2RndmNrdXZlbWhlY3R0eHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MTEwNzksImV4cCI6MjA4OTE4NzA3OX0.53SOvTaD1KPuj-zFeWqMAZ0QliXOnjl1hcbo-RHEjEA";
 
 if (!supabaseUrl || !supabaseKey) {
   throw new Error("Faltan variables de entorno de Supabase");
 }
 
 export const supabaseClient = createClient(supabaseUrl, supabaseKey);
