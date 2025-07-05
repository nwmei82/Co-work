import { supabase } from './supabase.js';

export async function getAllUsers() {
  const { data, error } = await supabase.from('alluser').select('*');
  if (error) throw error;
  return data;
}