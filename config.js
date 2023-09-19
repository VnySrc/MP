import dotenv from 'dotenv'

dotenv.config()

const config = {
    PORT: process.env.PORT,
    MP_TOKEN: process.env.MP_ACESS_TOKEN,
}

export default config