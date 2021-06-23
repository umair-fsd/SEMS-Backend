const mysql = require("mysql");
var fs = require("fs");
var multer = require("multer");
const { time } = require("console");
// var upload = multer({ dest: 'uploads/' }); //setting the default folder for multer
// const logger = require('simple-node-logger').createSimpleLogger();
// const logger = require('simple-node-logger').createSimpleLogger('project.log');
const logger =
  require("simple-node-logger").createSimpleFileLogger("project.log");

module.exports = function (app, connection, multer, upload, image_name) {
  app.get("/", function (req, res) {
    res.send("Welcome to medcity");
  });

  app.post("/gallery", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT tbl_paragraph.*, tbl_user.* FROM tbl_paragraph INNER JOIN tbl_user ON tbl_paragraph.user_id = tbl_user.user_id WHERE tbl_paragraph.sub_category="' +
          item +
          '" AND tbl_paragraph.block_list != "blocked" AND tbl_user.block_list != "blocked" ORDER BY tbl_paragraph.paragraph_id DESC',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/galleryaritclesintrestlist", function (req, res) {
    connection.query(
      'SELECT * FROM follwing WHERE user_id="' + req.body.data + '"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          var nietos = [];
          if (data.length !== 0) {
            let combinedArray1 = [];
            hello = () => {
              return new Promise((resolve, reject) => {
                for (let i = 0; i < data.length; i++) {
                  connection.query(
                    'SELECT tbl_paragraph.*, tbl_user.username FROM tbl_paragraph INNER JOIN tbl_user ON tbl_paragraph.user_id = tbl_user.user_id WHERE tbl_paragraph.user_id="' +
                      data[i].follow_id +
                      '" AND tbl_paragraph.block_list != "blocked" AND tbl_user.block_list != "blocked" ORDER BY tbl_paragraph.paragraph_id DESC',
                    // 'SELECT * FROM tbl_paragraph WHERE user_id="' +
                    //   data[i].follow_id +
                    //   '" AND block_list !="blocked"',
                    function (err, data1) {
                      nietos = nietos.concat(data1);
                      if (i === data.length - 1) {
                        resolve(nietos);
                        console.log(data1.length);
                      }
                    }
                  );
                }
              });
            };
            hello().then((combinedArray) => res.json(combinedArray));
          } else {
            res.send("Nothing in this Category");
          }
        }
      }
    );
  });

  app.post("/galleryvideointrestlist", function (req, res) {
    connection.query(
      'SELECT * FROM follwing WHERE user_id="' + req.body.data + '"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          var nietos = [];
          if (data.length !== 0) {
            let combinedArray1 = [];
            hello = () => {
              return new Promise((resolve, reject) => {
                for (let i = 0; i < data.length; i++) {
                  connection.query(
                    'SELECT tbl_video.*, tbl_user.username FROM tbl_video INNER JOIN tbl_user ON tbl_video.user_id = tbl_user.user_id WHERE tbl_video.user_id="' +
                      data[i].follow_id +
                      '" AND tbl_video.block_list != "blocked" AND tbl_user.block_list != "blocked" ORDER BY tbl_video.video_id DESC',
                    // 'SELECT * FROM tbl_paragraph WHERE user_id="' +
                    //   data[i].follow_id +
                    //   '" AND block_list !="blocked"',
                    function (err, data1) {
                      nietos = nietos.concat(data1);
                      if (i === data.length - 1) {
                        resolve(nietos);
                        console.log(data1.length);
                      }
                    }
                  );
                }
              });
            };
            hello().then((combinedArray) => res.json(combinedArray));
          } else {
            res.send("Nothing in this Category");
          }
        }
      }
    );
  });

  app.post("/bloggsintrestgallery", function (req, res) {
    console.log(req.body.obj.data);
    connection.query(
      'SELECT * FROM follwing WHERE user_id="' + req.body.obj.data + '"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          var nietos = [];
          // console.log(data);
          if (data.length !== 0) {
            let combinedArray1 = [];
            hello = () => {
              return new Promise((resolve, reject) => {
                for (let i = 0; i < data.length; i++) {
                  connection.query(
                    'SELECT bloggers.*, tbl_user.username FROM bloggers INNER JOIN tbl_user ON bloggers.user_id = tbl_user.user_id WHERE bloggers.user_id="' +
                      data[i].follow_id +
                      '" AND tbl_user.block_list != "blocked" ORDER BY bloggers.bloggers_id DESC',
                    // 'SELECT * FROM tbl_paragraph WHERE user_id="' +
                    //   data[i].follow_id +
                    //   '" AND block_list !="blocked"',
                    function (err, data1) {
                      nietos = nietos.concat(data1);
                      if (i === data.length - 1) {
                        resolve(nietos);
                      }
                    }
                  );
                }
              });
            };
            hello().then((combinedArray) => res.json(combinedArray));
          } else {
            res.send("Nothing in this Category");
          }
        }
      }
    );
  });

  app.post("/quotesintrestgallery", function (req, res) {
    console.log(req.body.obj.data);
    connection.query(
      'SELECT * FROM follwing WHERE user_id="' + req.body.obj.data + '"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          var nietos = [];
          if (data.length !== 0) {
            let combinedArray1 = [];
            hello = () => {
              return new Promise((resolve, reject) => {
                for (let i = 0; i < data.length; i++) {
                  connection.query(
                    'SELECT quotes.*, tbl_user.username FROM quotes INNER JOIN tbl_user ON quotes.user_id = tbl_user.user_id WHERE quotes.user_id="' +
                      data[i].follow_id +
                      '" AND tbl_user.block_list != "blocked" ORDER BY quotes.quotes_id DESC',
                    // 'SELECT * FROM tbl_paragraph WHERE user_id="' +
                    //   data[i].follow_id +
                    //   '" AND block_list !="blocked"',
                    function (err, data1) {
                      nietos = nietos.concat(data1);
                      if (i === data.length - 1) {
                        console.log(nietos);
                        resolve(nietos);
                      }
                    }
                  );
                }
              });
            };
            hello().then((combinedArray) => res.json(combinedArray));
          } else {
            res.send("Nothing in this Category");
          }
        }
      }
    );
  });

  app.post("/galleryuserarticles", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM tbl_paragraph WHERE user_id="' +
          item +
          '" AND block_list != "blocked"',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/galleryMostviewed", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT tbl_paragraph.*, tbl_user.* FROM tbl_paragraph INNER JOIN tbl_user ON tbl_paragraph.user_id = tbl_user.user_id WHERE tbl_paragraph.sub_category="' +
          item +
          '" AND tbl_paragraph.block_list != "blocked" ORDER BY tbl_paragraph.views DESC',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
              console.log(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/updateloginadmin", function (req, res) {
    if (req.body.adminEmail && req.body.adminPassword) {
      connection.query(
        'UPDATE tbl_admin SET username = "' +
          req.body.adminEmail +
          '",password = "' +
          req.body.adminPassword +
          '" WHERE tbl_admin_id ="' +
          req.body.data +
          '"  ',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            res.send("1");
          }
        }
      );
    } else {
      res.json("Please enter username or password");
    }
  });

  app.post("/updateloginadminanswer", function (req, res) {
    if (req.body.answer) {
      connection.query(
        'UPDATE tbl_admin SET answer = "' +
          req.body.answer +
          '" WHERE tbl_admin_id ="' +
          req.body.data +
          '"  ',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            res.send("1");
          }
        }
      );
    } else {
      res.json("Please enter answer");
    }
  });

  app.post("/Forgotadminpass", function (request, response) {
    var answer = request.body.answer;
    console.log(request.body);
    if (answer) {
      connection.query(
        "SELECT * FROM tbl_admin WHERE answer = ?",
        [answer],
        function (error, results, data, fields) {
          if (results.length > 0) {
            response.json(results);
          } else {
            response.json("Incorrect answer and/or Password!");
          }
          response.end();
        }
      );
    } else {
      response.json("Please enter Username and Password!");
      response.end();
    }
  });

  app.post("/adminlogin", function (request, response) {
    var username = request.body.adminEmail;
    var password = request.body.adminPassword;
    console.log(request.body);
    if (username && password) {
      connection.query(
        "SELECT * FROM tbl_admin WHERE username = ? AND password = ?",
        [username, password],
        function (error, results, data, fields) {
          if (results.length > 0) {
            response.json(results);
          } else {
            response.json("Incorrect Username and/or Password!");
          }
          response.end();
        }
      );
    } else {
      response.json("Please enter Username and Password!");
      response.end();
    }
  });

  app.post("/galleryRecentuploaded", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT tbl_paragraph.*, tbl_user.* FROM tbl_paragraph INNER JOIN tbl_user ON tbl_paragraph.user_id = tbl_user.user_id WHERE tbl_paragraph.sub_category="' +
          item +
          '" AND tbl_paragraph.block_list != "blocked" ORDER BY tbl_paragraph.paragraph_id DESC',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/gallerysRecentuploaded", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT tbl_paragraph.*, tbl_user.user_id,tbl_user.username FROM tbl_paragraph INNER JOIN tbl_user ON tbl_paragraph.user_id = tbl_user.user_id WHERE tbl_paragraph.category="' +
          item +
          '" AND tbl_paragraph.block_list != "blocked" ORDER BY paragraph_id DESC',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/articlesgallery", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT tbl_paragraph.*, tbl_user.* FROM tbl_paragraph INNER JOIN tbl_user ON tbl_paragraph.user_id = tbl_user.user_id WHERE tbl_paragraph.category="' +
          item +
          '" AND tbl_paragraph.block_list != "blocked" AND tbl_user.block_list != "blocked" ORDER BY tbl_paragraph.paragraph_id DESC',
        // 'SELECT tbl_paragraph.*, tbl_user.user_id,tbl_user.username FROM tbl_paragraph INNER JOIN tbl_user ON tbl_paragraph.user_id = tbl_user.user_id WHERE tbl_paragraph.category="' +
        //   item +
        //   '" AND tbl_paragraph.block_list != "blocked" ORDER BY tbl_paragraph.paragraph_id DESC',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/articlesgalleryMostviewed", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT tbl_paragraph.*, tbl_user.user_id,tbl_user.username FROM tbl_paragraph INNER JOIN tbl_user ON tbl_paragraph.user_id = tbl_user.user_id WHERE tbl_paragraph.category="' +
          item +
          '" AND tbl_paragraph.block_list != "blocked" ORDER BY views DESC',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/videogallery", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM tbl_video WHERE sub_category="' +
          item +
          '" AND block_list != "blocked" ORDER BY video_id DESC',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/videogalleryUservideos", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM tbl_video WHERE user_id="' +
          item +
          '" AND block_list != "blocked"',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/videogalleryMostviewed", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM tbl_video WHERE sub_category="' +
          item +
          '" AND block_list != "blocked" ORDER BY views DESC',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/videogalleryRecentlyupload", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM tbl_video WHERE sub_category="' +
          item +
          '" AND block_list != "blocked" ORDER BY video_id DESC',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/bloggsgallery", function (req, res) {
    var cart = req.body;
    connection.query(
      "SELECT bloggers.*, tbl_user.user_id,tbl_user.username FROM bloggers INNER JOIN tbl_user ON bloggers.user_id = tbl_user.user_id  ORDER BY bloggers_id DESC",
      function (err, data) {
        console.log("data");
        console.log(data);
        if (err) {
          res.send(err);
        } else {
          if (data.length !== 0) {
            res.json(data);
          } else {
            res.send("Nothing in this Category");
          }
        }
      }
    );
  });

  app.post("/quotesgallery", function (req, res) {
    var cart = req.body;
    connection.query(
      "SELECT quotes.*, tbl_user.user_id,tbl_user.username FROM quotes INNER JOIN tbl_user ON quotes.user_id = tbl_user.user_id  ORDER BY quotes_id DESC",
      function (err, data) {
        console.log("data");
        console.log(data);
        if (err) {
          res.send(err);
        } else {
          if (data.length !== 0) {
            res.json(data);
          } else {
            res.send("Nothing in this Category");
          }
        }
      }
    );
  });

  app.post("/videosgallery", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      console.log(item);
      connection.query(
        'SELECT tbl_video.*, tbl_user.user_id,tbl_user.username FROM tbl_video INNER JOIN tbl_user ON tbl_video.user_id = tbl_user.user_id WHERE tbl_video.category="' +
          item +
          '" AND tbl_video.block_list != "blocked" AND tbl_user.block_list != "blocked" ORDER BY tbl_video.video_id DESC',
        function (err, data) {
          console.log("data");
          console.log(data);
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/videosgalleryMostviewed", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM tbl_video WHERE category="' +
          item +
          '" AND block_list != "blocked" ORDER BY views DESC',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  app.post("/videosgalleryRecentuploaded", function (req, res) {
    var cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart));
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM tbl_video WHERE category="' +
          item +
          '" AND block_list != "blocked" ORDER BY video_id DESC',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data.length !== 0) {
              res.json(data);
            } else {
              res.send("Nothing in this Category");
            }
          }
        }
      );
    });
  });

  // start of dashbord
  app.get("/getdatadashbord", function (req, res) {
    // Select COUNT(*) as total from tbl_users where delete_status = 0;
    var checked = "true";
    var sql = "Select 	user_id   from tbl_user where user_gender= 'nothing'";
    sql = mysql.format(sql, [checked]);

    connection.query(sql, [2, 1], function (err, results, data, fields) {
      err ? res.send(err) : res.json(results);
    });
  });

  /////////////////////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.////////////////////
  /////////////////////Customer Apis Start From here ////////////////////
  /////////////////////'''''''''''''''''''''''''''''/////////////////////

  //// Customer Log in ///////

  // get data of loginpageID
  app.post("/login", function (req, res, next) {
    var email = req.body.adminEmail;
    var password = req.body.adminPassword;

    connection.query(
      "Select * from tbl_user WHERE email = ? AND password = ?",
      [email, password],
      function (err, row, fields, data) {
        if (err) console.log(err);

        if (row.length > 0) {
          // (err) ? res.send(err) : res.json(data);
          res.send({ success: true, message: row[0].id });
        } else {
          res.send({
            success: false,
            message: "user not found, please try again",
          });
        }
      }
    );
  });

  //let data during Login........

  app.post("/getCustommerData", function (req, res) {
    var user_email = req.body.email;
    var user_password = req.body.password;

    connection.query(
      "Select * from tbl_user WHERE user_email = '" +
        user_email +
        "' AND user_password = '" +
        user_password +
        "' ",
      function (err, data) {
        if (err) {
          res.json("0");
        } else {
          res.json(data);
        }
      }
    );
  });

  //////////////////////////////// Customer Login End //////////////////////////

  ////////////////////////////////Question getting //////////////////////////////

  app.post("/tbl_newquestions", function (req, res) {
    connection.query(
      "Select * from tbl_newquestions WHERE question_id=(SELECT max(question_id) FROM tbl_newquestions)",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/profileimages", function (req, res) {
    console.log("Requested Image: ", req.body.idimages);
    connection.query(
      "Select * from tbl_portfolioimgs WHERE user_id='" +
        req.body.idimages +
        "' ",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  // insert Answer..............

  app.post("/insertreportarticle", function (req, res) {
    let cart = req.body;
    ////////////
    let sql =
      "UPDATE tbl_paragraph SET block_list='reported' WHERE paragraph_id='" +
      cart.id +
      "'";
    let query = connection.query(sql, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });

  app.post("/insertreportvideo", function (req, res) {
    let cart = req.body;
    ////////////
    let sql =
      "UPDATE tbl_video SET block_list='reported' WHERE video_id='" +
      cart.id +
      "'";
    let query = connection.query(sql, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });

  app.post("/insertIntoAnswer", function (req, res) {
    let cart = req.body;

    ////////////
    let data = {
      question_id: cart.questionID,
      customer_id: cart.customerID,
      user_ans: cart.userAns,
      correct_ans: cart.correctAns,
      points: cart.points,
    };
    let sql = "INSERT INTO answer SET ?";
    let query = connection.query(sql, data, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });

  app.post("/viewinsert", function (req, res) {
    let cart = req.body;
    let sql =
      "UPDATE tbl_video SET views = '" +
      cart.view +
      "' WHERE video_id= '" +
      cart.user_id +
      "' ";
    let query = connection.query(sql, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });

  app.post("/viewinsertparagraph", function (req, res) {
    let cart = req.body;
    let sql =
      "UPDATE tbl_paragraph SET views = '" +
      cart.view +
      "' WHERE paragraph_id= '" +
      cart.user_id +
      "' ";
    let query = connection.query(sql, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });

  ////////////////////////////////Question End /////////////////////////

  ////////////////////////////// Customer Order /////////////////////////////

  app.post("/insertIntoUserOrder", function (req, res) {
    let cart = req.body;

    let data = { pragraph_text: cart[0], sub_category: cart[1] };
    let sql = "INSERT INTO tbl_paragraph SET ?";
    let query = connection.query(sql, data, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });

  app.post("/insertIntoUserOrder", function (req, res) {
    let cart = req.body;

    let data = { pragraph_text: cart[0], sub_category: cart[1] };
    let sql = "INSERT INTO tbl_paragraph SET ?";
    let query = connection.query(sql, data, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });

  app.post("/insertreport", function (req, res) {
    let cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart)); // req.body = [Object: null prototype] { title: 'product' }
    Object.keys(obj).map((item) => {});

    // let data = { pragraph_text: cart[0],sub_category: cart[1] };
    // let sql = "INSERT INTO tbl_paragraph SET ?";
    // let query = connection.query(sql, data, (err, results) => {
    //     if (err) {
    //         res.json(err);
    //     }
    //     else {
    //         res.json("1");
    //     }
    // });
  });

  app.post("/videoname", function (req, res) {
    let cart = req.body;
    //////////
    let data = {
      video_link: req.body[0],
      video_title: req.body[1],
      category: req.body[2],
      sub_category: req.body[3],
    };
    let sql = "INSERT INTO tbl_video SET ?";
    let query = connection.query(sql, data, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
      response.end();
    });
  });

  // get Order id to store product ...................

  app.post("/getUserOrderID", function (req, res) {
    connection.query(
      "SELECT order_id FROM tbl_user_order WHERE order_id=(SELECT max(order_id) FROM tbl_user_order) AND customer_id = '" +
        req.body.customerID +
        "' ",
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      }
    );
  });

  //insert Order Product...............................

  app.post("/textinserttheloser", function (req, res) {
    let cart = req.body;
    ////////////

    let data = {
      pragraph_text: cart.editorState,
    };
    let sql = "INSERT INTO tbl_paragraph SET ?";
    let query = connection.query(sql, data, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });

  /////////////////////////////Customer Order End /////////////////////////////////////////

  //////////////////////////////Show All Products ///////////////////////////////////////

  app.post("/OrdersDATA", function (req, res) {
    connection.query("Select * from tbl_product", function (err, data) {
      err ? res.send(err) : res.json(data);
    });
  });

  app.post("/haris", function (req, res) {
    connection.query("SELECT * FROM tbl_video", function (err, data) {
      // var datalength=data.length
      err ? res.send(err) : res.json(data);
    });
  });

  app.post("/tbl_header", function (req, res) {
    let cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart)); // req.body = [Object: null prototype] { title: 'product' }
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM tbl_header WHERE main_category ="' + item + '" ',
        function (err, data) {
          // var datalength=data.length
          err ? res.send(err) : res.json(data);
        }
      );
    });
  });

  app.post("/forceUpdateHandlerbloggs", function (req, res) {
    console.log(req.body);
    connection.query(
      "SELECT bloggers.*,tbl_user.* FROM bloggers INNER JOIN tbl_user ON bloggers.user_id=tbl_user.user_id ORDER BY bloggers.views DESC ",
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/forceUpdateHandlerquotes", function (req, res) {
    console.log(req.body);
    connection.query(
      "SELECT quotes.*,tbl_user.* FROM quotes INNER JOIN tbl_user ON quotes.user_id=tbl_user.user_id ORDER BY quotes.views DESC ",
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/forceUpdateHandlerarticles", function (req, res) {
    console.log(req.body);
    connection.query(
      "SELECT tbl_paragraph.*,tbl_user.* FROM tbl_paragraph INNER JOIN tbl_user ON tbl_paragraph.user_id=tbl_user.user_id WHERE tbl_paragraph.sub_category='" +
        req.body.sub_category +
        "' AND tbl_paragraph.block_list != 'blocked' ORDER BY tbl_paragraph.views DESC ",
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/forceUpdateHandlerarticlescategory", function (req, res) {
    connection.query(
      "SELECT tbl_paragraph.*,tbl_user.* FROM tbl_paragraph INNER JOIN tbl_user ON tbl_paragraph.user_id=tbl_user.user_id WHERE tbl_paragraph.category='" +
        req.body.category +
        "' AND tbl_paragraph.block_list != 'blocked' ORDER BY tbl_paragraph.views DESC ",
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/forceUpdateHandlerVideos", function (req, res) {
    connection.query(
      "SELECT * FROM tbl_video WHERE sub_category='" +
        req.body.sub_category +
        "' AND block_list != 'blocked' ORDER BY views DESC ",
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/forceUpdateHandlerVideoscategory", function (req, res) {
    connection.query(
      "SELECT * FROM tbl_video WHERE category='" +
        req.body.category +
        "' AND block_list != 'blocked' ORDER BY views DESC ",
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/ismail", function (req, res) {
    connection.query("SELECT * FROM tbl_video", function (err, data) {
      // var datalength=data.length
      err ? res.send(err) : res.json(data);
    });
  });

  app.post("/hello", function (req, res) {
    connection.query("SELECT * FROM tbl_paragraph", function (err, data) {
      // var datalength=data.length
      err ? res.send(err) : res.json(data);
    });
  });

  app.post("/Articlefulscreen", function (req, res) {
    let cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart)); // req.body = [Object: null prototype] { title: 'product' }
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM tbl_paragraph WHERE paragraph_id = "' + item + '"  ',
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            let viewadd = parseInt(data[0].views + 1);
            console.log(viewadd);

            let sql =
              "UPDATE tbl_paragraph SET views='" +
              viewadd +
              "' WHERE paragraph_id='" +
              item +
              "'";
            let query = connection.query(sql, data, (err, results) => {
              if (err) {
                res.json(err);
                console.log(err);
              } else {
                connection.query(
                  'SELECT tbl_user.user_id,tbl_user.username,tbl_user.user_img, tbl_paragraph.sub_category,tbl_paragraph.title,tbl_paragraph.category,tbl_paragraph.pragraph_text,tbl_paragraph.paragraph_id,tbl_paragraph.views, tbl_paragraph.imagename FROM tbl_paragraph INNER JOIN tbl_user ON tbl_paragraph.user_id=tbl_user.user_id WHERE paragraph_id = "' +
                    item +
                    '"  ',
                  function (err, data) {
                    // var datalength=data.length
                    err ? res.send(err) : res.json(data);
                  }
                );
              }
            });
          }
        }
      );
    });
  });

  app.post("/bloggsfulscreen", function (req, res) {
    let cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart)); // req.body = [Object: null prototype] { title: 'product' }
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM bloggers WHERE bloggers_id = "' + item + '"  ',
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            let viewadd1 = parseInt(data[0].views);
            let viewadd = viewadd1 + 1;
            let sql =
              "UPDATE bloggers SET views='" +
              viewadd +
              "' WHERE bloggers_id='" +
              item +
              "'";
            let query = connection.query(sql, data, (err, results) => {
              if (err) {
                res.json(err);
                console.log(err);
              } else {
                connection.query(
                  'SELECT bloggers.*, tbl_user.user_id,tbl_user.username,tbl_user.user_img FROM bloggers INNER JOIN tbl_user ON bloggers.user_id=tbl_user.user_id WHERE bloggers_id = "' +
                    item +
                    '"  ',
                  function (err, data) {
                    // var datalength=data.length
                    err ? res.send(err) : res.json(data);
                  }
                );
              }
            });
          }
        }
      );
    });
  });

  app.post("/quotesfulscreen", function (req, res) {
    let cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart)); // req.body = [Object: null prototype] { title: 'product' }
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM quotes WHERE quotes_id = "' + item + '"',
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            let viewadd1 = parseInt(data[0].views);
            let viewadd = viewadd1 + 1;
            let sql =
              "UPDATE quotes SET views='" +
              viewadd +
              "' WHERE quotes_id='" +
              item +
              "'";
            let query = connection.query(sql, data, (err, results) => {
              if (err) {
                res.json(err);
                console.log(err);
              } else {
                connection.query(
                  'SELECT quotes.*, tbl_user.user_id,tbl_user.username,tbl_user.user_img FROM quotes INNER JOIN tbl_user ON quotes.user_id=tbl_user.user_id WHERE quotes_id = "' +
                    item +
                    '"  ',
                  function (err, data) {
                    // var datalength=data.length
                    err ? res.send(err) : res.json(data);
                  }
                );
              }
            });
          }
        }
      );
    });
  });

  app.post("/fullvideo", function (req, res) {
    let cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart)); // req.body = [Object: null prototype] { title: 'product' }
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM tbl_video WHERE video_id = "' + item + '"  ',
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            let viewadd = parseInt(data[0].views + 1);
            console.log(viewadd);

            let sql =
              "UPDATE tbl_video SET views='" +
              viewadd +
              "' WHERE video_id='" +
              item +
              "'";
            let query = connection.query(sql, data, (err, results) => {
              if (err) {
                res.json(err);
                console.log(err);
              } else {
                connection.query(
                  'SELECT tbl_user.user_id,tbl_user.username,tbl_user.user_img, tbl_video.video_link,tbl_video.date,tbl_video.sub_category,tbl_video.category,tbl_video.video_id,tbl_video.views, tbl_video.video_title FROM tbl_video INNER JOIN tbl_user ON tbl_video.user_id=tbl_user.user_id WHERE video_id = "' +
                    item +
                    '"  ',
                  function (err, data) {
                    // var datalength=data.length
                    err ? res.send(err) : res.json(data);
                  }
                );
              }
            });
          }
        }
      );
    });
  });

  // });

  app.post("/videoalllikes", function (req, res) {
    let cart = req.body;
    connection.query(
      'SELECT * FROM tbl_video_likes WHERE video_id = "' +
        req.body.video_id +
        '"  ',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/articlealllikes", function (req, res) {
    let cart = req.body;
    connection.query(
      'SELECT * FROM tbl_article_likes WHERE video_id = "' +
        req.body.video_id +
        '"  ',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/Bloggsalllikes", function (req, res) {
    let cart = req.body;
    connection.query(
      'SELECT * FROM tbl_blogges_likes WHERE blogges_video_id = "' +
        req.body.video_id +
        '"  ',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/quotesalllikes", function (req, res) {
    let cart = req.body;
    connection.query(
      'SELECT * FROM tbl_quotes_likes WHERE quotes_id = "' +
        req.body.video_id +
        '"  ',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/videoUSERlikes", function (req, res) {
    let cart = req.body;
    connection.query(
      'SELECT * FROM tbl_video_likes WHERE video_id = "' +
        req.body.video_id +
        '" AND user_id= "' +
        req.body.user_id +
        '" ',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/articleUSERlikes", function (req, res) {
    let cart = req.body;
    connection.query(
      'SELECT * FROM tbl_article_likes WHERE video_id = "' +
        req.body.video_id +
        '" AND user_id= "' +
        req.body.user_id +
        '" ',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/tbl_blogges_likes", function (req, res) {
    let cart = req.body;
    connection.query(
      'SELECT * FROM tbl_blogges_likes WHERE blogges_video_id = "' +
        req.body.video_id +
        '" AND blogges_user_id= "' +
        req.body.user_id +
        '" ',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/quoteslikes", function (req, res) {
    let cart = req.body;
    connection.query(
      'SELECT * FROM tbl_quotes_likes WHERE quotes_id = "' +
        req.body.video_id +
        '" AND quotes_user_id= "' +
        req.body.user_id +
        '" ',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/videoUnlike", function (req, res) {
    let cart = req.body;
    connection.query(
      'DELETE FROM tbl_video_likes WHERE video_id = "' +
        req.body.video_id +
        '" AND user_id= "' +
        req.body.user_id +
        '" ',
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          res.send("1");
        }
      }
    );
  });

  app.post("/articleUnlike", function (req, res) {
    let cart = req.body;
    connection.query(
      'DELETE FROM tbl_article_likes WHERE video_id = "' +
        req.body.video_id +
        '" AND user_id= "' +
        req.body.user_id +
        '" ',
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          res.send("1");
        }
      }
    );
  });

  app.post("/bloggsUnlike", function (req, res) {
    let cart = req.body;
    connection.query(
      'DELETE FROM tbl_blogges_likes WHERE blogges_video_id = "' +
        req.body.video_id +
        '" AND blogges_user_id= "' +
        req.body.user_id +
        '" ',
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          res.send("1");
        }
      }
    );
  });

  app.post("/quotesUnlike", function (req, res) {
    let cart = req.body;
    connection.query(
      'DELETE FROM tbl_quotes_likes WHERE quotes_id = "' +
        req.body.video_id +
        '" AND quotes_user_id= "' +
        req.body.user_id +
        '" ',
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          res.send("1");
        }
      }
    );
  });

  app.post("/intrestlistfollowing", function (req, res) {
    console.log(req.body.obj.id);
    connection.query(
      'SELECT * FROM follwing WHERE user_id="' + req.body.obj.id + '"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          console.log(data);
          var nietos = [];
          if (data.length !== 0) {
            let combinedArray1 = [];
            hello = () => {
              return new Promise((resolve, reject) => {
                for (let i = 0; i < data.length; i++) {
                  connection.query(
                    'SELECT user_id,conatct_email,user_img,username FROM tbl_user WHERE user_id="' +
                      data[i].follow_id +
                      '" AND block_list != "blocked" ORDER BY user_id DESC',
                    function (err, data1) {
                      nietos = nietos.concat(data1);
                      if (i === data.length - 1) {
                        resolve(nietos);
                        console.log(data1);
                      }
                    }
                  );
                }
              });
            };
            hello().then((combinedArray) => res.json(combinedArray));
          } else {
            res.send("Nothing in this Category");
          }
        }
      }
    );
  });

  app.post("/listfollowwers", function (req, res) {
    console.log(req.body.obj.id);
    connection.query(
      'SELECT * FROM follwing WHERE follow_id="' + req.body.obj.id + '"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          console.log(data);
          var nietos = [];
          if (data.length !== 0) {
            let combinedArray1 = [];
            hello = () => {
              return new Promise((resolve, reject) => {
                for (let i = 0; i < data.length; i++) {
                  connection.query(
                    'SELECT user_id,conatct_email,user_img,username FROM tbl_user WHERE user_id="' +
                      data[i].user_id +
                      '" AND block_list != "blocked" ORDER BY user_id DESC',
                    function (err, data1) {
                      nietos = nietos.concat(data1);
                      if (i === data.length - 1) {
                        resolve(nietos);
                        console.log(data1);
                      }
                    }
                  );
                }
              });
            };
            hello().then((combinedArray) => res.json(combinedArray));
          } else {
            res.send("Nothing in this Category");
          }
        }
      }
    );
  });

  app.post("/intrestsMatching", function (req, res) {
    console.log(req.body);
    connection.query(
      "SELECT follwing.*, tbl_user.* FROM follwing INNER JOIN tbl_user ON follwing.follow_id = tbl_user.user_id WHERE follwing.user_id = '" +
        req.body.id +
        "'",
      function (err, data) {
        console.log(data);
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/rana", function (req, res) {
    connection.query("SELECT * FROM tbl_video", function (err, data) {
      // var datalength=data.length
      err ? res.send(err) : res.json(data);
    });
  });

  app.post("/akeel", function (req, res) {
    connection.query("SELECT * FROM tbl_user", function (err, data) {
      // var datalength=data.length
      err ? res.send(err) : res.json(data);
    });
  });

  app.post("/talha", function (req, res) {
    connection.query("SELECT * FROM tbl_product", function (err, data) {
      // var datalength=data.length
      err ? res.send(err) : res.json(data);
    });
  });
  app.post("/jaja", function (req, res) {
    connection.query("SELECT * FROM tbl_user", function (err, data) {
      // var datalength=data.length
      err ? res.send(err) : res.json(data);
    });
  });

  app.post("/profiledata", function (req, res) {
    var cart = req.body;
    connection.query(
      "SELECT * FROM follwing WHERE user_id = '" +
        req.body.my_id +
        "' AND follow_id= '" +
        req.body.follow_id +
        "' ",
      function (err, data) {
        if (data.length !== 0) {
          connection.query(
            "SELECT follwing.*, tbl_user.* FROM follwing INNER JOIN tbl_user ON follwing.follow_id = tbl_user.user_id WHERE tbl_user.user_id = '" +
              req.body.follow_id +
              "'",
            function (err, data) {
              err ? res.send(err) : res.json(data);
            }
          );
        } else {
          connection.query(
            "SELECT * FROM tbl_user WHERE user_id = '" +
              req.body.follow_id +
              "' ",
            function (err, data) {
              err ? res.send(err) : res.json(data);
            }
          );
        }
      }
    );
  });

  app.post("/follow", function (req, res) {
    var cart = req.body;
    connection.query(
      "SELECT * FROM follwing WHERE follow_id='" +
        req.body.follow_id +
        "' AND user_id='" +
        req.body.my_id +
        "' ",
      function (err, data) {
        if (req.body.follow_id === req.body.my_id) {
          res.send("this is your Profile");
        } else {
          if (data.length === 1) {
            let data = {
              floowing_check: "Follow",
            };
            let sql =
              "DELETE FROM follwing WHERE follow_id = '" +
              req.body.follow_id +
              "' AND user_id = '" +
              req.body.my_id +
              "' ";
            let query = connection.query(sql, data, (err, results) => {
              if (err) {
                res.status(500);
              } else {
                res.send("UnFollow");
              }
            });
          } else {
            let data = {
              follow_id: req.body.follow_id,
              user_id: req.body.my_id,
              floowing_check: "Following",
            };
            let sql = "INSERT INTO follwing SET ?";
            let query = connection.query(sql, data, (err, results) => {
              if (err) {
                res.send(err);
              } else {
                res.send("Following");
              }
            });
          }
        }
      }
    );
  });

  app.post("/updateprofiledatafetch", function (req, res) {
    let cart = req.body;
    const obj = JSON.parse(JSON.stringify(cart)); // req.body = [Object: null prototype] { title: 'product' }
    Object.keys(obj).map((item) => {
      connection.query(
        'SELECT * FROM tbl_user WHERE user_id ="' + item + '" ',
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            res.json(data);
          }
        }
      );
    });
  });
  ////////////////////////////Show Products end //////////////////////////////////////////

  //////////////////////////Customer Registration ////////////////////////////////////

  // app.post('/ADDUSERS', upload.single('avatar'), function (req, res, next) {
  //     let data = { user_img: req.body.img, user_first_name: req.body.user_first_name, user_last_name: req.body.user_last_name, user_email: req.body.user_email, user_password: req.body.user_password, user_gender: req.body.user_gender, user_type: "customer" };
  //     console.log(data.user_first_name);
  //     console.log(data.user_last_name);
  //     console.log(data.user_email);
  //     console.log(data.user_password);
  //     console.log(data.user_gender);
  //     let sql = "INSERT INTO tbl_user SET ?";
  //     let query = connection.query(sql, data, (err, results) => {
  //         if (err) {
  //             res.json("error");
  //         }
  //         else {
  //             res.json('1')
  //         }
  //     });
  // });

  ///////////////////////////////////Customer Registration End //////////////////////////

  /////////////////////////////////////////////////////////////
  /////////////For Uploading Pic By Zaka///////////////
  /////////////////////////////////////////////////////////////

  /////////////////////////Other Setting /////////////////////
  // let file_name = Date.now();
  // let file_name = rendomNumVar;

  // // let image_name = file_name;
  // let image_name ="";
  // var storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //     cb(null, 'uploads')
  // },
  // filename: function (req, file, cb) {
  //     // image_name = file_name + '-' + file.originalname;
  //     image_name = file.originalname;
  //     cb(null, image_name);
  // }
  // });
  ///////////////////////////image Upload...............
  // app.post('/uploadCustomerImage', multer({ storage: storage }).single('fileData'), (req, res, next) => {
  // console.log('Function Running...')
  // logger.info(req.file);//this will be automatically set by multer
  // logger.info(req.body);
  // // below code will read the data from the upload folder. Multer     will automatically upload the file in that folder with an  autogenerated name
  // fs.readFile(req.file.path, (err, contents) => {
  //     if (err) {
  //         console.log('Error: ', err);

  //     } else {
  //         console.log('File contents ', contents);

  //     }
  // });

  // });
  /////////////////// End /////////////////////

  /////////////////////,,,,,,,,,,,,,,,,,,,,,,////////////////////
  /////////////////////Customer Apis End Here////////////////////
  /////////////////////''''''''''''''''''''''/////////////////////

  //===============================================================

  /////////////////////,,,,,,,,,,,,,,,,,,,,,,////////////////////
  /////////////////////Admin Apis Start Here////////////////////
  /////////////////////''''''''''''''''''''''/////////////////////

  /////////////////////////Count Driver//////////////////////

  app.post("/countDriver", function (req, res) {
    connection.query(
      'SELECT COUNT(user_id) AS driver FROM tbl_user WHERE user_type ="driver"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      }
    );
  });

  /////////////////////////Count Driver End///////////////////////////

  ////////////////////////Count Product Start///////////////////////

  app.post("/countProduct", function (req, res) {
    connection.query(
      "SELECT COUNT(product_id) AS product FROM tbl_product",
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      }
    );
  });

  ///////////////////////Count Product End///////////////////////////////////

  ///////////////////////////Count New Order Start///////////////////////////

  app.post("/countNewOrder", function (req, res) {
    connection.query(
      'SELECT COUNT(order_id) AS der FROM tbl_user_order WHERE status ="pending"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      }
    );
  });

  /////////////////////////////////Count New Oreder End/////////////////////////////////

  ////////////////////////Count Complete Order Start//////////////////////////////////

  app.post("/countCompleteOrder", function (req, res) {
    connection.query(
      'SELECT COUNT(order_id) AS der FROM tbl_user_order WHERE status ="completed"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      }
    );
  });

  /////////////////////////Count Complete order End/////////////////////////////

  //////////////////////////Get Data of Completed Order Start////////////////

  app.post("/getCompletedOrder", function (req, res) {
    connection.query(
      'SELECT tbl_user_order., tbl_user. FROM tbl_user_order INNER JOIN tbl_user ON tbl_user_order.customer_id = tbl_user.user_id WHERE status ="completed"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      }
    );
  });

  /////////////////////////Get Data of Completed Order End///////////////////////////

  ////////////////////////Get Driver Data Start//////////////////////////////

  app.post("/getDriver", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_user WHERE user_type ="driver"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      }
    );
  });

  ///////////////////////Get Driver Data End/////////////////////////////

  ///////////////////////Delete Driver Start/////////////////////////////

  app.post("/deleteDriver", function (req, res) {
    connection.query(
      'DELETE FROM tbl_user WHERE user_id = "' +
        req.body.driverID +
        '" AND user_type = "driver" ',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json("1");
        }
      }
    );
  });

  /////////////////////////Delete Driver End////////////////////////////////////

  ///////////////////////////Edit Driver Start//////////////////////////////////////

  app.post("/editDriver", function (req, res) {
    connection.query(
      'UPDATE tbl_user SET user_first_name = "' +
        req.body.firstName +
        '", user_last_name = "' +
        req.body.lastName +
        '", user_email = "' +
        req.body.email +
        '", user_password = "' +
        req.body.password +
        '", user_gender = "' +
        req.body.gender +
        '" WHERE user_id ="' +
        req.body.driverID +
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

  //////////////////////////////////Edit Driver End////////////////////////////

  app.post("/videolike", function (req, res) {
    connection.query(
      "SELECT * FROM tbl_video_likes WHERE video_id='" +
        req.body.video_id +
        "' AND user_id='" +
        req.body.user_id +
        "' ",
      function (err, row, data) {
        if (err) {
          res.send(err);
        } else {
          if (row.length > 0) {
            res.json("already liked");
          } else {
            let data = {
              video_id: req.body.video_id,
              user_id: req.body.user_id,
            };
            let sql = "INSERT INTO tbl_video_likes SET ?";
            let query = connection.query(
              sql,
              data,
              function (err, row, data, results, fields) {
                if (err) {
                  console.log(err);
                } else {
                  res.send("1");
                }
              }
            );
          }
        }
      }
    );
  });

  app.post("/articlelike", function (req, res) {
    connection.query(
      "SELECT * FROM tbl_article_likes WHERE video_id='" +
        req.body.video_id +
        "' AND user_id='" +
        req.body.user_id +
        "' ",
      function (err, row, data) {
        if (err) {
          res.send(err);
        } else {
          if (row.length > 0) {
            res.json("already liked");
          } else {
            let data = {
              video_id: req.body.video_id,
              user_id: req.body.user_id,
            };
            let sql = "INSERT INTO tbl_article_likes SET ?";
            let query = connection.query(
              sql,
              data,
              function (err, row, data, results, fields) {
                if (err) {
                } else {
                  res.send("1");
                }
              }
            );
          }
        }
      }
    );
  });

  app.post("/blogslike", function (req, res) {
    connection.query(
      "SELECT * FROM tbl_blogges_likes WHERE blogges_video_id='" +
        req.body.video_id +
        "' AND blogges_user_id='" +
        req.body.user_id +
        "' ",
      function (err, row, data) {
        if (err) {
          res.send(err);
        } else {
          if (row.length > 0) {
            res.json("already liked");
          } else {
            let data = {
              blogges_video_id: req.body.video_id,
              blogges_user_id: req.body.user_id,
            };
            let sql = "INSERT INTO tbl_blogges_likes SET ?";
            let query = connection.query(
              sql,
              data,
              function (err, row, data, results, fields) {
                if (err) {
                } else {
                  res.send("1");
                }
              }
            );
          }
        }
      }
    );
  });

  app.post("/quoteslike", function (req, res) {
    console.log(req.body);
    connection.query(
      "SELECT * FROM tbl_quotes_likes WHERE quotes_id='" +
        req.body.video_id +
        "' AND quotes_user_id='" +
        req.body.user_id +
        "' ",
      function (err, row, data) {
        if (err) {
          res.send(err);
        } else {
          if (row.length > 0) {
            res.json("already liked");
          } else {
            let data = {
              quotes_id: req.body.video_id,
              quotes_user_id: req.body.user_id,
            };
            let sql = "INSERT INTO tbl_quotes_likes SET ?";
            let query = connection.query(
              sql,
              data,
              function (err, row, data, results, fields) {
                if (err) {
                } else {
                  res.send("1");
                }
              }
            );
          }
        }
      }
    );
  });

  ////////////////////////////Insert Druiver ///////////////////////////////
  app.post("/insertIntoUser", function (req, res) {
    connection.query(
      "SELECT * FROM tbl_user WHERE user_email='" + req.body.Email + "' ",
      function (err, row, data) {
        if (err) {
          res.send(err);
        } else {
          if (row.length > 0) {
            res.json("Email already available");
          } else {
            let data = {
              user_email: req.body.Email,
              user_password: req.body.password,
            };
            let sql = "INSERT INTO tbl_user SET ?";
            let query = connection.query(
              sql,
              data,
              function (err, row, data, results, fields) {
                if (err) {
                  res.json("0");
                } else {
                  res.json(row.insertId);
                }
              }
            );
          }
        }
      }
    );
  });

  app.post("/insertIntoUserEmail", function (req, res) {
    connection.query(
      "SELECT * FROM tbl_user WHERE user_email='" + req.body.email + "' ",
      function (err, row, data) {
        if (err) {
          res.send(err);
        } else {
          if (row.length > 0) {
            res.json("Email already available please login");
          } else {
            let data = {
              user_email: req.body.email,
              username: req.body.username,
            };
            let sql = "INSERT INTO tbl_user SET ?";
            let query = connection.query(
              sql,
              data,
              function (err, row, data, results, fields) {
                if (err) {
                  res.json("0");
                } else {
                  res.json(row.insertId);
                }
              }
            );
          }
        }
      }
    );
  });

  app.post("/auth", function (request, response) {
    var username = request.body.Emailaddressorphonenumber;
    var password = request.body.password;
    if (username && password) {
      connection.query(
        "SELECT * FROM tbl_user WHERE user_email = ? AND user_password = ?",
        [username, password],
        function (error, results, data, fields) {
          if (results.length > 0) {
            if (results[0].block_list === "blocked") {
              response.json("User blocked Please contact Us");
            } else {
              response.json(results);
            }
          } else {
            response.json("Incorrect Username and/or Password!");
          }
          response.end();
        }
      );
    } else {
      response.json("Please enter Username and Password!");
      response.end();
    }
  });

  app.post("/authemail", function (request, response) {
    var email = request.body.email;
    if (email) {
      connection.query(
        "SELECT * FROM tbl_user WHERE user_email = ?",
        [email],
        function (error, results, data, fields) {
          if (results.length > 0) {
            if (results[0].block_list === "blocked") {
              response.json("User blocked Please contact Us");
            } else {
              response.json(results);
            }
          } else {
            response.json("Please signup first");
          }
          response.end();
        }
      );
    } else {
      response.json("Please enter Username and Password!");
      response.end();
    }
  });

  ////////////////////////////////Insert Driver End //////////////////////////////

  /////////////////////////////Get Pending/New Order Start/////////////////////////

  app.post("/getPendingOrder", function (req, res) {
    connection.query(
      'SELECT tbl_user_order., tbl_user. FROM tbl_user_order INNER JOIN tbl_user ON tbl_user_order.customer_id = tbl_user.user_id WHERE status ="pending"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      }
    );
  });

  /////////////////////////Get Pending/New Order End//////////////////////////////////////////

  app.post("/getProduct", function (req, res) {
    connection.query("SELECT * FROM tbl_product", function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  ///////////////////////Get Product End////////////////////////////////////////

  //////////////////////Delete Product Start///////////////////////////////

  app.post("/deleteProduct", function (req, res) {
    connection.query(
      'DELETE FROM tbl_product WHERE product_id = "' +
        req.body.productID +
        '" ',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json("1");
        }
      }
    );
  });

  ////////////////////////////Delete Product End//////////////////////////

  /////////////////////,,,,,,,,,,,,,,,,,,,,,,////////////////////
  /////////////////////Admin Apis End Here////////////////////
  /////////////////////''''''''''''''''''''''/////////////////////

  //===================================================================

  /////////////////////,,,,,,,,,,,,,,,,,,,,,,////////////////////
  /////////////////////Driver Apis Start Here////////////////////
  /////////////////////''''''''''''''''''''''/////////////////////

  ////////////////////////Get Complete Order Start////////////////////////////

  // .............Same As Admin Api..........................

  //////////////////////////////Get Complete order End//////////////////////////////

  ////////////////////////////Get Pending Order Start///////////////////////////////

  // .............Same As Admin Api..........................

  ////////////////////////////////////Get Pending Order End////////////////////////////

  ////////////////////////////////////Go to Running Start //////////////////////////

  app.post("/gotoRunning", function (req, res) {
    connection.query(
      'UPDATE tbl_user_order SET status ="running"  WHERE order_id ="' +
        req.body.orderID +
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

  /////////////////////////////////Goto Running End /////////////////////////////////////

  /////////////////////////Get Running Order Start /////////////////////////////////////

  app.post("/getRunningOrder", function (req, res) {
    connection.query(
      'SELECT tbl_user_order., tbl_user. FROM tbl_user_order INNER JOIN tbl_user ON tbl_user_order.customer_id = tbl_user.user_id WHERE status ="running"',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      }
    );
  });

  ///////////////////////////////////Get Running Order End/////////////////////////////////////

  ////////////////////////Goto Completed Start///////////////////////////////////////////

  app.post("/gotoCompleted", function (req, res) {
    connection.query(
      'UPDATE tbl_user_order SET status ="completed"  WHERE order_id ="' +
        req.body.orderID +
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

  //////////////////////////Goto Completed End /////////////////////////

  ///////////////////////Notification New App////////////////////////////
  // insert Answer..............

  // app.post('/insertIntoNotificationTBL', function (req, res) {
  //     let cart = req.body;
  //     cart.today = cart.today.split(' ').slice(0,-2).join(" ");
  //     let data = { newissuesymbol: cart.newissuesymbol, newtime: cart.newtime, previoustime: cart.previoustime, previoussymbol: cart.previoussymbol, isNotificationSend: cart.isNotificationSend, today: cart.today };
  //     let sql = `SELECT * from tbl_notificatio WHERE today=${cart.today}`;

  //       let query = connection.query(sql, data, (err, results) => {
  //         if(!results){
  //               let sql = "DELETE FROM tbl_notificatio";
  //                 let query = connection.query(sql, data, (err1, results1) => {

  //                     if(!err1){
  //                      let sql = "INSERT INTO tbl_notificatio SET ?";
  //                      let query = connection.query(sql, data, (err2, results2) => {
  //                      (err2) ? res.json({'err':err2}) : res.json({'results':results2});
  //     });
  //                     }

  //     });
  //         }
  //         else{
  //           let sql = "INSERT INTO tbl_notificatio SET ?";
  //     let query = connection.query(sql, data, (err, results) => {
  //           (err) ? res.json({'err':err}) : res.json({'results':results});
  //     });

  //         }

  //     });

  // });

  // For Home Page Display From Admin

  // Main Article
  app.post("/admin_main_articleHome", function (req, res) {
    connection.query(
      "SELECT tbl_main_admin.*, tbl_paragraph.* FROM tbl_main_admin INNER JOIN tbl_paragraph ON tbl_main_admin.main_article = tbl_paragraph.paragraph_id",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  // Main Video

  app.post("/admin_main_videoHome", function (req, res) {
    connection.query(
      "SELECT tbl_main_admin.*, tbl_video.* FROM tbl_main_admin INNER JOIN tbl_video ON tbl_main_admin.main_video = tbl_video.video_id",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  // Category Videos

  app.post("/admin_Category_video1", function (req, res) {
    connection.query(
      "SELECT tbl_category_admin.*, tbl_video.* FROM tbl_category_admin INNER JOIN tbl_video ON tbl_category_admin.category_video_1 = tbl_video.video_id",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });
  app.post("/admin_Category_video2", function (req, res) {
    connection.query(
      "SELECT tbl_category_admin.*, tbl_video.* FROM tbl_category_admin INNER JOIN tbl_video ON tbl_category_admin.category_video_2 = tbl_video.video_id",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });
  app.post("/admin_Category_video3", function (req, res) {
    connection.query(
      "SELECT tbl_category_admin.*, tbl_video.* FROM tbl_category_admin INNER JOIN tbl_video ON tbl_category_admin.category_video_3 = tbl_video.video_id",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });
  app.post("/admin_Category_video4", function (req, res) {
    connection.query(
      "SELECT tbl_category_admin.*, tbl_video.* FROM tbl_category_admin INNER JOIN tbl_video ON tbl_category_admin.category_video_4 = tbl_video.video_id",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  // Home Articles

  app.post("/admin_Article_p1", function (req, res) {
    connection.query(
      "SELECT tbl_article_admin.*, tbl_paragraph.*,tbl_user.user_id,tbl_user.username, tbl_user.user_img FROM tbl_article_admin INNER JOIN tbl_paragraph ON tbl_article_admin.article_1 = tbl_paragraph.paragraph_id INNER JOIN tbl_user ON tbl_user.user_id = tbl_paragraph.user_id",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });
  app.post("/admin_Article_p2", function (req, res) {
    connection.query(
      "SELECT tbl_article_admin.*, tbl_paragraph.*,tbl_user.user_id,tbl_user.username, tbl_user.user_img FROM tbl_article_admin INNER JOIN tbl_paragraph ON tbl_article_admin.article_2 = tbl_paragraph.paragraph_id JOIN tbl_user ON tbl_user.user_id = tbl_paragraph.user_id",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/admin_Article_p3", function (req, res) {
    connection.query(
      "SELECT tbl_article_admin.*, tbl_paragraph.*,tbl_user.user_id,tbl_user.username, tbl_user.user_img FROM tbl_article_admin INNER JOIN tbl_paragraph ON tbl_article_admin.article_3 = tbl_paragraph.paragraph_id JOIN tbl_user ON tbl_user.user_id = tbl_paragraph.user_id",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });
  app.post("/admin_Article_p4", function (req, res) {
    connection.query(
      "SELECT tbl_article_admin.*, tbl_paragraph.*,tbl_user.user_id,tbl_user.username FROM tbl_article_admin INNER JOIN tbl_paragraph ON tbl_article_admin.article_4 = tbl_paragraph.paragraph_id JOIN tbl_user ON tbl_user.user_id = tbl_paragraph.user_id",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  //////////////////////////////

  app.post("/insertIntoNotificationTBL", function (req, res) {
    let cart = req.body;
    cart.today = cart.today.split(" ").slice(0, -2).join(" ");

    let data = {
      newissuesymbol: cart.newissuesymbol,
      newtime: cart.newtime,
      previoustime: cart.previoustime,
      previoussymbol: cart.previoussymbol,
      today: cart.today,
    };

    let sql = "SELECT * from tbl_notification";
    let query1 = connection.query(sql, data, (err, results) => {
      counter = true;
      var isdatesame = true;

      if (results.length) {
        for (result of results) {
          if (data.today != result.today) {
            isdatesame = false;
            break;
          }
          if (
            data.newissuesymbol == result.newissuesymbol &&
            data.newtime == result.newtime &&
            data.previoustime == result.previoustime &&
            data.previoussymbol == result.previoussymbol &&
            data.today == result.today
          ) {
            counter = false;
            break;
          }
        }
        if (isdatesame === false) {
          let sql = "DELETE FROM tbl_notification";
          let query2 = connection.query(sql, (err2, results2) => {
            if (!err2) {
              let sql = "INSERT INTO tbl_notification SET ?";
              let query3 = connection.query(sql, data, (err3, results3) => {
                err3 ? res.json({ err3: err3 }) : res.json({ results2: data });
              });
            } else {
              res.json({ err2: err2 });
            }
          });
        } else if (counter === true) {
          let sql = "INSERT INTO tbl_notification SET ?";
          let query4 = connection.query(sql, data, (err4, results4) => {
            err4 ? res.json({ err4: err4 }) : res.json({ results1: data });
          });
        } else {
          res.json({ res1: "data already present" });
        }
      } else {
        let sql = "DELETE FROM tbl_notification";
        let query2 = connection.query(sql, (err2, results2) => {
          if (!err2) {
            let sql = "INSERT INTO tbl_notification SET ?";
            let query3 = connection.query(sql, data, (err3, results3) => {
              err3 ? res.json({ err3: err3 }) : res.json({ results2: data });
            });
          } else {
            res.json({ err2: err2 });
          }
        });
      }
    });
  });

  app.post("/deletearticle", function (req, res) {
    connection.query(
      'DELETE FROM tbl_paragraph WHERE paragraph_id="' +
        req.body.paragraph_id +
        '" ',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send("1");
        }
      }
    );
  });

  app.post("/deleteprofileimg", function (req, res) {
    const fs = require("fs");
    fs.exists(
      "./uploads/" + req.body.tbl_portfolioImgs_img_name,
      function (exists) {
        if (exists) {
          //Show in green
          console.log("File exists. Deleting now ...");
          fs.unlinkSync("./uploads/" + req.body.tbl_portfolioImgs_img_name);
        } else {
          //Show in red
          console.log("File not found, so not deleting.");
        }
      }
    );
    connection.query(
      'DELETE FROM tbl_portfolioimgs WHERE tbl_portfolioImgs_id ="' +
        req.body.tbl_portfolioImgs_id +
        '" ',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send("1");
        }
      }
    );
  });

  app.post("/deletevideo", function (req, res) {
    console.log(req.body);
    const fs = require("fs");
    fs.exists("./uploads/" + req.body.video_link, function (exists) {
      if (exists) {
        //Show in green
        console.log("File exists. Deleting now ...");
        fs.unlinkSync("./uploads/" + req.body.video_link);
      } else {
        //Show in red
        console.log("File not found, so not deleting.");
      }
    });

    connection.query(
      'DELETE FROM tbl_video WHERE video_id="' + req.body.video_id + '" ',
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send("1");
        }
      }
    );
  });

  app.post("/actingandmodelingimages", function (req, res) {
    connection.query(
      //
      "SELECT tbl_portfolioimgs.*, tbl_user.* FROM tbl_portfolioimgs INNER JOIN tbl_user ON tbl_portfolioimgs.user_id = tbl_user.user_id ORDER BY tbl_portfolioImgs_id DESC",
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  // //////////////////////////////////ADMIN PANNEL APIS

  ///////////////////////////////////////
  ////////////////////////////////////////

  // Show active users,articles,videos
  app.post("/admin_total_counts", function (req, res) {
    // var sql =
    //   "SELECT * FROM tbl_user WHERE block_list = 'active';SELECT * FROM tbl_user WHERE block_list = 'blocked';SELECT * FROM tbl_paragraph ;SELECT * FROM tbl_video ;"
    // connection.query(sql, [1,2,3,4 ], function (error, data, fields) {
    //   if (error) {
    //     throw error
    //   }
    //   res.json(data)
    //   console.log(data)
    // })
    // connection.end()
  });

  //////////////////////////////////////////////////
  ///////////////////////////////////////
  ////////////////////////////////////////
  //////////////////////////////////////////////////
  ///////////////////////////////////////
  ////////////////////////////////////////
  /////////////////////////////////////////
  ////////////////////////////////////////////////

  app.post("/fetchdatafollow_id", function (req, res) {
    console.log(req.body);
    connection.query(
      'SELECT COUNT(*) AS namesCount1 FROM follwing WHERE follow_id="' +
        req.body.follow_id +
        '"',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  app.post("/fetchdatauserid", function (req, res) {
    connection.query(
      'SELECT COUNT(*) AS namesCount2 FROM follwing WHERE user_id="' +
        req.body.follow_id +
        '"',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  //Show active users
  app.post("/adminhello", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_user WHERE block_list = "active"',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });
  //Show blocked users
  app.post("/admin_blocked_users", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_user WHERE block_list = "blocked"',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  // Block user
  app.post("/admin_reportButton_user", function (req, res) {
    connection.query(
      'UPDATE tbl_user SET block_list ="blocked"  WHERE user_id ="' +
        req.body.user_id +
        '"  ',
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });
  //Unblock User
  app.post("/admin_UnblockButton_user", function (req, res) {
    connection.query(
      'UPDATE tbl_user SET block_list ="active"  WHERE user_id ="' +
        req.body.user_id +
        '"  ',
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });
  ///////////////////////////////
  //show active articles
  app.post("/admin_active_article", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_paragraph WHERE block_list = "active"',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });
  //show reported articles
  app.post("/admin_report_article", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_paragraph WHERE block_list = "reported"',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });
  //show blocked articles
  app.post("/admin_blocked_article", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_paragraph WHERE block_list = "blocked"',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  //block article
  app.post("/admin_reportButton_article", function (req, res) {
    connection.query(
      'UPDATE tbl_paragraph SET block_list ="blocked"  WHERE paragraph_id ="' +
        req.body.paragraph_id +
        '"  ',
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });
  //unblock article
  app.post("/admin_unblockButton_article", function (req, res) {
    connection.query(
      'UPDATE tbl_paragraph SET block_list ="active"  WHERE paragraph_id ="' +
        req.body.paragraph_id +
        '"  ',
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });
  ///////////////////////////
  //show active videos
  app.post("/admin_active_video", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_video WHERE block_list = "active"',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  //show reported videos
  app.post("/admin_report_video", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_video WHERE block_list = "reported"',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });
  //show blocked video
  app.post("/admin_blocked_video", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_video WHERE block_list = "blocked"',
      function (err, data) {
        err ? res.send(err) : res.json(data);
      }
    );
  });

  //block video
  app.post("/admin_reportButton_video", function (req, res) {
    connection.query(
      'UPDATE tbl_video SET block_list ="blocked"  WHERE video_id ="' +
        req.body.video_id +
        '"  ',
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });
  //unblock video
  app.post("/admin_unblockButton_video", function (req, res) {
    connection.query(
      'UPDATE tbl_video SET block_list ="active"  WHERE video_id ="' +
        req.body.video_id +
        '"  ',
      function (err, data) {
        // var datalength=data.length
        err ? res.send(err) : res.json(data);
      }
    );
  });

  /////////////////////////////////////////////////
  ///////////////////////////////////////
  ////////////////////////////////////////
  //////////////////////////////////////////////////
  ///////////////////////////////////////
  ////////////////////////////////////////

  /////////////////////Home Page Updating queries//////////////////

  //active home page videos
  app.post("/admin_get_mainVideo", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_video WHERE video_id ="' + req.body.video + '"',
      function (err, data) {
        if (data.length) {
          connection.query(
            'UPDATE tbl_main_admin SET main_video="' + req.body.video + '" ',
            function (err, data) {
              res.send("1");
            }
          );
        } else {
          res.send("0");
        }
      }
    );
  });
  app.post("/admin_get_video1", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_video WHERE video_id ="' + req.body.video + '"',
      function (err, data) {
        if (data.length) {
          connection.query(
            'UPDATE tbl_category_admin SET category_video_1="' +
              req.body.video +
              '" ',
            function (err, data) {
              res.send("1");
            }
          );
        } else {
          res.send("0");
        }
      }
    );
  });
  app.post("/admin_get_video2", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_video WHERE video_id ="' + req.body.video + '"',
      function (err, data) {
        if (data.length) {
          connection.query(
            'UPDATE tbl_category_admin SET category_video_2="' +
              req.body.video +
              '" ',
            function (err, data) {
              res.send("1");
            }
          );
        } else {
          res.send("0");
        }
      }
    );
  });
  app.post("/admin_get_video3", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_video WHERE video_id ="' + req.body.video + '"',
      function (err, data) {
        if (data.length) {
          connection.query(
            'UPDATE tbl_category_admin SET category_video_3="' +
              req.body.video +
              '" ',
            function (err, data) {
              res.send("1");
            }
          );
        } else {
          res.send("0");
        }
      }
    );
  });
  app.post("/admin_get_video4", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_video WHERE video_id ="' + req.body.video + '"',
      function (err, data) {
        if (data.length) {
          connection.query(
            'UPDATE tbl_category_admin SET category_video_4="' +
              req.body.video +
              '" ',
            function (err, data) {
              res.send("1");
            }
          );
        } else {
          res.send("0");
        }
      }
    );
  });
  //active home page articles
  app.post("/admin_get_mainArticle", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_paragraph WHERE 	paragraph_id ="' +
        req.body.article +
        '"',
      function (err, data) {
        if (data.length) {
          connection.query(
            'UPDATE tbl_main_admin SET main_article="' +
              req.body.article +
              '" ',
            function (err, data) {
              res.send("1");
            }
          );
        } else {
          res.send("0");
        }
      }
    );
  });
  app.post("/admin_get_article1", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_paragraph WHERE 	paragraph_id ="' +
        req.body.article +
        '"',
      function (err, data) {
        if (data.length) {
          connection.query(
            'UPDATE tbl_article_admin SET article_1="' +
              req.body.article +
              '" ',
            function (err, data) {
              res.send("1");
            }
          );
        } else {
          res.send("0");
        }
      }
    );
  });
  app.post("/admin_get_article2", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_paragraph WHERE 	paragraph_id ="' +
        req.body.article +
        '"',
      function (err, data) {
        if (data.length) {
          connection.query(
            'UPDATE tbl_article_admin SET article_2="' +
              req.body.article +
              '" ',
            function (err, data) {
              res.send("1");
            }
          );
        } else {
          res.send("0");
        }
      }
    );
  });
  app.post("/admin_get_article3", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_paragraph WHERE 	paragraph_id ="' +
        req.body.article +
        '"',
      function (err, data) {
        if (data.length) {
          connection.query(
            'UPDATE tbl_article_admin SET article_3="' +
              req.body.article +
              '" ',
            function (err, data) {
              res.send("1");
            }
          );
        } else {
          res.send("0");
        }
      }
    );
  });
  app.post("/admin_get_article4", function (req, res) {
    connection.query(
      'SELECT * FROM tbl_paragraph WHERE 	paragraph_id ="' +
        req.body.article +
        '"',
      function (err, data) {
        if (data.length) {
          connection.query(
            'UPDATE tbl_article_admin SET article_4="' +
              req.body.article +
              '" ',
            function (err, data) {
              res.send("1");
            }
          );
        } else {
          res.send("0");
        }
      }
    );
  });

  ///Comments APIS

  ///Fetch Comments
  app.post("/getcomments", (req, res) => {
    connection.query(
      'SELECT * FROM comments WHERE 	post_id ="' + req.body.postId + '"',
      function (err, data) {
        if (data.length) {
          console.log(data);
          res.json(data);
        } else {
          res.send("No Data Found");
        }
      }
    );
  });

  ////POST COMMENTS
  app.post("/postcomments", (req, res) => {
    let data = {
      post_id: req.body.postId,
      user_id: req.body.userId,
      comment_text: req.body.comment_text,
      date: req.body.date,
      user_img: req.body.user_img,
      username: req.body.username,
    };
    let data2 = {
      user_id: req.body.userId,
      username: req.body.username,
      post_id: req.body.postId,
      owner_id: req.body.ownerId,
    };

    let sql2 = "INSERT INTO notifications SET ?";
    let query2 = connection.query(sql2, data2);
    let sql = "INSERT INTO comments SET ?";
    let query = connection.query(sql, data, (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json("1");
      }
    });
  });
  ///DELETE COMMENT
  app.post("/deletecomments", function (req, res) {
    connection.query(
      'DELETE FROM comments WHERE comment_id = "' + req.body.commentId + '" ',
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          res.send("1");
        }
      }
    );
  });

  ///Fetch Notifications
  app.post("/getnotifications", (req, res) => {
    connection.query(
      'SELECT * FROM notifications WHERE 	owner_id ="' + req.body.ownerId + '"',
      function (err, data) {
        if (data.length) {
          console.log(data);
          res.json(data);
        } else {
          res.send("No Data Found");
        }
      }
    );
  });

  ///DELETE Notifications
  app.post("/deletenotifications", function (req, res) {
    connection.query(
      'DELETE FROM notifications WHERE owner_id = "' + req.body.ownerId + '" ',
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          res.json(req.body.ownerId);
        }
      }
    );
  });

  //active home page candidates
  // app.post('/admin_get_candidateList', function (req, res) {
  //   console.log(req.body)
  //   connection.query(
  //     'SELECT * FROM tbl_paragraph WHERE 	paragraph_id ="' +
  //       req.body.article +
  //       '"',
  //     function (err, data) {
  //       if (data.length) {
  //         res.send('1')
  //         console.log('f')
  //       } else {
  //         res.send('0')
  //         console.log('nof')
  //       }
  //     }
  //   )
  // })

  //////////////////////////////////////////////////
  ///////////////////////////////////////
  ////////////////////////////////////////
};
