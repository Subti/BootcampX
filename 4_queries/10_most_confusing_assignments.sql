SELECT assignments.id, assignments.name, assignments.day, assignments.chapter, COUNT(assistance_requests.id) AS total_requests
FROM assistance_requests
JOIN assignments ON assignments.id = assistance_requests.assignment_id
GROUP BY assignments.id
ORDER BY num_assistance_requests DESC;