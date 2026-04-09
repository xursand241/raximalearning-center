-- RAXIMA COURSE SUPABASE SCHEMA
-- A comprehensive DB schema for the Academy SaaS Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define Roles
CREATE TYPE user_role AS ENUM ('superadmin', 'admin', 'teacher', 'student', 'parent');

-- 1. Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT UNIQUE,
  role user_role NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Subjects
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- e.g., English, Mathematics
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Levels
CREATE TABLE levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., Beginner, Intermediate
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Groups
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subject_id UUID REFERENCES subjects(id),
  level_id UUID REFERENCES levels(id),
  teacher_id UUID REFERENCES profiles(id),
  room TEXT,
  schedule_json JSONB, -- stores lesson days and times
  start_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Parent-Student Links
CREATE TABLE parent_student_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  relationship TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(parent_id, student_id)
);

-- 6. Packages
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  duration_months INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Enrollments & Package Assignments (Finance)
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id),
  group_id UUID REFERENCES groups(id),
  package_id UUID REFERENCES packages(id),
  payment_status TEXT DEFAULT 'pending', -- pending, partial, paid, overdue, blocked
  enrolled_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id),
  enrollment_id UUID REFERENCES enrollments(id),
  amount_paid NUMERIC(10,2) NOT NULL,
  payment_method TEXT,
  paid_at TIMESTAMPTZ DEFAULT now(),
  processed_by UUID REFERENCES profiles(id)
);

-- 9. Attendance
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id),
  group_id UUID REFERENCES groups(id),
  date DATE NOT NULL,
  status TEXT NOT NULL, -- present, late, absent, excused
  teacher_id UUID REFERENCES profiles(id),
  marked_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Homework & Tests
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups(id),
  type TEXT NOT NULL, -- homework, test
  title TEXT NOT NULL,
  max_score INT DEFAULT 100,
  date DATE NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE assessment_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id),
  score INT,
  teacher_comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. SMS Logs
CREATE TABLE sms_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT, -- sent, failed
  provider_response JSONB,
  sent_at TIMESTAMPTZ DEFAULT now()
);

-- 12. Audit Logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Disable RLS momentarily for setup (Will be implemented in next step)
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
