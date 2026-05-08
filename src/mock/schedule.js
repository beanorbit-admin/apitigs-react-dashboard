export const courseSchedules = [
  {
    id: 1,
    courseId: 1,
    courseName: "BCA",
    semesterId: 1,
    semesterName: "Semester 1",
    startDate: "2024-07-01",
    endDate: "2024-11-30",
    weeks: 18,
    days: [
      { week: 1, day: 1, lessons: [{ paperId: 1, paperName: "Introduction to Programming", lessonId: 1, lessonType: "video", title: "What is Programming?" }] },
      { week: 1, day: 3, lessons: [{ paperId: 1, paperName: "Introduction to Programming", lessonId: 2, lessonType: "pdf", title: "Variables and Data Types" }] },
      { week: 1, day: 5, lessons: [{ paperId: 2, paperName: "Mathematics I", lessonId: 3, lessonType: "video", title: "Differential Calculus" }] },
      { week: 2, day: 1, lessons: [{ paperId: 2, paperName: "Mathematics I", lessonId: 4, lessonType: "pdf", title: "Chapter 1 – Study Notes" }] },
      { week: 2, day: 3, lessons: [{ paperId: 1, paperName: "Introduction to Programming", lessonId: 4, lessonType: "video", title: "Understanding Functions" }] },
    ]
  }
]

export const events = [
  {
    id: 1,
    title: "Live Algebra Class",
    type: "LiveClass",
    courseId: 1,
    courseName: "BCA",
    semesterId: 1,
    paperId: 1,
    paperName: "Introduction to Programming",
    teacherId: 1,
    teacherName: "Ravi Kumar",
    date: "2024-07-15",
    startTime: "09:00",
    endTime: "10:00",
    link: "https://meet.google.com/xxx",
    targetStudents: "all"
  },
  {
    id: 2,
    title: "Mid Term Exam",
    type: "Exam",
    courseId: 1,
    courseName: "BCA",
    semesterId: 1,
    paperId: 2,
    paperName: "Mathematics I",
    teacherId: 1,
    teacherName: "Ravi Kumar",
    date: "2024-07-20",
    startTime: "10:00",
    endTime: "12:00",
    link: null,
    targetStudents: "all"
  },
  {
    id: 3,
    title: "Assignment Submission",
    type: "Activity",
    courseId: 1,
    courseName: "BCA",
    semesterId: 1,
    paperId: 3,
    paperName: "Digital Logic",
    teacherId: 1,
    teacherName: "Ravi Kumar",
    date: "2024-07-25",
    startTime: "23:59",
    endTime: "23:59",
    link: null,
    targetStudents: "all"
  },
]
