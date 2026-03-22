import { supabase } from "./supabase";

export interface Transaction {
  id?: string;
  amount: number;
  category_id: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
  user_id?: string;
}

export const getTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, categories(name)')
    .order('date', { ascending: false });
  if (error) throw error;
  return data;
};

export const addTransaction = async (transaction: Transaction) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('transactions')
    .insert([{ ...transaction, user_id: user.id }])
    .select();
  if (error) throw error;
  return data;
};

export const deleteTransaction = async (id: string) => {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const getBalanceSummary = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('amount, type');
    if (error) throw error;
    
    return data.reduce((acc, curr) => {
        if (curr.type === 'income') acc.income += curr.amount;
        else acc.expense += curr.amount;
        acc.balance = acc.income - acc.expense;
        return acc;
    }, { income: 0, expense: 0, balance: 0 });
};
