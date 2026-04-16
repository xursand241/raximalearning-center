import { supabase } from '@/lib/supabase';

export interface Exam {
  id: string;
  group_id: string;
  title: string;
  description?: string;
  exam_date: string;
  max_score: number;
  created_at: string;
}

export interface StudentGrade {
  id: string;
  exam_id: string;
  student_id: string;
  score: number;
  comment?: string;
  created_at: string;
}

export const gradeService = {
  async getExamsByGroup(groupId: string) {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('group_id', groupId)
      .order('exam_date', { ascending: false });
    
    if (error) throw error;
    return data as Exam[];
  },

  async getGradesByExam(examId: string) {
    const { data, error } = await supabase
      .from('grades')
      .select(`
        *,
        profiles:student_id (first_name, last_name)
      `)
      .eq('exam_id', examId);
    
    if (error) throw error;
    return data;
  },

  async saveGrades(grades: Omit<StudentGrade, 'id' | 'created_at'>[]) {
    const { data, error } = await supabase
      .from('grades')
      .upsert(grades, { onConflict: 'exam_id,student_id' })
      .select();
    
    if (error) throw error;
    return data;
  }
};
