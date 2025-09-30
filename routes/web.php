<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CoordinatorController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\StudentProfileController;
use App\Http\Controllers\GroupDocumentController;
use App\Http\Controllers\IncidentReportController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ApplyController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\VisitationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/notifications', function () {
    return auth()->user()->unreadNotifications;
});

Route::get('/notifications/json', function () {
    return auth()->user()->notifications; // includes both read and unread
});


Route::post('/notifications/{id}/read', function ($id) {
    $notification = auth()->user()->notifications()->findOrFail($id);
    $notification->markAsRead();

    return back();
});

Route::post('/admin/notifications/read/{id}', function ($id) {
    $admin = Auth::user();
    $notification = $admin->notifications()->find($id);
    if ($notification) $notification->markAsRead();
    return back();
})->middleware('auth');


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Admin Verification Routes
Route::middleware(['auth', 'coordinator'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/verification', [AdminController::class, 'studentList'])->name('admin.verification');
    Route::get('/admin/monitor/student', [AdminController::class, 'monitorStudent'])->name('admin.monitor');
    Route::get('/admin/verification/{id}', [AdminController::class, 'showVerificationDetails'])->name('admin.verificationDetails');
    Route::get('/companies', [AdminController::class, 'companies'])->name('admin.companies');
    Route::post('/admin/verification/{id}/status', [AdminController::class, 'updateVerificationStatus'])->name('admin.updateVerificationStatus');
    Route::get('/admin/notifications', [AdminController::class, 'notification'])->name('admin.notification');
    Route::resource('coordinators', CoordinatorController::class);
    Route::resource('courses', CourseController::class);
});

Route::middleware(['auth', 'employer'])->group(function () {
    Route::get('/employer/dashboard', [EmployerController::class, 'dashboard'])->name('employer.dashboard');
    Route::get('/employers/edit', [EmployerController::class, 'edit'])->name('employers.edit');
    Route::put('/employers/update', [EmployerController::class, 'update'])->name('employers.update');

    Route::get('/employers', [EmployerController::class, 'employerProfile'])->name('employers.index');
    Route::get('/employers/create', [EmployerController::class, 'create'])->name('employers.create');
    Route::get('/employers/{employerProfile}/edit', [EmployerController::class, 'edit'])->name('employers.edit');
    Route::post('/employers/', [EmployerController::class, 'store'])->name('employers.store');
    Route::put('/employers/{user}', [EmployerController::class, 'update'])->name('employers.update');
    Route::delete('/employers/{employerProfile}', [EmployerController::class, 'destroy'])->name('employers.destroy');
    Route::get('/employer/notification', [EmployerController::class, 'notification'])->name('employer.notification');
    Route::get('/employer/internships', [InternshipController::class, 'index'])->name('internships.index');
    Route::get('/employer/internships/create', [InternshipController::class, 'create'])->name('internships.create');
    Route::post('/employer/internships', [InternshipController::class, 'store'])->name('internships.store');
    Route::get('/employer/internships/{internship}/edit', [InternshipController::class, 'edit'])->name('internships.edit');
    Route::patch('/employer/internships/{internship}', [InternshipController::class, 'update'])->name('internships.update');
    Route::delete('/internships/{internship}', [InternshipController::class, 'destroy'])->name('internships.destroy');
    Route::get('/employer/applicants', [EmployerController::class, 'applicants'])->name('employer.applicants');
    Route::get('/employer/applicants/{student}', [EmployerController::class, 'viewProfile']);
    Route::put('/employer/applications/{id}/status', [EmployerController::class, 'updateStatus']);
    Route::get('/employer/requirements', [EmployerController::class, 'showRequirements'])->name('employer.requirements.index');
    Route::get('/employer/requirements/{id}/details', [EmployerController::class, 'viewRequirementDetails'])->name('employer.requirements.view');
    Route::post('/employer/requirement/{id}/approve', [EmployerController::class, 'approveRequirement']);
    Route::post('/employer/requirement/{id}/reject', [EmployerController::class, 'rejectRequirement']);
    Route::get('/interns', [EmployerController::class, 'getInterns'])->name('interns');
    Route::get('/verify', [ApplyController::class, 'create'])->name('company.verify');
    Route::post('/apply', [ApplyController::class, 'store'])->name('company-application.store');
    Route::get('/employer/application-status', [EmployerController::class, 'checkStatus']);
    Route::get('/employer/incident/report/', [EmployerController::class, 'incidentReport'])->name('incident.report.employer');
    Route::get('/internships/report', [EmployerController::class, 'internshipForIncidentReport']);
    Route::post('/incident-reports', [IncidentReportController::class, 'store']);
    Route::post('/evaluations', [EvaluationController::class, 'store']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [StudentProfileController::class, 'dashboard'])->name('dashboard');
    Route::get('/student/notification', [StudentProfileController::class, 'notification'])->name('notification');
    Route::get('/student/profile', [StudentProfileController::class, 'edit'])->name('student.profile.edit');
    Route::post('/student/profile', [StudentProfileController::class, 'store'])->name('student.profile.store');
    Route::put('/student/profile/update', [StudentProfileController::class, 'update'])->name('student.profile.update');
    Route::get('/student/verification', [VerificationController::class, 'create'])->name('student.verification.create');
    Route::post('/student/verification', [VerificationController::class, 'store'])->name('student.verification.store');
    Route::post('/student/application', [ApplicationController::class, 'store'])->name('apply');
    Route::get('/student/applications', [StudentProfileController::class, 'application'])->name('student.applications');
    Route::get('/student/requirements', [StudentProfileController::class, 'showRequirements'])->name('student.requirements.index');
    Route::post('/student/requirements/submit', [StudentProfileController::class, 'submitRequirements'])->name('student.requirements.store');
    Route::get('/student/profile/nav', [StudentProfileController::class, 'getProfileName']);
    Route::get('/student/details', [StudentProfileController::class, 'studentInfo']);
    Route::get('/student/edit/details', [StudentProfileController::class, 'editProfileInfo']);
    Route::get('/student/profile', [StudentProfileController::class, 'show'])->name('student.profile.show');
    Route::get('/student/profile/{user}/edit', [StudentProfileController::class, 'editMe'])->name('student.profile.edit');
    Route::patch('/profile/{user}', [StudentProfileController::class, 'updateMe'])->name('student.profile.update');
    Route::get('/internships/offer', [StudentProfileController::class, 'getInternships']);
    Route::get('/existing/application', [ApplicationController::class, 'getExistingApplications']);
});

// Student group list and group show routes
Route::get('/student/groups', [\App\Http\Controllers\StudentController::class, 'groups'])->name('student.groups');
Route::get('/student/groups/{group}', [\App\Http\Controllers\StudentController::class, 'showGroup'])->name('student.groups.show');
Route::get('/groups/{group}', [GroupController::class, 'showGroup'])->name('groups.show');
Route::get('/coordinator/dashboard', [CoordinatorController::class, 'dashboard'])->name('coordinator.dashboard');
Route::get('/instructors', [CoordinatorController::class, 'indexInstructor'])->name('instructor.list');
Route::get('/coordinator/instructors/create', [CoordinatorController::class, 'createInstructor'])->name('coordinator.instructors.create');
Route::post('/coordinator/instructors', [CoordinatorController::class, 'storeInstructor'])->name('coordinator.instructors.store');
Route::get('/coordinator/instructors/{id}', [CoordinatorController::class, 'showInstructor'])->name('coordinator.instructors.show');
Route::get('/coordinator/instructors/{id}/edit', [CoordinatorController::class, 'editInstructor'])->name('coordinator.instructors.edit');
Route::put('/coordinator/instructors/{id}', [CoordinatorController::class, 'updateInstructor'])->name('coordinator.instructors.update');
Route::delete('/coordinator/instructors/{id}', [CoordinatorController::class, 'destroyInstructor'])->name('coordinator.instructors.destroy');
Route::get('/coordinator/sample', [CoordinatorController::class, 'instructors'])->name('coordinator.instructors');
Route::get('/coordinator/courses', [CoordinatorController::class, 'myCourses'])->name('coordinator.courses');
Route::get('/coordinator/courses/{id}', [CoordinatorController::class, 'showCourse'])->name('coordinator.courses.show');
// Add/Remove instructors to course
Route::post('/coordinator/courses/{id}/add-instructor', [CoordinatorController::class, 'addInstructor'])->name('coordinator.courses.addInstructor');
Route::delete('/coordinator/courses/{id}/remove-instructor/{instructorId}', [CoordinatorController::class, 'removeInstructor'])->name('coordinator.courses.removeInstructor');
// Add/Remove students to course
Route::post('/coordinator/courses/{id}/add-student', [CoordinatorController::class, 'addStudent'])->name('coordinator.courses.addStudent');
Route::delete('/coordinator/courses/{id}/remove-student/{studentId}', [CoordinatorController::class, 'removeStudent'])->name('coordinator.courses.removeStudent');
// Document management for courses
Route::get('/coordinator/courses/{course}/documents', [\App\Http\Controllers\DocumentController::class, 'index'])->name('coordinator.courses.documents');
Route::post('/coordinator/courses/{course}/documents', [\App\Http\Controllers\DocumentController::class, 'store'])->name('coordinator.courses.documents.store');
Route::delete('/coordinator/courses/{course}/documents/{id}', [\App\Http\Controllers\DocumentController::class, 'destroy'])->name('coordinator.courses.documents.destroy');
// Announcement management for courses
Route::get('/coordinator/courses/{course}/announcements', [\App\Http\Controllers\AnnouncementController::class, 'index'])->name('coordinator.courses.announcements');
Route::post('/coordinator/courses/{course}/announcements', [\App\Http\Controllers\AnnouncementController::class, 'store'])->name('coordinator.courses.announcements.store');
Route::delete('/coordinator/courses/{course}/announcements/{id}', [\App\Http\Controllers\AnnouncementController::class, 'destroy'])->name('coordinator.courses.announcements.destroy');
Route::get('/coordinator/internships', [CoordinatorController::class, 'internships'])->name('coordinator.internships');
Route::get('/coordinator/internships/{id}', [CoordinatorController::class, 'showInternship'])->name('coordinator.internships.show');
Route::get('/coordinator/{id}/assign', [CoordinatorController::class, 'assignStudent'])->name('coordinator.internships.assign');
Route::post('/coordinator/internships/assign-student', [CoordinatorController::class, 'assignStudentToInternship'])->name('coordinator.internships.assign-student');
Route::get('/coordinator/verifications', [CoordinatorController::class, 'verifications'])->name('coordinator.verifications');
Route::get('/pending/status', [ApplyController::class, 'getPendingStats']);
Route::post('/company-applications/{id}/status', [ApplyController::class, 'updateStatus']);
Route::get('/company', [CoordinatorController::class, 'getPartners']);
Route::get('/company/all', [CoordinatorController::class, 'companies'])->name('coordinator.companies');
Route::get('/visitation', [CoordinatorController::class, 'visitation'])->name('coordinator.visitation');
Route::get('/visitation/companies', [VisitationController::class, 'companies']);
Route::post('/visitation/store', [VisitationController::class, 'store']);
Route::get('/visitations', [VisitationController::class, 'visitation']);
Route::get('/get/instructor', [CoordinatorController::class, 'getInstructors']);
Route::get('/student/master/list', [CoordinatorController::class, 'studentMasterList'])->name('student.master.list');
Route::get('/reports/student-masterlist/download', [ReportController::class, 'downloadStudentMasterList'])->name('reports.student-masterlist.download');
Route::get('/coordinator/notifications', [CoordinatorController::class, 'notification'])->name('coordinator.notification');
Route::get('/incident/report', [CoordinatorController::class, 'incidentReport'])->name('coordinator.incident');
Route::get('/incident/report/fetch', [CoordinatorController::class, 'getIncidentReport']);
Route::get('/evaluation/monitor' , [EvaluationController::class, 'monitorEvaluation'])->name('monitor.evaluation');
Route::get('/evaluation/fetch', [EvaluationController::class, 'evaluatedStudent']);
// Coordinator: Groups with students
Route::get('/coordinator/groups', [CoordinatorController::class, 'groupsWithStudents'])->name('coordinator.groups');
Route::get('/coordinator/groups/create', [GroupController::class, 'create'])->name('instructor.groups.create');
Route::get('instructor/dashboard', [InstructorController::class, 'dashboard'])->name('instructor.dashboard');
Route::get('/groups', [GroupController::class, 'index'])->name('groups.index');
Route::post('/groups', [GroupController::class, 'store'])->name('groups.store');
Route::post('/groups/{group}/assign-students', [GroupController::class, 'assignStudents']);
Route::get('/groups/{group}/messages', [\App\Http\Controllers\MessageController::class, 'index'])->name('groups.messages.index');
Route::post('/groups/{group}/messages', [\App\Http\Controllers\MessageController::class, 'store'])->name('groups.messages.store');
Route::get('instructor/courses', [InstructorController::class, 'myCoursesAsInstructor'])->name('instructor.courses');
Route::get('instructor/courses/{id}', [InstructorController::class, 'show'])->name('courses.show');
Route::get('student/courses', [StudentController::class, 'myCoursesAsStudent'])->name('student.courses');
Route::get('student/courses/{id}', [StudentController::class, 'show'])->name('student.courses.show');
Route::get('/groups/{group}/documements', [GroupDocumentController::class, 'index'])->name('groups.documents.index');
Route::post('/groups/{group}/documents', [GroupDocumentController::class, 'store'])->name('groups.documents.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';