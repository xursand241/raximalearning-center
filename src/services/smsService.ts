import { supabase } from '@/lib/supabase';

export interface SmsLog {
  id: string;
  student_id: string;
  phone: string;
  message: string;
  status: 'sent' | 'failed' | 'pending';
  created_at: string;
}

export const smsService = {
  async getLogs(limit = 20) {
    const { data, error } = await supabase
      .from('sms_logs')
      .select('*, profiles(first_name, last_name)')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data as any[];
  },

  async logSms(log: Omit<SmsLog, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('sms_logs')
      .insert({
        student_id: log.student_id,
        recipient_phone: log.phone, // Map phone to recipient_phone as per schema.sql
        message: log.message,
        status: log.status
      })
      .select()
      .single();
    
    if (error) {
      console.error("SMS Log error:", error);
      throw error;
    }
    return data as SmsLog;
  },

  async sendSms(phone: string, message: string, student_id?: string) {
    return this.logSms({
      student_id: student_id || '',
      phone,
      message,
      status: 'pending'
    });
  }
};
