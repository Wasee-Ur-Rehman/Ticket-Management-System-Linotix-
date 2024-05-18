const cors = require('cors');
const sendEmail = require ('./sendEmail');


const express = require('express');
const sql = require('mssql');
const app = express();
const PORT = 3001;

// initialize app
app.use(cors());


app.use(express.json());

const config = {
  user: 'UserOne',
  password: 'OlperMilk!@#123',
  server: 'localhost', // You can use your database's IP address here
  database: 'Linotix',
  options: {
    encrypt: true,
    trustServerCertificate: true // For development purposes only
  }
};

// Register User Endpoint
app.post('/register', async (req, res) => {
  const { userName, password, email, city } = req.body;

  const pool = await sql.connect(config);

  // Check if email already exists
  const emailCheckResult = await pool.request()
    .query(`SELECT * FROM Users WHERE Email = '${email}'`);

  // Check if email was found (existing user)
  if (emailCheckResult.recordset.length > 0) {
    return res.status(400).json({ message: "Email already in use!" });
  }

  // If email is unique, proceed with registration
  const result = await pool.request()
    .query(`INSERT INTO Users (UserName, Password, Email, City) VALUES ('${userName}', '${password}', '${email}', '${city}')`);

  res.json(result);
});


// Login User Endpoint
app.post('/login', async (req, res) => {
  try {
    // display user entered userName and password
    console.log(req.body);
    const { userName, password } = req.body;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('userName', sql.VarChar, userName)
      .input('password', sql.VarChar, password)
      .query('SELECT * FROM Users WHERE UserName = @userName AND Password = @password');

    if (result.recordset.length > 0) {
      // User authenticated
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Fetch Buses Endpoint
app.post('/fetchBuses', async (req, res) => {
  try {
    const { departure, arrival, date } = req.body;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('departure', sql.VarChar, departure)
      .input('arrival', sql.VarChar, arrival)
      .input('date', sql.Date, date)
      .query(`
      SELECT DISTINCT B.*, 
      (SELECT TOP 1 BT.Price 
       FROM Bus_Ticket BT 
       WHERE BT.Bus_Id = B.Bus_Id) AS Price
FROM Bus B
WHERE B.StartingLocation = @departure 
 AND B.EndingLocation = @arrival 
 AND B.DepartureDate = @date

      `);

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Authenticate Endpoint that will get user email and check it in database if found return the userId
app.post('/authenticate', async (req, res) => {
  try {
    const { email } = req.body;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT User_Id FROM Users WHERE Email = @email');

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
app.post('/bookBus', async (req, res) => {
  try {
    const { busId, userId } = req.body;
    const pool = await sql.connect(config);
    
    // Update the ticket with the provided user ID
    const updateResult = await pool.request()
      .input('busId', sql.Int, busId)
      .input('userId', sql.Int, userId)
      .query(`
        UPDATE Bus_Ticket
        SET User_Id = @userId
        WHERE Bus_Id = @busId
        AND User_Id IS NULL
        AND Ticket_Id = (
          SELECT TOP 1 Ticket_Id
          FROM Bus_Ticket
          WHERE Bus_Id = @busId
          AND User_Id IS NULL
          ORDER BY Ticket_Id
        )
      `);

    // Check if any ticket was updated
    if (updateResult.rowsAffected[0] > 0) {
      // Retrieve the ticket ID associated with the user and the bus
      const selectResult = await pool.request()
        .input('busId', sql.Int, busId)
        .input('userId', sql.Int, userId)
        .query(`
        SELECT TOP 1 Ticket_Id
        FROM Bus_Ticket
        WHERE Bus_Id = @busId
        AND User_Id = @userId
        ORDER BY Ticket_Id DESC
        `);

      // Check if a ticket was found for the user and the bus
      if (selectResult.recordset.length > 0) {
        // Return the ticket ID
        res.json({ ticketId: selectResult.recordset[0].Ticket_Id });
      } else {
        res.status(404).json({ message: 'Ticket not found' });
      }
    } else {
      res.status(404).json({ message: 'No tickets available' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// see Ticket Endpoint and return the all the  tickets of the users in the database with bus id and Destination

app.post('/seeTicket', async (req, res) => {
  // take email
  const { email } = req.body;
  // connect to database
  const pool = await sql.connect(config);
  // get the user id from the email
  const userIdResult = await pool.request()
    .input('email', sql.VarChar, email)
    .query('SELECT User_Id FROM Users WHERE Email = @email');
  // check if user id is found
  if (userIdResult.recordset.length > 0) {
    // get the tickets of the user
    const ticketsResult = await pool.request()
      .input('userId', sql.Int, userIdResult.recordset[0].User_Id)
      .query(`
        SELECT BT.*, B.StartingLocation, B.EndingLocation, B.DepartureTime, B.DepartureDate
        FROM Bus_Ticket BT
        JOIN Bus B ON BT.Bus_Id = B.Bus_Id
        WHERE BT.User_Id = @userId
      `);
    // return the tickets
    res.json(ticketsResult.recordset);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}
);

// write a cancel endpoint that take the ticket id and cancel the ticket
app.post('/cancelTicket', async (req, res) => {
  // take ticket id
  const { ticketId } = req.body;
  // connect to database
  const pool = await sql.connect(config);
  // cancel the ticket
  const result = await pool.request()
    .input('ticketId', sql.Int, ticketId)
    // update the user_id to null
    .query('UPDATE Bus_Ticket SET User_Id = NULL WHERE Ticket_Id = @ticketId');
  // check if ticket was deleted
  if (result.rowsAffected[0] > 0) {
    res.json({ message: 'Ticket canceled' });
  } else {
    res.status(404).json({ message: 'Ticket not found' });
  }
});

// make view users endpoint that return all the users in the database except username having admin
app.get('/users', async (req, res) => {
  const pool = await sql.connect(config);
  const result = await pool.request()
    .query('SELECT * FROM Users WHERE UserName != \'admin\'');
  res.json(result.recordset);
});

// make delete user endpoint that take the user id and delete the user
// also set the user_id to null in the bus_ticket table
// update the user_id to null in the bus_ticket table first
app.post('/deleteUser', async (req, res) => {
  const { userId } = req.body;
  const pool = await sql.connect(config);
  const updateResult = await pool.request()
    .input('userId', sql.Int, userId)
    .query('UPDATE Bus_Ticket SET User_Id = NULL WHERE User_Id = @userId');
  // delete the user
  const result = await pool.request()
    .input('userId', sql.Int, userId)
    .query('DELETE FROM Users WHERE User_Id = @userId');
  // check if user was deleted
  if (result.rowsAffected[0] > 0) {
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// make view buses endpoint that return all the buses in the database
app.get('/buses', async (req, res) => {
  const pool = await sql.connect(config);
  const result = await pool.request()
    .query('SELECT * FROM Bus');
  res.json(result.recordset);
});

// make delete bus endpoint that take the bus id and delete the bus
// also delete the bus tickets associated with the bus
app.post('/deleteBus', async (req, res) => {
  const { busId } = req.body;
  const pool = await sql.connect(config);
  const deleteTicketsResult = await pool.request()
    .input('busId', sql.Int, busId)
    .query('DELETE FROM Bus_Ticket WHERE Bus_Id = @busId');
  const result = await pool.request()
    .input('busId', sql.Int, busId)
    .query('DELETE FROM Bus WHERE Bus_Id = @busId');
  if (result.rowsAffected[0] > 0) {
    res.json({ message: 'Bus deleted' });
  } else {
    res.status(404).json({ message: 'Bus not found' });
  }
});

// make add bus endpoint that take the bus details and add the bus
// and automatically execute the stored procedure to add the bus tickets
//CREATE PROCEDURE InsertBusTickets
//@BusId INT,
//@Price INT
// also take the price of the ticket to set in stored procedure

app.post('/addBus', async (req, res) => {
  const { BusName, StartingLocation, EndingLocation, DepartureTime, DepartureDate, TotalSeats, TicketPrice  } = req.body;
  const pool = await sql.connect(config);
  const result = await pool.request()
    .input('BusName', sql.VarChar, BusName)
    .input('StartingLocation', sql.VarChar, StartingLocation)
    .input('EndingLocation', sql.VarChar, EndingLocation)
    .input('DepartureTime', sql.VarChar, DepartureTime)
    .input('DepartureDate', sql.Date, DepartureDate)
    .input('TotalSeats', sql.Int, TotalSeats)
    .query(`
    INSERT INTO Bus (BusName, TotalSeats, StartingLocation, EndingLocation, DepartureTime, DepartureDate)
      VALUES (@BusName, @TotalSeats, @StartingLocation, @EndingLocation, @DepartureTime, @DepartureDate)
      DECLARE @BusId INT
      SELECT @BusId = Bus_Id FROM Bus WHERE BusName = @BusName
      EXEC InsertBusTickets @BusId, ${TicketPrice}, @TotalSeats
    `);
  res.json(result);
});

// make an end point that wil take emial, ticket id, bus name and  departure time 

app.post('/sendEmail', async (req, res) => {
  const { email, ticketId} = req.body;
  const emailText = `
Hello Sir,

I am glad to share that your ticket with ID ${ticketId} has been successfully booked by Linotix.

Thank you for choosing Linotix.

Regards,
Wasee-Ur-Rehman.
`;

  sendEmail(email, emailText);
  res.json({ message: 'Email sent' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

