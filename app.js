const sql = require('mssql');


const config = {
    user: 'sports', 
    password: 'sports@123',
    server: '192.168.1.18:1433', 
    database: 'SPORTS', 
   
};

async function connectToDatabase() {
    try {

        
        let pool = await sql.connect(config);
        console.log('Connected to the database!');

        const result = await pool.request().query('SELECT * FROM your_table');
        console.log(result.recordset); 
    } catch (err) {
        console.error('Database connection failed:', err);
    } finally {
        await sql.close();
    }
}

connectToDatabase();
