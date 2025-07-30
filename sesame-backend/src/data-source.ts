import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'BEI1202jing',
  database: 'sesame',
  synchronize: false,
  logging: false,
  entities: [__dirname + '/**/models/*.entity{.ts,.js}'],
  subscribers: [],
  migrations: [__dirname + '/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
