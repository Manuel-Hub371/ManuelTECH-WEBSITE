const mongoose = require('mongoose');

async function main() {
  const uri = 'mongodb://127.0.0.1:27017/manueltech';
  
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;

    console.log('=== company_info collection (ALL docs) ===');
    const docs = await db.collection('company_info').find().toArray();
    if (docs.length === 0) {
      console.log('  EMPTY!');
    } else {
      docs.forEach(doc => {
        console.log(JSON.stringify(doc, null, 2));
      });
    }

    console.log('\n=== services (first doc full) ===');
    const svc = await db.collection('services').findOne({});
    console.log(JSON.stringify(svc, null, 2));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

main();
