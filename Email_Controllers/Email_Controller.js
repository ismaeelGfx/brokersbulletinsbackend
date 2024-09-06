const pool = require("../db");





const get_emails = async (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        res.status(500).json({ error: 'Failed to connect to database.' });
        return;
      }
  
      const query = 'SELECT * FROM emails';
      connection.query(query, (error, results) => {
        connection.release(); // Release the connection back to the pool
        if (error) {
          console.error('Error retrieving email data from database:', error);
          res.status(500).json({ error: 'Failed to retrieve email data.' });
        } else {
          res.json(results);
        }
      });
    });
  };



  // const get_residential_emails_from_florida = async (req, res, next) => {
  //   pool.getConnection((err, connection) => {
  //     if (err) {
  //       console.error('Error getting database connection:', err);
  //       res.status(500).json({ error: 'Failed to connect to database.' });
  //       return;
  //     }
  
  //     const query = 'SELECT * FROM residentialrealestateflorida';
  //     connection.query(query, (error, results) => {
  //       connection.release(); // Release the connection back to the pool
  //       if (error) {
  //         console.error('Error retrieving email data from database:', error);
  //         res.status(500).json({ error: 'Failed to retrieve email data.' });
  //       } else {
  //         res.json(results);
  //       }
  //     });
  //   });
  // };

  const get_residential_emails_from_florida = async (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        res.status(500).json({ error: 'Failed to connect to database.' });
        return;
      }
  
      // Order by datetime column in descending order
      const query = 'SELECT * FROM residentialrealestateflorida ORDER BY time DESC';
      connection.query(query, (error, results) => {
        connection.release(); // Release the connection back to the pool
        if (error) {
          console.error('Error retrieving email data from database:', error);
          res.status(500).json({ error: 'Failed to retrieve email data.' });
        } else {
          res.json(results);
        }
      });
    });
  };
  


  const getallresidentialemailnewyork = async (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        res.status(500).json({ error: 'Failed to connect to database.' });
        return;
      }
  
      const query = 'SELECT * FROM residentialrealestatenewyorkcity ORDER BY time DESC';
      connection.query(query, (error, results) => {
        connection.release(); // Release the connection back to the pool
        if (error) {
          console.error('Error retrieving email data from database:', error);
          res.status(500).json({ error: 'Failed to retrieve email data.' });
        } else {
          res.json(results);
        }
      });
    });
  };




  const getallcommercialemailnewyork = async (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        res.status(500).json({ error: 'Failed to connect to database.' });
        return;
      }
  
      const query = 'SELECT * FROM commericialrealstatenewyork ORDER BY time DESC';
      connection.query(query, (error, results) => {
        connection.release(); // Release the connection back to the pool
        if (error) {
          console.error('Error retrieving email data from database:', error);
          res.status(500).json({ error: 'Failed to retrieve email data.' });
        } else {
          res.json(results);
        }
      });
    });
  };



  const getallcommercialemailflorida = async (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        res.status(500).json({ error: 'Failed to connect to database.' });
        return;
      }
  
      const query = 'SELECT * FROM commericialrealstateflorida ORDER BY time DESC';
      connection.query(query, (error, results) => {
        connection.release(); // Release the connection back to the pool
        if (error) {
          console.error('Error retrieving email data from database:', error);
          res.status(500).json({ error: 'Failed to retrieve email data.' });
        } else {
          res.json(results);
        }
      });
    });
  };








//   const get_html_content = async (req, res, next) => {
//     const emailId = req.params.id; // Assuming the email ID is passed as a parameter in the URL
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.error('Error getting database connection:', err);
//             res.status(500).json({ error: 'Failed to connect to database.' });
//             return;
//         }

//         const query = 'SELECT html_body FROM emails WHERE id = ?'; // Update the query to fetch HTML content based on email ID
//         connection.query(query, [emailId], (error, results) => {
//             connection.release(); // Release the connection back to the pool
//             if (error) {
//                 console.error('Error retrieving HTML content from database:', error);
//                 res.status(500).json({ error: 'Failed to retrieve HTML content.' });
//             } else {
//                 if (results.length === 0) {
//                     res.status(404).json({ error: 'HTML content not found.' });
//                 } else {
//                     const htmlContent = results[0].html_content;
//                     res.send(htmlContent);
//                 }
//             }
//         });
//     });
// };





// const get_emails = async (req, res, next) => {
//     pool.getConnection((err, connection) => {
//       if (err) {
//         console.error('Error getting database connection:', err);
//         res.status(500).json({ error: 'Failed to connect to database.' });
//         return;
//       }
  
//       const query = 'SELECT id, subject, time, html_body, screenshot, request_id FROM emails';
//       connection.query(query, (error, results) => {
//         connection.release(); // Release the connection back to the pool
//         if (error) {
//           console.error('Error retrieving email data from database:', error);
//           res.status(500).json({ error: 'Failed to retrieve email data.' });
//         } else {
//           const emails = results.map(result => {
//             // Check if screenshot data exists and convert to base64 string
//             const screenshotBase64 = result.screenshot ? result.screenshot.toString('base64') : null;
//             return { ...result, screenshot: screenshotBase64 };
//           });
//           res.json(emails);
//         }
//       });
//     });
// };





const get_html_content = async (req, res, next) => {
    const emailId = req.params.id;
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.status(500).json({ error: 'Failed to connect to database.' });
            return;
        }

        const query = 'SELECT html_body FROM emails WHERE id = ?';
        connection.query(query, [emailId], (error, results) => {
            connection.release(); // Release the connection back to the pool
            if (error) {
                console.error('Error retrieving HTML content from database:', error);
                res.status(500).json({ error: 'Failed to retrieve HTML content.' });
            } else {
                if (results.length === 0) {
                    console.log(`HTML content not found for email ID: ${emailId}`);
                    res.status(404).json({ error: 'HTML content not found.' });
                } else {
                    const htmlContent = results[0].html_content;
                    console.log(`HTML content retrieved successfully for email ID: ${emailId}`);
                    console.log(`HTML content: ${htmlContent}`);
                    res.setHeader('Content-Type', 'text/html'); // Set Content-Type header
                    res.send(htmlContent);
                }
            }
        });
    });
};





// const get_single_html_content = async (req, res, next) => {
//     const emailId = req.params.id;
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.error('Error getting database connection:', err);
//             res.status(500).json({ error: 'Failed to connect to database.' });
//             return;
//         }

//         const query = 'SELECT html_body FROM emails WHERE request_id = ?';
//         connection.query(query, [emailId], (error, results) => {
//             connection.release(); // Release the connection back to the pool
//             if (error) {
//                 console.error('Error retrieving HTML content from database:', error);
//                 res.status(500).json({ error: 'Failed to retrieve HTML content.' });
//             } 

//             return res.json (
//                 {
//                     html_data:results
//                 }
//             )



//         });
//     });
// };


const get_single_html_content = async (req, res, next) => {
    const emailId = req.params.id;
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.status(500).json({ error: 'Failed to connect to database.' });
            return;
        }

        const query = `
            SELECT * FROM commericialrealstateflorida WHERE request_id = ?
            UNION
            SELECT * FROM commericialrealstatenewyork WHERE request_id = ?
            UNION
            SELECT * FROM residentialrealestateflorida WHERE request_id = ?
            UNION
            SELECT * FROM residentialrealestatenewyorkcity WHERE request_id = ?
            UNION
            SELECT * FROM commercialrealestateother WHERE request_id = ?
            UNION
            SELECT * FROM residentialrealestateother WHERE request_id = ?
        `;
        connection.query(query, [emailId, emailId, emailId, emailId,emailId,emailId], (error, results) => {
        
            if (error) {
                console.error('Error retrieving HTML content from database:', error);
                res.status(500).json({ error: 'Failed to retrieve HTML content.' });
            } 

            const brandNames = results.map(result => result.brandname);
                console.log(brandNames[0],"BRAND NAMES")

                const b= brandNames[0]


            const brand_query = 'SELECT * FROM brands WHERE title = ?'
            
            // connection.query(brand_query,[brandNames],(error,brand_data)=>{
                connection.query(brand_query,[b],(error,brand_data)=>{
               // Release the connection back to the pool
                if(error)
                    {
                        console.log(error)
                    }
                    const b_name= brand_data.map(brand_data=>brand_data.brandname)
                    console.log(b_name,"BRAND NAME FOR EMAIl")
                    const get_all_brand_query = `
                  SELECT * FROM (
    SELECT * FROM commericialrealstateflorida WHERE brandname = ?
    UNION
    SELECT * FROM commericialrealstatenewyork WHERE brandname = ?
    UNION
    SELECT * FROM residentialrealestateflorida WHERE brandname = ?
    UNION
    SELECT * FROM residentialrealestatenewyorkcity WHERE brandname = ?
    UNION
    SELECT * FROM commercialrealestateother WHERE brandname = ?
    UNION
    SELECT * FROM residentialrealestateother WHERE brandname = ?
) AS combined_results
ORDER BY time DESC;
                `;


                // connection.query(get_all_brand_query,[brandNames,brandNames,brandNames,brandNames],(error,brand_emails)=>{
                    connection.query(get_all_brand_query,[b,b,b,b,b,b],(error,brand_emails)=>{
                    connection.release(); 
                    if(error)
                        {
                            console.log(error)
                        }


                        return res.json({
                            html_data: results,
                            brand:brand_data,
                            brand_emails:brand_emails,
                            brandname:brandNames
                        });
    

                })


                   

            })




            
        });
    });
};


const commercialrealestateother = async (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        res.status(500).json({ error: 'Failed to connect to database.' });
        return;
      }
  
      const query = 'SELECT * FROM commercialrealestateother ORDER BY time DESC';
      connection.query(query, (error, results) => {
        connection.release(); // Release the connection back to the pool
        if (error) {
          console.error('Error retrieving email data from database:', error);
          res.status(500).json({ error: 'Failed to retrieve email data.' });
        } else {
          res.json(results);
        }
      });
    });
  };


  const residentialrealestateother = async (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        res.status(500).json({ error: 'Failed to connect to database.' });
        return;
      }
  
      const query = 'SELECT * FROM residentialrealestateother ORDER BY time DESC';
      connection.query(query, (error, results) => {
        connection.release(); // Release the connection back to the pool
        if (error) {
          console.error('Error retrieving email data from database:', error);
          res.status(500).json({ error: 'Failed to retrieve email data.' });
        } else {
          res.json(results);
        }
      });
    });
  };





// const saved_emails = async(req,res)=>{

// const {request_id,userid}=req.body

// console.log(req.body,"SAVED REQ")


//     pool.getConnection((error,connection)=>{

//         if(error)
//             {
//                 console.log(error)
//             }
    
//             const query =` SELECT * FROM emails where request_id = ?`

//             connection.query(query,[request_id],(error,results)=>{
//                 if(error)
//                     {
//                         console.log(error)
//                     }


//                     const data = results.map(e=>[e.html_body,e.request_id,e.screenshot_url,e.subject,e.time,userid])
//                     const data1= data[0]

//                     console.log(data1,"DATA 1")

//                     const insertquery= ` INSERT INTO saved_emails (html_body,request_id,screenshot_url,subject,time,userid) VALUES ?`

//                     connection.query(insertquery,[data[0]],(error,savedResults)=>{

//                         if(error){
//                             console.log(error)
//                         }
//                         else{
//                             console.log('SAved email to Db')
//                         }

//                         return res.json({
//                             results:results,
//                             savedResults:savedResults
//                         })

//                     })
                       


//                     })





                   
//             })
    
    
    
    
// }



const saved_emails = async (req, res) => {
    const { request_id, userid } = req.body;

    console.log(req.body, "SAVED REQ");

    pool.getConnection((error, connection) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Failed to connect to database.' });
        }

        const checkQuery = `SELECT COUNT(*) AS count FROM saved_emails WHERE request_id = ? AND userid = ?`;

        connection.query(checkQuery, [request_id, userid], (error, results) => {
            if (error) {
                console.log(error);
                connection.release();
                return res.status(500).json({ error: 'Failed to check for existing data.' });
            }

            // Check if data already exists
            if (results[0].count > 0) {
                connection.release();
                return res.status(409).json({ error: 'Data already exists for this request and user.' });
            }

            const query1 = `SELECT * FROM emails WHERE request_id = ?`;

            connection.query(query1, [request_id], (error, emailResults) => {
                if (error) {
                    console.log(error);
                    connection.release();
                    return res.status(500).json({ error: 'Failed to fetch email data.' });
                }

                const data = emailResults.map(e => [e.html_body, e.request_id, e.screenshot_url, e.subject, e.time, userid]);

                // If data doesn't exist, proceed with insertion
                const insertQuery = `INSERT INTO saved_emails (html_body, request_id, screenshot_url, subject, time, userid) VALUES (?, ?, ?, ?, ?, ?)`;

                connection.query(insertQuery, data[0], (error, savedResults) => {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: 'Failed to save email data.' });
                    }
                    console.log('Saved email to Db');
                    return res.json({
                        message: 'Email saved successfully.'
                    });
                });
            });
        });
    });
};






// const saved_emails = async (req, res) => {
//     const { request_id, userid } = req.body;

//     console.log(req.body, "SAVED REQ");

//     pool.getConnection((error, connection) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).json({ error: 'Failed to connect to database.' });
//         }

//         const checkQuery = `SELECT COUNT(*) AS count FROM saved_emails WHERE request_id = ? AND userid = ?`;

//         connection.query(checkQuery, [request_id, userid], (error, results) => {
//             if (error) {
//                 console.log(error);
//                 connection.release();
//                 return res.status(500).json({ error: 'Failed to check for existing data.' });
//             }

//             // Check if data already exists
//             if (results[0].count > 0) {
//                 connection.release();
//                 return res.status(409).json({ error: 'Data already exists for this request and user.' });
//             }
//             const query1 =` SELECT * FROM emails where request_id = ?`

//             connection.query(query1,[request_id],(error,results)=>{
//                 if(error)
//                     {
//                         console.log(error)
//                     }


                    
//                 })
//                 const data = results.map(e=>[e.html_body,e.request_id,e.screenshot_url,e.subject,e.time,userid])

//             // If data doesn't exist, proceed with insertion
//             const query = `INSERT INTO saved_emails (html_body, request_id, screenshot_url, subject, time, userid) VALUES (?, ?, ?, ?, ?, ?)`;
//             // const values = [req.body.html_body, request_id, req.body.screenshot_url, req.body.subject, req.body.time, userid];

//             connection.query(query, [data], (error, savedResults) => {
//                 connection.release();
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).json({ error: 'Failed to save email data.' });
//                 }
//                 console.log('Saved email to Db');
//                 return res.json({
//                     message: 'Email saved successfully.'
//                 });
//             });
//         });
//     });
// };




// const saved_emails = async (req, res) => {
//     const { request_id, userid } = req.body;

//     console.log(req.body, "SAVED REQ");

//     pool.getConnection((error, connection) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).json({ error: 'Failed to connect to database.' });
//         }

//         const checkQuery = `SELECT COUNT(*) AS count FROM saved_emails WHERE request_id = ? AND userid = ?`;

//         connection.query(checkQuery, [request_id, userid], (error, results) => {
//             if (error) {
//                 console.log(error);
//                 connection.release();
//                 return res.status(500).json({ error: 'Failed to check for existing data.' });
//             }

//             // Check if data already exists
//             if (results[0].count > 0) {
//                 connection.release();
//                 return res.status(409).json({ error: 'Data already exists for this request and user.' });
//             }

//             const query1 = `SELECT * FROM emails WHERE request_id = ?`;

//             connection.query(query1, [request_id], (error, emailResults) => {
//                 if (error) {
//                     console.log(error);
//                     connection.release();
//                     return res.status(500).json({ error: 'Failed to fetch email data.' });
//                 }

//                 const data = emailResults.map(e => [e.html_body, e.request_id, e.screenshot_url, e.subject, e.time, userid]);

//                 // If data doesn't exist, proceed with insertion
//                 const insertQuery = `INSERT INTO saved_emails (html_body, request_id, screenshot_url, subject, time, userid) VALUES ?`;

//                 connection.query(insertQuery, [data], (error, savedResults) => {
//                     connection.release();
//                     if (error) {
//                         console.log(error);
//                         return res.status(500).json({ error: 'Failed to save email data.' });
//                     }
//                     console.log('Saved email to Db');
//                     return res.json({
//                         message: 'Email saved successfully.'
//                     });
//                 });
//             });
//         });
//     });
// };




const fave_email = async (req,res)=>{

const {id} = req.params

console.log(id,"Req.params.id fave")


pool.getConnection((error,connection)=>{

    if(error)
        {
            console.log(error,"db error")
        }

        const query = "SELECT * FROM saved_emails WHERE userid = ? "


        connection.query(query,[id],((error,results)=>{

            if(error)
                {
                    console.log("Cannot Fetch Data from DB:",error)
                }

                return  res.json({
                    results:results

                })






        }))




})




}



// const follow_brand = async(req,res)=>{

//     const {id,userid}=req.body
    
//     console.log(req.body,"SAVED brand follow id ")
    
    
//         pool.getConnection((error,connection)=>{
    
//             if(error)
//                 {
//                     console.log(error)
//                 }
        
//                 const query =` SELECT * FROM brands where id = ?`
    
//                 connection.query(query,[id],(error,results)=>{
//                     if(error)
//                         {
//                             console.log(error)
//                         }
    
    
//                         const data = results.map(e=>[e.image_url,e.title,e.brand_email,e.category,e.site_url,userid])
    
//                         const insertquery= ` INSERT INTO follow_brands (image_url,title,brand_email,category,site_url,userid) VALUES ?`
    
//                         connection.query(insertquery,[data],(error,savedResults)=>{
    
//                             if(error){
//                                 console.log(error)
//                             }
//                             else{
//                                 console.log('SAved email to Db')
//                             }
    
//                             return res.json({
//                                 results:results,
//                                 savedResults:savedResults
//                             })
    
//                         })
                           
    
    
//                         })
    
    
    
    
    
                       
//                 })
        
        
        
        
//     }
    
    

const follow_brand = async (req, res) => {
    const { id, userid } = req.body;
    console.log(req.body, "SAVED brand follow id ");

    pool.getConnection((error, connection) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Failed to connect to database." });
        }

        const getBrandQuery = `SELECT * FROM brands WHERE id = ?`;
        connection.query(getBrandQuery, [id], (error, brandResults) => {
            if (error) {
                console.log(error);
                connection.release();
                return res.status(500).json({ error: "Error retrieving brand data from database." });
            }

            if (brandResults.length === 0) {
                connection.release();
                return res.status(404).json({ error: "Brand not found in database." });
            }

            const { image_url, title, brand_email, category, site_url } = brandResults[0];

            const checkExistenceQuery = `SELECT * FROM follow_brands WHERE userid = ? AND title = ?`;
            connection.query(checkExistenceQuery, [userid, title], (error, results) => {
                if (error) {
                    console.log(error);
                    connection.release();
                    return res.status(500).json({ error: "Error checking existence in database." });
                }

                if (results.length > 0) {
                    // Data already exists for the given userid and title
                    connection.release();
                    return res.status(400).json({ message: "Data already exists in the database." });
                }

                // Data does not exist, proceed to insert
                const data = [[image_url, title, brand_email, category, site_url, userid]];

                const insertQuery = `INSERT INTO follow_brands (image_url, title, brand_email, category, site_url, userid) VALUES ?`;
                connection.query(insertQuery, [data], (error, savedResults) => {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: "Error saving data to database." });
                    }
                    console.log("Saved email to DB");
                    return res.status(200).json({
                        results: brandResults,
                        savedResults: savedResults
                    });
                });
            });
        });
    });
};



// const get_user_follow_brands = async (req,res)=>{

//     const {id} = req.params
    
//     console.log(id,"Req.params.id fave")
    
    
//     pool.getConnection((error,connection)=>{
    
//         if(error)
//             {
//                 console.log(error,"db error")
//             }
    
//             const query = "SELECT * FROM follow_brands WHERE userid = ? "
    
    
//             connection.query(query,[id],((error,results)=>{
    
//                 if(error)
//                     {
//                         console.log("Cannot Fetch Data from DB:",error)
//                     }
    
//                     return  res.json({
//                         results:results
    
//                     })
    
    
    
    
    
    
//             }))
    
    
    
    
//     })
    
    
    
    
//     }



const get_user_follow_brands = async (req, res) => {
    const { id } = req.params;
    
    console.log(id, "Req.params.id fave");
    
    pool.getConnection((error, connection) => {
        if (error) {
            console.log(error, "db error");
            return res.status(500).json({ error: "Database error" });
        }

        const followBrandsQuery = "SELECT * FROM follow_brands WHERE userid = ?";
        connection.query(followBrandsQuery, [id], (error, followBrandResults) => {
            if (error) {
                console.log("Cannot Fetch Data from DB:", error);
                return res.status(500).json({ error: "Database error" });
            }

            const results = [];
            const brandnames = followBrandResults.map((result) => result.title);

            // Query each table for records matching the brandname
            const query = `
                SELECT * FROM commericialrealstateflorida WHERE brandname IN (?)
                UNION
                SELECT * FROM commericialrealstatenewyork WHERE brandname IN (?)
                UNION
                SELECT * FROM residentialrealestateflorida WHERE brandname IN (?)
                UNION
                SELECT * FROM residentialrealestatenewyorkcity WHERE brandname IN (?)
                UNION
                SELECT * FROM commercialrealestateother WHERE brandname IN (?)
                UNION
                SELECT * FROM residentialrealestateother WHERE brandname IN (?)
            `;

            connection.query(query, [brandnames, brandnames, brandnames, brandnames,brandnames,brandnames], (error, additionalResults) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Database error" });
                }

                return res.json({
                    results: followBrandResults,
                    follow_brands_email: additionalResults,
                });
            });
        });
    });
};





    const filter_search = async (req,res)=>{

        const {id} = req.params
        
        console.log(id,"Filter Search ")
        
        
        pool.getConnection((error,connection)=>{
        
            if(error)
                {
                    console.log(error,"db error")
                }
        
                const get_all_brand_query = `
                SELECT * FROM commericialrealstateflorida WHERE subject LIKE CONCAT('%', ?, '%')
                UNION
                SELECT * FROM commericialrealstatenewyork WHERE subject LIKE CONCAT('%', ?, '%')
                UNION
                SELECT * FROM residentialrealestateflorida WHERE subject LIKE CONCAT('%', ?, '%')
                UNION
                SELECT * FROM residentialrealestatenewyorkcity WHERE subject LIKE CONCAT('%', ?, '%')
                UNION
                SELECT * FROM commercialrealestateother WHERE subject LIKE CONCAT('%', ?, '%')
                UNION
                SELECT * FROM residentialrealestateother WHERE subject LIKE CONCAT('%', ?, '%')
                `;


                connection.query(get_all_brand_query,[id,id,id,id,id,id],(error,filtered_emails)=>{
                    connection.release(); 
                    if(error)
                        {
                            console.log(error)
                        }


                        return res.json({
                            filtered_emails:filtered_emails
                        });
    

                })


            })
                
        
        
        
                
        
        
        
        
        
        
        
        
        
        }
        








  

  module.exports={
    get_emails,get_html_content,get_single_html_content,
    get_residential_emails_from_florida,
    getallresidentialemailnewyork,
    getallcommercialemailflorida,
    getallcommercialemailnewyork,
    saved_emails,
    fave_email,
    follow_brand,
    get_user_follow_brands,
    filter_search,
    commercialrealestateother,
    residentialrealestateother

  }