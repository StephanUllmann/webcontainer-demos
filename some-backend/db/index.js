import chalk from 'chalk';
import mongoose from 'mockgoose';

try {
  const mongo = await mongoose.connect(process.env.MONGO_URI, {
    dbName: 'library',
  });
  console.log(chalk.cyan(`DB Verbindung: ${mongo.connection.name}`));
} catch (error) {
  console.log(error);
  process.exit(1);
}
