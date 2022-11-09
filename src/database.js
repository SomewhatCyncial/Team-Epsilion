//javascript file for database functions
const {MongoClient} = require('mongodb');



async function main() {

    const uri = "mongodb+srv://TeamEpsilon:qeRbSxbrBo1icaxl@cluster0.3kmj7nn.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    try{
        await client.connect()
        .then( client => {
            const db = client.db('enumeration-machine')
        })
    }
    catch(err){
        console.error(err);
    }
    finally{
        await client.close();
    }

}

main().catch(console.error);