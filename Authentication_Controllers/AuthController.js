const pool = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const signup = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save user to database
//     const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//     pool.query(query, [username, email, hashedPassword], (error, results, fields) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//       }
//       res.status(201).json({ message: 'User created successfully' });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }





// const signup = async (req, res, next) => {
//     try {
//       const { username, email, password } = req.body;
  
//       // Check if the email already exists in the database
//       const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
//       pool.query(checkEmailQuery, [email], async (error, results, fields) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).json({ error: 'Internal Server Error' });
//         }
  
//         // If email already exists, return an error
//         if (results.length > 0) {
//           return res.status(400).json({ error: 'User with this email already exists' });
//         }
  
//         // Email doesn't exist, so hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
  
//         // Save user to database
//         const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//         pool.query(insertUserQuery, [username, email, hashedPassword], (error, results, fields) => {
//           if (error) {
//             console.error(error);
//             return res.status(500).json({ error: 'Internal Server Error' });
//           }
//           res.status(201).json({ message: 'User created successfully' });
//         });
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };


const uuid = require('uuid');
const signup = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if the email already exists in the database
      const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
      pool.query(checkEmailQuery, [email], async (error, results, fields) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        // If email already exists, return an error
        if (results.length > 0) {
          return res.status(400).json({ error: 'User with this email already exists' });
        }
  
        // Email doesn't exist, so hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Generate UUID
        const userId = uuid.v4();
  
        // Save user to database
        const insertUserQuery = 'INSERT INTO users (User_Id, username, email, password) VALUES (?, ?, ?, ?)';
        pool.query(insertUserQuery, [userId, username, email, hashedPassword], (error, results, fields) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.status(201).json({ message: 'User created successfully' });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getUserFromToken = (token) => {
    // Decode the JWT token to extract the user's ID
    const decodedToken = jwt.verify(token, 'your_secret_key');
  
    // Fetch the user record from the database using the extracted user ID
    const userId = decodedToken.userId;
    return User.findById(userId);
  };
  



// const login = async (req, res, next) => {
//     try {
//       const { email, password } = req.body;
  
//       // Check if user exists
//       const query = 'SELECT * FROM users WHERE email = ?';
//       pool.query(query, [email], async (error, results, fields) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).json({ error: 'Internal Server Error' });
//         }
  
//         if (results.length === 0) {
//           return res.status(401).json({ error: 'Invalid credentials' });
//         }
  
//         // Verify password
//         const user = results[0];
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//           return res.status(401).json({ error: 'Invalid credentials' });
//         }
  
//         // Generate JWT token
//         const token = jwt.sign({ userId: user.id }, 'your_secret_key', {
//           expiresIn: '1h',
//         });


//         const decodedToken = jwt.verify(token, 'your_secret_key');
//         const userId = decodedToken.userId;
        
//         const userQuery = 'SELECT FROM users WHERE id?'

       

        


  
//         res.status(200).json({ userId });
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Acquire a connection from the pool
      pool.getConnection((error, connection) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        // Check if user exists
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], async (error, results, fields) => {
          // Release the connection back to the pool
          connection.release();
  
          if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
  
          // Verify password
          const user = results[0];
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
  
          // Generate JWT token
          const token = jwt.sign({ userId: user.id }, 'your_secret_key', {
            expiresIn: '1h',
          });
  
          // Decode the token to extract the user's ID
          const decodedToken = jwt.verify(token, 'your_secret_key');
          const userId = decodedToken.userId;
  
          // Fetch the user record from the database using the extracted user ID
          const queryUser = 'SELECT * FROM users WHERE id = ?';
          connection.query(queryUser, [userId], (errorUser, resultsUser, fieldsUser) => {
            if (errorUser) {
              console.error(errorUser);
              return res.status(500).json({ error: 'Internal Server Error' });
            }
  
            if (resultsUser.length === 0) {
              return res.status(404).json({ error: 'User not found' });
            }
  
            const userRecord = resultsUser[0];
            res.status(200).json({ userRecord });
          });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


  // const google_signup = async (req, res, next) => {
  //   try {
  //     const { name, email, email_verified ,sub} = req.body;
  
  //     console.log(req.body," GOOGLE REQ")
  
  
  //     // Check if the email already exists in the database
  //     const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  //     pool.query(checkEmailQuery, [email], async (error, results, fields) => {
  //       if (error) {
  //         console.error(error);
  //         return res.status(500).json({ error: 'Internal Server Error' });
  //       }
  
  //       // If email already exists, return an error
  //       if (results.length > 0) {
  //         return res.status(400).json({ error: 'User with this email already exists' });
  //       }
  
  //       // Email doesn't exist, so hash the password
  //       // const hashedPassword = await bcrypt.hash(password, 10);
  
  //       // Save user to database
  //       const insertUserQuery = 'INSERT INTO users (username, email, password, User_Id) VALUES (?, ?, ?,?)';
  //       pool.query(insertUserQuery, [name, email, email_verified,sub], (error, results, fields) => {
  //         if (error) {
  //           console.error(error);
  //           return res.status(500).json({ error: 'Internal Server Error' });
  //         }
  //         res.status(201).json({ message: 'User created successfully' });
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
  


  // const google_signup = async (req, res, next) => {
  //   try {
  //     const { name, email, email_verified, sub } = req.body;
  
  //     console.log(req.body, " GOOGLE REQ");
  
  //     // Check if the email already exists in the database
  //     const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  //     pool.query(checkEmailQuery, [email], async (error, results, fields) => {
  //       if (error) {
  //         console.error(error);
  //         return res.status(500).json({ error: 'Internal Server Error' });
  //       }
  
  //       // If email already exists, return the user records
  //       if (results.length > 0) {
  //         return res.status(200).json({ message: 'User found in the database', user: results[0] });
  //       }
  
  //       // Email doesn't exist, so insert the new user into the database
  //       const insertUserQuery = 'INSERT INTO users (username, email, password, User_Id) VALUES (?, ?, ?, ?)';
  //       pool.query(insertUserQuery, [name, email, email_verified, sub], (error, results, fields) => {
  //         if (error) {
  //           console.error(error);
  //           return res.status(500).json({ error: 'Internal Server Error' });
  //         }
  //         // res.status(200).json({ message: 'User created successfully',user:results[0] });
  //         res.json({
  //           user:results
  //         })
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
  


  const google_signup = async (req, res, next) => {
    try {
      const { name, email, email_verified, sub } = req.body;
  
      console.log(req.body, " GOOGLE REQ");
  
      // Check if the email already exists in the database
      const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
      pool.query(checkEmailQuery, [email], async (error, results, fields) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        // If email already exists, return the user records
        if (results.length > 0) {
          return res.status(200).json({ message: 'User found in the database', user: results[0] });
        }
  
        // Email doesn't exist, so insert the new user into the database
        const insertUserQuery = 'INSERT INTO users (username, email, password, User_Id) VALUES (?, ?, ?, ?)';
        pool.query(insertUserQuery, [name, email, email_verified, sub], (error, insertResults, fields) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          // Retrieve the inserted user record using the email
          const selectInsertedUserQuery = 'SELECT * FROM users WHERE email = ?';
          pool.query(selectInsertedUserQuery, [email], (error, selectResults, fields) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'User created successfully', user: selectResults[0] });
          });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  



  const facebook_signup = async (req, res, next) => {
    try {
      const { name, email,  id,} = req.body;
  
      const email_verified = true
  
      console.log(req.body," Facebook REQ")
  
      // Check if the email already exists in the database
      const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
      pool.query(checkEmailQuery, [email], async (error, results, fields) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        // If email already exists, return the user records
        if (results.length > 0) {
          return res.status(200).json({ message: 'User found in the database', user: results[0] });
        }
  
        // Email doesn't exist, so insert the new user into the database
        const insertUserQuery = 'INSERT INTO users (username, email, password, User_Id) VALUES (?, ?, ?, ?)';
        pool.query(insertUserQuery, [name, email, email_verified, id], (error, insertResults, fields) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          // Retrieve the inserted user record using the email
          const selectInsertedUserQuery = 'SELECT * FROM users WHERE email = ?';
          pool.query(selectInsertedUserQuery, [email], (error, selectResults, fields) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'User created successfully', user: selectResults[0] });
          });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  // const facebook_signup = async (req, res, next) => {
  //   try {
  //     const { name, email,  id,} = req.body;
  
  //     const email_verified = true
  
  //     console.log(req.body," Facebook REQ")
  
  
  //     // Check if the email already exists in the database
  //     const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  //     pool.query(checkEmailQuery, [email], async (error, results, fields) => {
  //       if (error) {
  //         console.error(error);
  //         return res.status(500).json({ error: 'Internal Server Error' });
  //       }
  
  //       // If email already exists, return an error
  //       if (results.length > 0) {
  //         return res.status(400).json({ error: 'User with this email already exists' });
  //       }
  
  //       // Email doesn't exist, so hash the password
  //       // const hashedPassword = await bcrypt.hash(password, 10);
  
  //       // Save user to database
  //       const insertUserQuery = 'INSERT INTO users (username, email, password, User_Id) VALUES (?, ?, ?,?)';
  //       pool.query(insertUserQuery, [name, email, email_verified,id], (error, results, fields) => {
  //         if (error) {
  //           console.error(error);
  //           return res.status(500).json({ error: 'Internal Server Error' });
  //         }
  //         res.status(201).json({ message: 'User created successfully' });
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };




module.exports = {
    signup,login,google_signup,facebook_signup
};
