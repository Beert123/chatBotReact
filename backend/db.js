import postgres from "postgres";

const connectionString = process.env.DATABASEURL;

if(!connectionString){
    throw new Error("noob")
}

const sql = postgres(connectionString);

export default sql