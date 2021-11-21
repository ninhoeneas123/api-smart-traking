import * as dotenv from 'dotenv'
dotenv.config()

export const jwtConstants = {
	JWT_SECRET: process.env.JWT_SECRET,
	EXPIRES_IN: process.env.EXPIRES_IN,
}