import { supabase } from '@/lib/supabase';

export interface Payment {
  id: string;
  student_id: string;
  amount_paid: number;
  payment_method: string;
  paid_at: string;
  processed_by: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  group_id: string;
  package_id: string;
  payment_status: 'pending' | 'partial' | 'paid' | 'overdue' | 'blocked';
  enrolled_at: string;
}

export const financeService = {
  async getRecentPayments(limit = 10) {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        profiles:student_id (first_name, last_name)
      `)
      .order('paid_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async createPayment(payment: Omit<Payment, 'id' | 'paid_at'>) {
    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select()
      .single();
    
    if (error) throw error;
    
    // Update enrollment status if needed (business logic would go here or in a DB trigger)
    return data;
  },

  async getRevenueStats(days: number) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const { data, error } = await supabase
      .from('payments')
      .select('amount_paid, paid_at')
      .gte('paid_at', startDate.toISOString());
    
    if (error) throw error;
    return data;
  },

  async getStudentPayments(student_id: string) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('student_id', student_id)
      .order('paid_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};
