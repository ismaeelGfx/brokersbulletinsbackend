const pool = require("../db");




// const Upload_Brand = async (req,res)=>{

// const {image_url,title,site_url} = req.body


// console.log(req.body)

// try{
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.error('Error getting database connection:', err);
//             res.status(500).json({ error: 'Failed to connect to database.' });
//             return;
//         }

//         const query = 'INSERT  INTO brands (image_url,title,site_url) VALUES emails  (?,?,?)';
//         connection.query(query, [image_url,title,site_url], (error, results) => {

//             return res.json({
//                 data:results
//             })
//            // Release the connection back to the pool
           
//         });
//         connection.release(); 
//     });

// }

// catch{

// }




// }



const Upload_Brand = async (req, res) => {
    const { image_url, title, site_url,brand_email,category } = req.body;
  
    try {
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error getting database connection:', err);
          res.status(500).json({ error: 'Failed to connect to database.' });
          return;
        }
  
        const query = 'INSERT INTO brands (image_url, title, site_url,brand_email,category) VALUES (?, ?, ?,?,?)';
        connection.query(query, [image_url, title, site_url,brand_email,category], (error, results) => {
          if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Failed to insert data into database.' });
            return;
          }
  
          res.json({ data: results });
        });
  
        // Release the connection back to the pool
        connection.release();
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };





const get_all_brands = async (req,res)=>{

    try{
            pool.getConnection((err,connection)=>{

                if(err)
                    {
                        console.log(err)
                        res.status(500).json({err:'Internal Server Error'})
                        return;
            }

                    const query= 'SELECT * FROM brands'
                    connection.query(query,(error,results)=>{

                        if(error){
                            res.status(500).json({"Internal Server Error":error})
                        }

                        return res.json({
                            brands:results
                        })

                    })

    }

)
    }


    catch (err){
        console.log(err)

    }



}

  


// const filtered_email = async (req, res) => {
//     const { image_url, title, site_url,brand_email,category } = req.body;

//     let targetTable;
// if (category === 'Residential Real Estate - New York City') {
//   targetTable = 'residentialrealestatenewyorkcity';
// } else if (category === 'Residential Real Estate - Florida') {
//   targetTable = 'residentialrealestateflorida';
// } else if (category ==='Commercial Real Estate - New York'){
//     targetTable='commericialrealstatenewyork'
//   // Handle other categories if needed
// }
// else if(category==='Commercial Real Estate - Florida')
//     {
//         targetTable='commericialrealstateflorida'
//     }
  
//     try {
//       pool.getConnection((err, connection) => {
//         if (err) {
//           console.error('Error getting database connection:', err);
//           res.status(500).json({ error: 'Failed to connect to database.' });
//           return;
//         }
  
//         // const query = 'INSERT INTO brands (image_url, title, site_url,brand_email,category) VALUES (?, ?, ?,?,?)';
//         const query = 'SELECT * FROM emails WHERE from_email LIKE ?';
//         const searchTerm = `%${brand_email}%`; // Add wildcard % before and after the brand_email
//         connection.query(query, [searchTerm], (error, results) => {
//           if (error) {
//             console.error('Error executing SQL query:', error);
//             res.status(500).json({ error: 'Failed to retrieve data from the database.' });
//             return;
//           }

//           const Insert_Query = ` INSERT INTO ${targetTable} (html_body,request_id,screenshot_url,subject,time,brandemail,brandname) VALUES ?,?,?,?,?,?,?`

//           const values = results.map(row => [row.html_body, row.request_id,row.screenshot_url,row.subject,row.time,brand_email,title/* other columns as needed */]);

//             connection.query(Insert_Query,[values],(error,connection)=>{

//                 if(error)
//                     {console.log(error)}




//             })          




//           // Process the query results
//           res.json({ data: results });
//         });
  
//         // Release the connection back to the pool
//         connection.release();
//       });
//     } catch (error) {
//       console.error('Unexpected error:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

const filtered_email = async (req, res) => {
    const { brand_email, category,title } = req.body;

    let targetTable;
    if (category === 'Residential Real Estate - New York City') {
        targetTable = 'residentialrealestatenewyorkcity';
    } else if (category === 'Residential Real Estate - Florida') {
        targetTable = 'residentialrealestateflorida';
    } else if (category === 'Commercial Real Estate - New York') {
        targetTable = 'commericialrealstatenewyork';
    } else if (category === 'Commercial Real Estate - Florida') {
        targetTable = 'commericialrealstateflorida';
    }
    else if (category === 'Commercial Real Estate - Other') {
        targetTable = 'commercialrealestateother';
    }
    else if (category === 'Residential Real Estate - Other') {
        targetTable = 'residentialrealestateother';
    }
  
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting database connection:', err);
                res.status(500).json({ error: 'Failed to connect to database.' });
                return;
            }
  
            const query = 'SELECT * FROM emails WHERE from_email LIKE ?';
            const searchTerm = `%${brand_email}%`; // Add wildcard % before and after the brand_email
            connection.query(query, [searchTerm], (error, results) => {
                if (error) {
                    console.error('Error executing SQL query:', error);
                    res.status(500).json({ error: 'Failed to retrieve data from the database.' });
                    return;
                }

                const Insert_Query = `INSERT INTO ${targetTable} (html_body, request_id, screenshot_url, subject, time, brandemail, brandname) VALUES ?`;

                const values = results.map(row => [row.html_body, row.request_id, row.screenshot_url, row.subject, row.time, brand_email, title/* other columns as needed */]);

                connection.query(Insert_Query, [values], (error, result) => {
                    if (error) {
                        console.error('Error inserting data into the target table:', error);
                        res.status(500).json({ error: 'Failed to insert data into the target table.' });
                        return;
                    }

                    console.log('Data inserted into the target table successfully.');
                    res.json({ data: results });
                });
            });
  
            // Release the connection back to the pool
            connection.release();
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};






// const check_for_more_email_brand = async (req,res)=>{

//     try{
//             pool.getConnection((err,connection)=>{

//                 if(err)
//                     {
//                         console.log(err)
//                         res.status(500).json({err:'Internal Server Error'})
//                         return;
//             }

//                     const query= 'SELECT * FROM brands'
//                     connection.query(query,(error,results)=>{
                        
//                         if(error){
//                             res.status(500).json({"Internal Server Error":error})
//                         }

//                         // console.log(results,"Results")

//                         results.forEach(element => {
//                             // console.log(element,"ELEMENT")

//                             const brandname1= element.title
//                             const email= element.brand_email
//                             const category = element.category

//                             // console.log(brandname,email,category,"Details")



//                             const getquery= `SELECT * FROM emails WHERE from_email  LIKE ?`
//                             const searchTerm = `%${email}%`;

                           
//                                     connection.query(getquery,[searchTerm],(error,email_array)=>{
                                        
//                                         if(error)
//                                             {
//                                                 console.log(error,"CANT ACCESS DATA")
//                                             }

//                                             // console.log(email_array,"RESULTS FROM FOR EACH ")

                                        
//                                               email_array.forEach(singlemail => {

//                                                 // console.log(singlemail,"singlemail")

//                                                 const request_id= singlemail.request_id
//                                                 const screenshot_url = singlemail.screenshot_url
//                                                 const brandemail=   email
//                                                 const subject = singlemail.subject
//                                                 const brandname =  brandname1
//                                                 const time= singlemail.time
//                                                 const html_body = singlemail.html_body


//                                                 console.log("ALL DATA",request_id,screenshot_url,brandemail,subject,brandname,time,html_body)


//                                                 let targetTable;
//                                                     if (category === 'Residential Real Estate - New York City') {
//                                                         targetTable = 'residentialrealestatenewyorkcity';
//                                                     } else if (category === 'Residential Real Estate - Florida') {
//                                                         targetTable = 'residentialrealestateflorida';
//                                                     } else if (category === 'Commercial Real Estate - New York') {
//                                                         targetTable = 'commericialrealstatenewyork';
//                                                     } else if (category === 'Commercial Real Estate - Florida') {
//                                                         targetTable = 'commericialrealstateflorida';
//                                                     }


//                                                     const Insert_Query = `INSERT INTO ${targetTable} (html_body, request_id, screenshot_url, subject, time, brandemail, brandname) VALUES ?`;

//                                                     const data =(html_body,request_id,screenshot_url,subject,time,brandemail,brandname);
                                                   

                                                        
                                                            
//                                                             connection.query(Insert_Query,[data],(error,final_data)=>{

                                                                

//                                                                 if(error)
//                                                                     {
//                                                                         console.log(error)
//                                                                     }

                                                                   

//                                                             })

                                                    


//                                               });  



//                                     })

                           





//                         });













//                         return res.json({
//                             brands:results
//                         })

//                     })

//     }

// )
//     }


//     catch (err){
//         console.log(err)

//     }



// }


// const check_for_more_email_brand = async (req, res) => {
//     try {
//         pool.getConnection((err, connection) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ err: 'Internal Server Error' });
//                 return;
//             }
//             const query = 'SELECT * FROM brands';
//             connection.query(query, (error, results) => {
//                 connection.release();
//                 if (error) {
//                     res.status(500).json({ "Internal Server Error": error });
//                     return;
//                 }
//                 results.forEach(element => {
//                     const brandname1 = element.title;
//                     const email = element.brand_email;
//                     const category = element.category;
//                     const getquery = `SELECT * FROM emails WHERE from_email  LIKE ?`;
//                     const searchTerm = `%${email}%`;
//                     connection.query(getquery, [searchTerm], (error, email_array) => {
//                         if (error) {
//                             console.log(error, "CANT ACCESS DATA");
//                             return;
//                         }
//                         email_array.forEach(singlemail => {
//                             const request_id = singlemail.request_id;
//                             const screenshot_url = singlemail.screenshot_url;
//                             const brandemail = email;
//                             const subject = singlemail.subject;
//                             const brandname = brandname1;
//                             const time = singlemail.time;
//                             const html_body = singlemail.html_body;
//                             console.log("ALL DATA", request_id, screenshot_url, brandemail, subject, brandname, time, html_body);
//                             let targetTable;
//                             if (category === 'Residential Real Estate - New York City') {
//                                 targetTable = 'residentialrealestatenewyorkcity';
//                             } else if (category === 'Residential Real Estate - Florida') {
//                                 targetTable = 'residentialrealestateflorida';
//                             } else if (category === 'Commercial Real Estate - New York') {
//                                 targetTable = 'commericialrealstatenewyork';
//                             } else if (category === 'Commercial Real Estate - Florida') {
//                                 targetTable = 'commericialrealstateflorida';
//                             }
//                             const Insert_Query = `INSERT INTO ${targetTable} (html_body, request_id, screenshot_url, subject, time, brandemail, brandname) VALUES (?)`;
//                             const values = [html_body, request_id, screenshot_url, subject, time, brandemail, brandname];
//                             connection.query(Insert_Query, [values], (error, final_data) => {
//                                 if (error) {
//                                     console.log(error);
//                                     return;
//                                 }
//                                 console.log("Data inserted successfully:", final_data);
//                             });
//                         });
//                     });
//                 });
//                 return res.json({
//                     brands: results
//                 });
//             });
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };


const check_for_more_email_brand = async (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: 'Internal Server Error' });
                return;
            }
            const query = 'SELECT * FROM brands';
            connection.query(query, (error, results) => {
                connection.release();
                if (error) {
                    res.status(500).json({ "Internal Server Error": error });
                    return;
                }
                results.forEach(element => {
                    const brandname1 = element.title;
                    const email = element.brand_email;
                    const category = element.category;
                    const getquery = `SELECT * FROM emails WHERE from_email LIKE ?`;
                    const searchTerm = `%${email}%`;
                    connection.query(getquery, [searchTerm], (error, email_array) => {
                        if (error) {
                            console.log(error, "CANT ACCESS DATA");
                            return;
                        }
                        email_array.forEach(singlemail => {
                            const request_id = singlemail.request_id;
                            const screenshot_url = singlemail.screenshot_url;
                            const brandemail = email;
                            const subject = singlemail.subject;
                            const brandname = brandname1;
                            const time = singlemail.time;
                            const html_body = singlemail.html_body;
                            console.log("ALL DATA", request_id, screenshot_url, brandemail, subject, brandname, time, html_body);
                            let targetTable;
                            if (category === 'Residential Real Estate - New York City') {
                                targetTable = 'residentialrealestatenewyorkcity';
                            } else if (category === 'Residential Real Estate - Florida') {
                                targetTable = 'residentialrealestateflorida';
                            } else if (category === 'Commercial Real Estate - New York') {
                                targetTable = 'commericialrealstatenewyork';
                            } else if (category === 'Commercial Real Estate - Florida') {
                                targetTable = 'commericialrealstateflorida';
                            }
                            else if (category === 'Residential Real Estate - Other') {
                                targetTable = 'residentialrealestateother';
                            }
                            else if (category === 'Commercial Real Estate - Other') {
                                targetTable = 'commercialrealestateother';
                            }





                            const checkExistQuery = `SELECT COUNT(*) AS count FROM ${targetTable} WHERE request_id = ?`; // Assuming request_id is unique
                            connection.query(checkExistQuery, [request_id], (error, result) => {
                                if (error) {
                                    console.log(error);
                                    return;
                                }
                                const count = result[0].count;
                                if (count === 0) { // If count is 0, data doesn't exist, so proceed with INSERT
                                    const Insert_Query = `INSERT INTO ${targetTable} (html_body, request_id, screenshot_url, subject, time, brandemail, brandname) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                                    const values = [html_body, request_id, screenshot_url, subject, time, brandemail, brandname];
                                    connection.query(Insert_Query, values, (error, final_data) => {
                                        if (error) {
                                            console.log(error);
                                            return;
                                        }
                                        console.log("Data inserted successfully:", final_data);
                                    });
                                } else {
                                    console.log("Data already exists for request_id:", request_id);
                                }
                            });
                        });
                    });
                });
                return res.json({
                    brands: results
                });
            });
        });
    } catch (err) {
        console.log(err);
    }
};



const Delete_brand_and_Email = (req,res,next)=>{


    const {id}= req.body

    console.log(id,"DELETE_BRAND")

    pool.getConnection((error,connection)=>{

        if(error)
            {
                console.log(error)
            }

            const Delete_Brand_Query = `DELETE FROM brands WHERE id=?`

         const query = 'SELECT * FROM brands WHERE id= ? '   

        connection.query(query,[id],(error,results)=>{

                if(error)
                    {
                        console.log(error)
                    }

                    

                    results.forEach(element => {

                    const category = element.category
                    const email = element.brand_email  

                    console.log(category,email)

                    let targetTable;
                            if (category === 'Residential Real Estate - New York City') {
                                targetTable = 'residentialrealestatenewyorkcity';
                            } else if (category === 'Residential Real Estate - Florida') {
                                targetTable = 'residentialrealestateflorida';
                            } else if (category === 'Commercial Real Estate - New York') {
                                targetTable = 'commericialrealstatenewyork';
                            } else if (category === 'Commercial Real Estate - Florida') {
                                targetTable = 'commericialrealstateflorida';
                            }
                            else if (category === 'Residential Real Estate - Other') {
                                targetTable = 'residentialrealestateother';
                            }
                            else if (category === 'Commercial Real Estate - Other') {
                                targetTable = 'commercialrealestateother';
                            }


                        console.log(targetTable,"TARGET TABLE")      
                        
                        
                        const Delete_Query = `DELETE FROM ${targetTable} WHERE brandemail=?`;

                        connection.query(Delete_Query,[email],(error,connection)=>{

                            if(error){
                                console.log(error,"DELETE EMAIL FROM CAT TABLE")
                            }




                        })

                        

                        connection.query(Delete_Brand_Query,[id],(error,connection)=>{

                            if(error)
                                {
                                    console.log(error,"ERROR DELETE BRANDS TABLE")
                                }

                                return res.json({

                                    message:true

                                })

                        })

                    


                    });

                  


        })    

    })



}



// const like_post = (req, res, next) => {
//     const { request_id, userid } = req.body;

//     console.log(request_id, userid);

//     // Step 2: Get a connection from the pool
//     pool.getConnection((error, connection) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).send({ error: "Failed to connect to the database" });
//         }

//         // Step 3: Check if the like is already present in the Liked_Post table
//         const checkLikeQuery = 'SELECT * FROM Liked_Post WHERE request_id = ? AND user_id = ?';
//         connection.query(checkLikeQuery, [request_id, userid], (error, results) => {
//             if (error) {
//                 connection.release();
//                 console.log(error);
//                 return res.status(500).send({ error: "Failed to execute the query" });
//             }

//             if (results.length > 0) {
//                 // Step 4: If the like already exists
//                 connection.release();
//                 return res.status(200).send({ message: "Like already present" });
//             }

//             // Step 5: If the like is not present, insert it into the Liked_Post table
//             const insertLikeQuery = 'INSERT INTO Liked_Post (request_id, user_id) VALUES (?, ?)';
//             connection.query(insertLikeQuery, [request_id, userid], (error, results) => {
//                 // Release the connection back to the pool
//                 connection.release();

//                 if (error) {
//                     console.log(error);
//                     return res.status(500).send({ error: "Failed to insert the like" });
//                 }

//                 // Step 6: Respond with a success message
//                 return res.status(201).send({ message: "Like added successfully" });
//             });
//         });
//     });
// };




const like_post = (req, res, next) => {
    const { request_id, userid } = req.body;

    console.log(request_id, userid);

    pool.getConnection((error, connection) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ error: "Failed to connect to the database" });
        }

        const checkLikeQuery = 'SELECT * FROM Liked_Post WHERE request_id = ? AND user_id = ?';
        connection.query(checkLikeQuery, [request_id, userid], (error, results) => {
            if (error) {
                connection.release();
                console.log(error);
                return res.status(500).send({ error: "Failed to execute the query" });
            }

            if (results.length > 0) {
                connection.release();
                return res.status(200).send({ message: "Like already present" });
            }

            const insertLikeQuery = 'INSERT INTO Liked_Post (request_id, user_id) VALUES (?, ?)';
            connection.query(insertLikeQuery, [request_id, userid], (error, results) => {
                if (error) {
                    connection.release();
                    console.log(error);
                    return res.status(500).send({ error: "Failed to insert the like" });
                }

                // Function to update the count in a specific table
                const updateCountInTable = (tableName, callback) => {
                    const updateCountQuery = `
                        UPDATE ${tableName}
                        SET count = IFNULL(CAST(CAST(Count AS UNSIGNED) + 1 AS CHAR), '1')
                        WHERE request_id = ?
                    `;
                    connection.query(updateCountQuery, [request_id], (error, results) => {
                        if (error) {
                            console.log(`Failed to update count in ${tableName}:`, error);
                            return callback(error);
                        }
                        callback(null);
                    });
                };

                // Array of table names to be checked and updated
                const tables = [
                    'commericialrealstateflorida',
                    'commericialrealstatenewyork',
                    'residentialrealestateflorida',
                    'residentialrealestatenewyorkcity',
                    'commercialrealestateother',
                    'residentialrealestateother'
                ];

                // Function to update counts in all tables sequentially
                const updateCounts = (index) => {
                    if (index < tables.length) {
                        updateCountInTable(tables[index], (error) => {
                            if (error) {
                                connection.release();
                                return res.status(500).send({ error: `Failed to update count in ${tables[index]}` });
                            }
                            updateCounts(index + 1);
                        });
                    } else {
                        connection.release();
                        return res.status(201).send({ message: "Like added successfully and count updated" });
                    }
                };

                // Start updating counts from the first table
                updateCounts(0);
            });
        });
    });
};




// const like_post = (req, res, next) => {
//     const { request_id, userid } = req.body;

//     console.log(request_id, userid);

//     pool.getConnection((error, connection) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).send({ error: "Failed to connect to the database" });
//         }

//         const checkLikeQuery = 'SELECT * FROM Liked_Post WHERE request_id = ? AND user_id = ?';
//         connection.query(checkLikeQuery, [request_id, userid], (error, results) => {
//             if (error) {
//                 connection.release();
//                 console.log(error);
//                 return res.status(500).send({ error: "Failed to execute the query" });
//             }

//             if (results.length > 0) {
//                 connection.release();
//                 return res.status(200).send({ message: "Like already present" });
//             }

//             const insertLikeQuery = 'INSERT INTO Liked_Post (request_id, user_id) VALUES (?, ?)';
//             connection.query(insertLikeQuery, [request_id, userid], (error, results) => {
//                 if (error) {
//                     connection.release();
//                     console.log(error);
//                     return res.status(500).send({ error: "Failed to insert the like" });
//                 }

//                 // Search for request_id in multiple tables
//                 const searchQuery = `
//                 SELECT * FROM commericialrealstateflorida WHERE request_id = ?
//                 UNION
//                 SELECT * FROM commericialrealstatenewyork WHERE request_id = ?
//                 UNION
//                 SELECT * FROM residentialrealestateflorida WHERE request_id = ?
//                 UNION
//                 SELECT * FROM residentialrealestatenewyorkcity WHERE request_id = ?
//                 UNION
//                 SELECT * FROM commercialrealestateother WHERE request_id = ?
//                 UNION
//                 SELECT * FROM residentialrealestateother WHERE request_id = ?
//                 `;
//                 connection.query(searchQuery, [request_id, request_id, request_id, request_id, request_id, request_id], (error, results) => {
//                     if (error) {
//                         connection.release();
//                         console.log(error);
//                         return res.status(500).send({ error: "Failed to search for the request" });
//                     }

//                     if (results.length > 0) {
//                         // Assuming the first match in the union query is the one to update
//                         const tableWithRequest = results[0].table_name;  // Adjust based on actual column names
//                         const updateCountQuery = `UPDATE ${tableWithRequest} SET Count = Count + 1 WHERE request_id = ?`;
//                         connection.query(updateCountQuery, [request_id], (error, results) => {
//                             connection.release();
//                             if (error) {
//                                 console.log(error);
//                                 return res.status(500).send({ error: "Failed to update the count" });
//                             }
//                             return res.status(201).send({ message: "Like added successfully and count updated" });
//                         });
//                     } else {
//                         connection.release();
//                         return res.status(404).send({ message: "Request ID not found in any table" });
//                     }
//                 });
//             });
//         });
//     });
// };






module.exports = {
    Upload_Brand,get_all_brands,filtered_email,
    check_for_more_email_brand,
    Delete_brand_and_Email,
    like_post
};
