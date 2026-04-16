import { supabase } from '@/lib/supabase';

export interface Subject {
  id: string;
  name: string;
  category: string;
  monthly_price: number;
  is_active: boolean;
  color_preset?: string;
  created_at: string;
}

export const subjectService = {
  async getAllSubjects() {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as Subject[];
  },

  async createSubject(subject: Omit<Subject, 'id' | 'created_at' | 'is_active'>) {
    const { data, error } = await supabase
      .from('subjects')
      .insert({ ...subject, is_active: true })
      .select()
      .single();
    
    if (error) throw error;
    return data as Subject;
  },

  async updateSubject(id: string, updates: Partial<Subject>) {
    const { data, error } = await supabase
      .from('subjects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Subject;
  }
};
