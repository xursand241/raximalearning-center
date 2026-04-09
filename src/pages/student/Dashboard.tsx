import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Award } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Welcome Back, Timur!</h1>
          <p className="text-muted-foreground mt-1 text-[15px]">You have 2 classes today and 1 upcoming assignment.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <Card className="shadow-sm border-border/50">
            <CardContent className="p-6">
               <div className="flex gap-4 items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                     <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="font-semibold leading-none">Current Groups</h3>
                     <p className="text-sm text-muted-foreground mt-1">2 Active Courses</p>
                  </div>
               </div>
               <div className="space-y-3 mt-4">
                  <div className="flex justify-between text-sm items-center">
                     <span className="font-medium text-gray-700">English B1</span>
                     <Badge variant="outline" className="text-xs font-normal">Mon/Wed/Fri</Badge>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                     <span className="font-medium text-gray-700">Math Advanced</span>
                     <Badge variant="outline" className="text-xs font-normal">Tue/Thu/Sat</Badge>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="shadow-sm border-border/50">
            <CardContent className="p-6">
               <div className="flex gap-4 items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                     <Award className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="font-semibold leading-none">Overall Progress</h3>
                     <p className="text-sm text-muted-foreground mt-1">Keep it up!</p>
                  </div>
               </div>
               <div className="space-y-4 mt-4">
                  <div className="space-y-1.5">
                     <div className="flex justify-between text-sm"><span className="text-gray-500">Attendance</span><span className="font-medium">98%</span></div>
                     <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-500 h-full w-[98%]"></div></div>
                  </div>
                  <div className="space-y-1.5">
                     <div className="flex justify-between text-sm"><span className="text-gray-500">Average Score</span><span className="font-medium">92%</span></div>
                     <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full w-[92%]"></div></div>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="shadow-sm border-border/50 bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
            <CardContent className="p-6 pt-8">
               <h3 className="text-lg font-bold mb-2">Upcoming Exam</h3>
               <p className="text-indigo-100 text-sm mb-6">Midterm Math Assessment focuses on Algebra & Geometry.</p>
               <div className="flex items-center gap-2 text-sm bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg w-fit">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Friday, 10:00 AM</span>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
