const mysql = require("mysql");

module.exports = function (app, connection, upload, multer, image_name) {
  app.post("/teacherlogin", (req, res) => {
    connection.query(
      'SELECT * FROM teachers WHERE 	teacher_password ="' +
        req.body.teacher_password +
        '" && teacher_email ="' +
        req.body.teacher_email +
        '"',
      function (err, data) {
        if (data.length) {
          console.log(data);
          res.json(data);
        } else {
          res.send("0");
        }
      }
    );
  });
  app.post("/studentlogin", (req, res) => {
    connection.query(
      'SELECT * FROM students WHERE 	student_password ="' +
        req.body.student_password +
        '" && student_email ="' +
        req.body.student_email +
        '"',
      function (err, data) {
        if (data.length) {
          console.log(data);
          res.json(data);
        } else {
          res.send("0");
        }
      }
    );
  });
  app.post("/getquestions", (req, res) => {
    connection.query(
      'SELECT * FROM questions WHERE 	subject_id ="' + req.body.subject_id + '"',
      function (err, data) {
        if (data.length) {
          console.log(data);
          res.json(data);
        } else {
          res.send("No Questions Found");
        }
      }
    );
  });
  app.get("/getsubjects", (req, res) => {
    connection.query("SELECT * FROM subjects ", function (err, data) {
      if (data.length) {
        console.log(data);
        res.json(data);
      } else {
        res.send("No Questions Found");
      }
    });
  });
  app.post("/addsubject", (req, res) => {
    let data = {
      subject_name: req.body.subject_name,
    };
    let sql = "INSERT INTO subjects SET ?";
    let query = connection.query(sql, data, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });
  app.delete("/deletesubject", (req, res) => {
    let subject_id = req.body.subject_id;
    connection.query(
      `DELETE FROM subjects WHERE subject_id = ${subject_id}`,
      function (err, data) {
        if (err) {
          res.json(err);
        } else {

          connection.query(`DELETE FROM questions WHERE subject_id = ${subject_id}`,
          function(err, data){
            if(err){
              console.log(err)
            }else{
              res.send("1");
            }
          })
          
        }
      }
    );
  });
  app.post("/addquestion", (req, res) => {
    let data = {
      subject_id: req.body.subject_id,
      question: req.body.question,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      answer: req.body.answer,
    };
    let sql = "INSERT INTO questions SET ?";
    let query = connection.query(sql, data, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });

  app.post("/addquestion", (req, res) => {
    let data = {
      subject_id: req.body.subject_id,
      question: req.body.question,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      answer: req.body.answer,
    };
    let sql = "INSERT INTO questions SET ?";
    let query = connection.query(sql, data, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });
  app.post("/updatequestion", function (req, res) {
    connection.query(
      'UPDATE questions SET question = "' +
        req.body.question +
        '", option1 = "' +
        req.body.option1 +
        '", option2 = "' +
        req.body.option2 +
        '", option3 = "' +
        req.body.option3 +
        '", option4 = "' +
        req.body.option4 +
        '", answer = "' +
        req.body.answer +
        '" WHERE question_id ="' +
        req.body.question_id +
        '"  ',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json("1");
        }
      }
    );
  });
  app.delete("/deletequestion", (req, res) => {
    let question_id = req.body.question_id;
    connection.query(
      `DELETE FROM questions WHERE question_id = ${question_id}`,
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          res.send("1");
        }
      }
    );
  });
};
