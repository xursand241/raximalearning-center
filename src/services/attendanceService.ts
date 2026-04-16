import { supabase } from '@/lib/supabase';

export interface AttendanceRecord {
  id: string;
  student_id: string;
  group_id: string;
  date: string;
  status: 'present' | 'late' | 'absent' | 'excused';
  teacher_id: string;
}

export const attendanceService = {
  async markAttendance(records: Omit<AttendanceRecord, 'id' | 'marked_at'>[]) {
    const { data, error } = await supabase
      .from('attendance')
      .upsert(records, { onConflict: 'student_id,group_id,date' })
      .select();
    
    if (error) throw error;
    return data;
  },

  async getAttendanceByGroup(groupId: string, date: string) {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        profiles:student_id (first_name, last_name)
      `)
      .eq('group_id', groupId)
      .eq('date', date);
    
    if (error) throw error;
    return data;
  }
};
