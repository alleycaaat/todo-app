const faunadb = require('faunadb');
require('dotenv').config();
const q = faunadb.query;

exports.handler = (event, context) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SECRET,
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    });

    return client
        .query(q.Paginate(q.Match(q.Ref('indexes/all_notes'))))
        .then((response) => {
            const notesRefs = response.data;
         
            const getQuery = notesRefs.map((ref) => {
                return q.Get(ref);
            });

            return client.query(getQuery).then((ret) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify(ret),
                };
            });
        })
        .catch((error) => {
            console.log('error', error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
/*
.then((response) => {
            //console.log(response.data.Ref.id)
            const notesRefs = response.data;

            const allDataQuery = notesRefs.map((ref) => {
                return q.Get(ref);
            });
            // then query the refs
            return client.query(allDataQuery).then((ret) => {
                return callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(ret),
                });
            });
        })

   let deleteNote;
            if (ref) {
                //make sure create api has run before displaying
                deleteNote = (
                    <MdDeleteForever
                        onClick={() => deleteNote(id)}
                        className='delete-icon'
                        size='1.3em'
                    />
                );
            }



        */
