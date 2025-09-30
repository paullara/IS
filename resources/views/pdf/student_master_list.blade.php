<!DOCTYPE html>
<html>

<head>
    <title>Student Master List</title>
    <style>
    body {
        font-family: sans-serif;
        font-size: 12px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 6px;
        text-align: left;
    }

    th {
        background: #f4f4f4;
    }
    </style>
</head>

<body>
    <h2>Student Master List</h2>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>School ID</th>
                <th>Company</th>
                <th>Internship</th>
                <th>Group - Section</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($students as $index => $student)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $student['name'] }}</td>
                <td>{{ $student['student_id'] }}</td>
                <td>{{ $student['company'] }}</td>
                <td>{{ $student['internship'] }}</td>
                <td>{{ $student['group_section'] }}</td>
                <td>{{ $student['status'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>