import { supabase } from '@/lib/supabase';

export interface Group {
  id: string;
  name: string;
  subject_id: string;
  level_id: string;
  teacher_id: string;
  room: string;
  schedule_json: any;
  start_date: string;
  is_active: boolean;
}

export const groupService = {
  async getAllGroups() {
    const { data, error } = await supabase
      .from('groups')
      .select(`
        *,
        subjects (name),
        levels (name),
        profiles:teacher_id (first_name, last_name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createGroup(group: Omit<Group, 'id' | 'is_active'>) {
    const { data, error } = await supabase
      .from('groups')
      .insert(group)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  async getTeacherGroups(teacher_id: string) {
    const { data, error } = await supabase
      .from('groups')
      .select(`
        *,
        subjects (name),
        levels (name)
      `)
      .eq('teacher_id', teacher_id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async enrollStudent(student_id: string, group_id: string) {
    const { data, error } = await supabase
      .from('student_groups')
      .insert({ student_id, group_id })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getGroupStudents(group_id: string) {
    const { data, error } = await supabase
      .from('student_groups')
      .select(`
        student_id,
        profiles!student_id (id, first_name, last_name, phone)
      `)
      .eq('group_id', group_id);
    
    if (error) throw error;
    return data;
  }
};
