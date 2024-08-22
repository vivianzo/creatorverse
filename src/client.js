import { createClient } from '@supabase/supabase-js';

const URL = 'https://bvgcpmegmjrsnrjoltjx.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Z2NwbWVnbWpyc25yam9sdGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4MDk2ODcsImV4cCI6MjAzNjM4NTY4N30.0--voV8yT-zN7kxKnLk3OGDasXnOFtHAif0gkcwa7C8';
export const supabase = createClient(URL, API_KEY);