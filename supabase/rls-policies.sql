-- RAXIMA COURSE - RLS SECURITY POLICIES
-- Core implementation of Role-Based Access Control logic

-- 1. Enable RLS on core tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

-- 2. Define JWT helper function to extract role
CREATE OR REPLACE FUNCTION auth.role() RETURNS text AS $$
  SELECT NULLIF(current_setting('request.jwt.claims', true)::json->>'role', '')::text;
$$ LANGUAGE sql STABLE;

-- 3. SuperAdmin/Admin Global Policies (Can do everything)
CREATE POLICY "Admins have full access to profiles" 
ON profiles FOR ALL 
USING (auth.role() IN ('superadmin', 'admin'));

CREATE POLICY "Admins have full access to groups" 
ON groups FOR ALL 
USING (auth.role() IN ('superadmin', 'admin'));

-- 4. Teacher Policies
-- Teachers can only read their assigned groups
CREATE POLICY "Teachers can view assigned groups" 
ON groups FOR SELECT 
USING (auth.role() = 'teacher' AND teacher_id = auth.uid());

-- Teachers can view students in their assigned groups via enrollments
CREATE POLICY "Teachers view students in their groups" 
ON profiles FOR SELECT 
USING (
  auth.role() = 'teacher' AND 
  EXISTS (
    SELECT 1 FROM enrollments e
    JOIN groups g ON e.group_id = g.id
    WHERE e.student_id = profiles.id AND g.teacher_id = auth.uid()
  )
);

-- Teachers can manage attendance for their groups
CREATE POLICY "Teachers manage attendance for assigned groups" 
ON attendance FOR ALL 
USING (auth.role() = 'teacher' AND teacher_id = auth.uid());

-- 5. Student Policies
-- Students can only see their own profile
CREATE POLICY "Students view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Students can only see their own enrollments/payments
CREATE POLICY "Students view own enrollments" 
ON enrollments FOR SELECT 
USING (auth.uid() = student_id);

CREATE POLICY "Students view own payments" 
ON payments FOR SELECT 
USING (auth.uid() = student_id);

-- Students can only see their own attendance
CREATE POLICY "Students view own attendance" 
ON attendance FOR SELECT 
USING (auth.uid() = student_id);

-- 6. Parent Policies
-- Parents can see their linked children's profiles
CREATE POLICY "Parents view linked children"
ON profiles FOR SELECT
USING (
  auth.role() = 'parent' AND 
  EXISTS (
    SELECT 1 FROM parent_student_links 
    WHERE parent_id = auth.uid() AND student_id = profiles.id
  )
);

-- Parents can view attendance of linked children
CREATE POLICY "Parents view children attendance"
ON attendance FOR SELECT
USING (
  auth.role() = 'parent' AND 
  EXISTS (
    SELECT 1 FROM parent_student_links 
    WHERE parent_id = auth.uid() AND student_id = attendance.student_id
  )
);
