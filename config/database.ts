import { Dialect, PoolOptions } from 'sequelize'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { DialectValues } from '../utils/enums'
import 'dotenv/config'

const dbConfig = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: DialectValues.POSTGRES,
}

const poolConfig: PoolOptions = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
}

const dbOptions: SequelizeOptions = {
  host: dbConfig.host,
  dialect: dbConfig.dialect as Dialect,
  pool: {
    max: poolConfig.max,
    min: poolConfig.min,
    acquire: poolConfig.acquire,
    idle: poolConfig.idle,
  },
  logQueryParameters: true,
  define: {
    freezeTableName: true,
  },
}

export const dbSequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbOptions
)
