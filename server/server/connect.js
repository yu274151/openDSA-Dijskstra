const {MongoClient} = require("mongodb");

const url = "mongodb+srv://jihan:Jcriki04@cluster0.m2xf1.mongodb.net/<dbname>retryWrites=true&w=majority";

const client = new MongoClient(url);

const dbName = "openDSA-student-score";

async function run(score={}) {

	try{
		await client.connect();
		console.log("Connected correctly to server");
		const db = client.db(dbName);
		const col = db.collection("student-score");
	
		 let studentScoreDocument = score;
         
         const p = await col.insertOne(studentScoreDocument);
         
         const myDoc = await col.findOne();
	
         console.log(myDoc);
	
	
	} catch(err) {
	
		console.log(err.stack);
	}
	
	finally {
	
	await client.close();
	
	}

};

module.exports = run;

