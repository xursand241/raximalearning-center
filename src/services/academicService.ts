import { supabase } from '@/lib/supabase';

export interface Subject {
  id: string;
  name: string;
  description?: string;
}

export interface Level {
  id: string;
  name: string;
}

export const academicService = {
  async getSubjects() {
    const { data, error } = await supabase.from('subjects').select('*').order('name');
    if (error) throw error;
    return data as Subject[];
  },

  async getLevels() {
    const { data, error } = await supabase.from('levels').select('*').order('name');
    if (error) throw error;
    return data as Level[];
  },

  async createSubject(subject: Omit<Subject, 'id'>) {
    const { data, error } = await supabase.from('subjects').insert(subject).select().single();
    if (error) throw error;
    return data;
  }
};
