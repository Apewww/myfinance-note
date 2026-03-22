import { supabase } from "./supabase";

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  if (error) throw error;
  return data;
};

export const addCategory = async (name: string, type: 'income' | 'expense') => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('categories')
    .insert([{ name, type, user_id: user.id }])
    .select();
  if (error) throw error;
  return data;
};
