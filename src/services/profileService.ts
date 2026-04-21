import { supabase } from '@/lib/supabase';

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  role: 'superadmin' | 'admin' | 'teacher' | 'student' | 'parent';
  is_active: boolean;
  created_at: string;
}

export const profileService = {
  async getProfile(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Profile;
  },

  async updateProfile(id: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Profile;
  },

  async getAllProfilesByRole(role: Profile['role']) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Profile[];
  },

  async getParentChildren(parentId: string) {
    const { data, error } = await supabase
      .from('parent_student_links')
      .select(`
        student_id,
        profiles!parent_student_links_student_id_fkey (*)
      `)
      .eq('parent_id', parentId);
    
    if (error) throw error;
    // data.map(d => d.profiles) returns any[][], so we take the first element of each inner array
    return (data || []).map(d => d.profiles?.[0]).filter(Boolean) as Profile[];
  },

  async createProfile(profile: Omit<Profile, 'created_at' | 'is_active'>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert({ ...profile, is_active: true })
      .select()
      .single();
    
    if (error) throw error;
    return data as Profile;
  },

  async getStudentsWithGroups() {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        enrollments (
          group_id,
          groups (name)
        )
      `)
      .eq('role', 'student')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getTeachersWithStats() {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select(`
        *,
        groups (
          id,
          enrollments (count)
        )
      `)
      .eq('role', 'teacher')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return profiles.map(p => ({
      ...p,
      groupsCount: p.groups?.length || 0,
      studentsCount: p.groups?.reduce((acc: number, g: any) => acc + (g.enrollments ? g.enrollments[0]?.count || 0 : 0), 0) || 0
    }));
  },

  async getParentsWithStats() {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select(`
        *,
        parent_student_links!parent_id (
          student_id
        )
      `)
      .eq('role', 'parent')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return profiles.map(p => ({
      ...p,
      childrenCount: p.parent_student_links?.length || 0
    }));
  }
};
