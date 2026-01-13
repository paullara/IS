<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Internship;

class InternshipSeeder extends Seeder
{
    public function run(): void
    {
        $employerId = 6;

        $internships = [
            [
                'employer_id' => $employerId,
                'title' => 'Software Developer Intern',
                'description' => 'Assist in developing and testing web applications using Laravel and React.',
                'requirements' => 'Basic knowledge of PHP, Laravel, and JavaScript.',
                'start_date' => '2025-11-01',
                'end_date' => '2025-11-30',
                'status' => 'open',
            ],
            [
                'employer_id' => $employerId,
                'title' => 'UI/UX Design Intern',
                'description' => 'Work closely with the product team to design user-friendly interfaces.',
                'requirements' => 'Experience with Figma or Adobe XD.',
                'start_date' => '2025-11-05',
                'end_date' => '2025-11-30',
                'status' => 'open',
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Data Analyst Intern',
                'description' => 'Assist in analyzing large datasets and generating reports for business insights.',
                'requirements' => 'Proficient in Excel, SQL, or Power BI.',
                'start_date' => '2025-11-18',
                'end_date' => '2025-11-30',
                'status' => 'open',
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Quality Assurance Intern',
                'description' => 'Test and document bugs for both backend and frontend systems.',
                'requirements' => 'Strong attention to detail and critical thinking.',
                'start_date' => '2025-11-21',
                'end_date' => '2025-11-30',
                'status' => 'open',
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Content Writer Intern',
                'description' => 'Create articles, website content, and social media posts related to company projects.',
                'requirements' => 'Excellent English writing skills.',
                'start_date' => '2025-11-15',
                'end_date' => '2025-11-30',
                'status' => 'open',
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Project Management Intern',
                'description' => 'Assist the project manager with timelines, documentation, and coordination.',
                'requirements' => 'Good communication and organization skills.',
                'start_date' => '2025-11-01',
                'end_date' => '2025-11-11',
                'status' => 'open',
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Network Engineering Intern',
                'description' => 'Help maintain and troubleshoot local network systems and devices.',
                'requirements' => 'Basic networking and troubleshooting knowledge.',
                'start_date' => '2025-11-20',
                'end_date' => '2025-12-20',
                'status' => 'open',
            ],
            [
                'employer_id' => $employerId,
                'title' => 'HR Intern',
                'description' => 'Assist HR in recruitment, onboarding, and employee records management.',
                'requirements' => 'Good communication and organizational skills.',
                'start_date' => '2025-11-15',
                'end_date' => '2025-12-15',
                'status' => 'open',
            ],
        ];

        Internship::insert($internships);
    }
}
