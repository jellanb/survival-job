import { Agenda } from 'agenda'
import dotenv from 'dotenv'
import request from 'request'

dotenv.config();

const connectionString = process.env.MONGOCNSTRING
const urlUpdateKill = process.env.URLUPDATEUNIQUE

const agenda = new Agenda({ db: { address: connectionString!, options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
}}})

agenda.define('update unique kills', async () => {
    await makeUpdateUniqueKills()
});
(async function () {
    await agenda.start();
    await agenda.every('1 minutes', 'update unique kills');
})();

async function makeUpdateUniqueKills() {
    await request.post(urlUpdateKill!, async ( req, res ) => {
        if (res.statusCode === 200) {
            console.log('call update kill uniques!', new Date(Date.now()))
        }else  {
            console.log('have error in update uniques!')
        }
    })
}
