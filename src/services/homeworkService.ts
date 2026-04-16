import { supabase } from '@/lib/supabase';

export interface Homework {
  id: string;
  group_id: string;
  title: string;
  description: string;
  due_date: string;
  created_at: string;
  teacher_id: string;
}

export interface HomeworkSubmission {
  id: string;
  homework_id: string;
  student_id: string;
  content: string;
  status: 'pending' | 'graded' | 'late';
  grade?: number;
  feedback?: string;
  submitted_at: string;
}

export const homeworkService = {
  async getHomeworkByGroup(groupId: string) {
    const { data, error } = await supabase
      .from('homeworks')
      .select('*')
      .eq('group_id', groupId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Homework[];
  },

  async createHomework(homework: Omit<Homework, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('homeworks')
      .insert(homework)
      .select()
      .single();
    
    if (error) throw error;
    return data as Homework;
  },

  async getSubmissions(homeworkId: string) {
    const { data, error } = await supabase
      .from('homework_submissions')
      .select(`
        *,
        profiles:student_id (first_name, last_name)
      `)
      .eq('homework_id', homeworkId);
    
    if (error) throw error;
    return data;
  },

  async gradeSubmission(submissionId: string, grade: number, feedback: string) {
    const { data, error } = await supabase
      .from('homework_submissions')
      .update({ grade, feedback, status: 'graded' })
      .eq('id', submissionId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
