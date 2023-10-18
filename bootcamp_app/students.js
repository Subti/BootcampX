const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

console.log("connected");

const queryString = `
SELECT students.id, students.name, students.cohort_id, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
