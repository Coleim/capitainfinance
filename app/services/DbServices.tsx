import { Database } from '../database/database';
import * as Crypto from 'expo-crypto';

const db = new Database("captainFinance.db");

export namespace database {

    export interface Transaction {
        transaction_id: number;
        owner_id: string;
        label: string;
        amount: number;
        category: string;
        date: Date | null;
        endDate: Date | null;
        isReccuring: boolean;
    };


    export interface RecurringTransaction {
        transaction_id: number;
        owner_id: string;
        label: string;
        amount: number;
        category: string;
        startDate: Date | null;
        endDate: Date | null;
    };

    export interface DailyTransaction {
        transaction_id: number;
        owner_id: string;
        label: string;
        amount: number;
        category: string;
        date: Date;
    };

    export const CloseDb = () => {
        db.close();
    }

    export const CreateDatabase = async () => {
        console.log("CreateDatabase lol")
        await db.transaction(async connection => {
            await connection.execute(
                `DROP TABLE recurring;`
            );
            await connection.execute(
                `DROP TABLE daily_transactions;`
            );
            await connection.execute(
                `CREATE TABLE IF NOT EXISTS recurring (
                    transaction_id TEXT PRIMARY KEY NOT NULL,
                    owner_id TEXT NOT NULL,
                    label TEXT NOT NULL,
                    amount REAL NOT NULL,
                    category TEXT NOT NULL,
                    startDate TEXT NULL,
                    endDate TEXT NULL
                  );`
            );

            
            await connection.execute(
                `CREATE TABLE IF NOT EXISTS daily_transactions (
                    transaction_id TEXT PRIMARY KEY NOT NULL,
                    owner_id TEXT NOT NULL,
                    label TEXT NOT NULL,
                    amount REAL NOT NULL,
                    category TEXT NOT NULL,
                    date TEXT NOT NULL
                  );`
            );


            let UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Salaire Clement', '3100', 'SALARY', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Salaire Sybille', '1700', 'SALARY', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'CAF Mi temps', '297', 'ALLOC', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'CAF Nounou', '188', 'ALLOC', null, null) `);


            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Croatie', '-295', 'Credit', "2023-01-01", "2023-06-01") `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Credit appart', '-1340', 'Credit', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Astria', '-93', 'Credit', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Moto', '-171', 'Credit', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Clim', '-97', 'Credit', null, null) `);

            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Famileo', '-6', 'Loisir', null, null) `); // 1
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Famileo', '-6', 'Loisir', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Famileo', '-6', 'Loisir', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Nounou', '-710', 'Enfants', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Assurance auto Sybille', '-63', 'Véhicules', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Assurance auto Clément', '-198', 'Véhicules', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Chauffage', '-14.53', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Syndic', '-131', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Assurance pret', '-37', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Eau', '-50', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'EDF', '-160', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Croix rouge', '-15', 'Autre', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Taxe habitation', '-62', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Disney+', '-9', 'Loisir', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Internet', '-45', 'Maison', null, null) `);

            
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Nourriture', '-400', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', 'Epargne', '-400', 'Maison', null, null) `);



            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions VALUES( '${UUID}', '123', "2023-04-03", 'Chez Max', '-46.80', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions VALUES( '${UUID}', '123', "2023-04-03", 'Amazon', '-14.11', 'Amazon') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions VALUES( '${UUID}', '123', "2023-04-03", 'Carrefour', '-93.09', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions VALUES( '${UUID}', '123', "2023-04-03", 'Pharmacie', '-28.99', 'Santé') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions VALUES( '${UUID}', '123', "2023-04-03", 'McDo', '-45.20', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions VALUES( '${UUID}', '123', "2023-04-04", 'Super U', '-10.14', 'Nourriture') `);
            
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions VALUES( '${UUID}', '123', "2023-04-04", 'Super U', '-7.40', 'Nourriture') `);


        });
        console.log("CreateDatabase end")
    }
    
    export const HasRecurringTable = async () => {
        console.log("HasRecurringTable start")
        let returnVal = false;
        await db.transaction(async connection => {
            const res = await connection.execute(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='recurring';`);
            console.log("Count: " , res.rows.at(0)["count(*)"])
            returnVal = (res.rows.at(0)["count(*)"] > 0);
        });
        console.log("returnVal: ", returnVal)
        console.log("HasRecurringTable end")
        return returnVal;
    }

    export const HasRecurringTransactions = async () => {
        console.log(">> HasRecurringTransactions ")
        const res = await db.execute('select count(*) from recurring;');
        console.log("Count: " , res.rows.at(0)["count(*)"])
        return (res.rows.at(0)["count(*)"] > 0);
    }

    export const GetRecurringTransactions = async () => {
        console.log(">> GetRecurringTransactions ")
        let resArray = [];
        await db.transaction(async connection => {
            const res = await connection.execute('select transaction_id, owner_id, label, amount, category, startDate, endDate from recurring;');
            resArray = res.rows.map(result => {
                let recTrans: RecurringTransaction = {
                    transaction_id: result.transaction_id,
                    owner_id: result.owner_id,
                    label: result.label,
                    amount: Number(result.amount),
                    category: result.category,
                    startDate: result.startDate ? new Date(result.startDate) : null,
                    endDate: result.endDate ? new Date(result.endDate) : null
                }
                return recTrans;
            });
        });
        return resArray;
    }

    export const UpdateRecurringTransactions = async (transaction_id, label, amount, category) => {
        console.log("> UpdateRecurringTransactions ", transaction_id)
        if(transaction_id) {
            await db.transaction(async connection => {
                await connection.execute(`UPDATE recurring SET label = ?, amount = ?, category = ? WHERE transaction_id = ? ;`, 
                    [label, amount, category, transaction_id]);
            });
        } else {
            await db.transaction(async connection => {
                const UUID = Crypto.randomUUID();
                await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', ?, ?, ?, null, null) `, [ label, amount, category]);
            });
        }        
    }

    
    export const GetRemainingMonthlyAmount = async () => {
        console.log(">> GetRemainingMonthlyAmount")
        let remainingMonthlyAmount = 0;
        await db.transaction(async connection => {
            const res = await connection.execute(`SELECT amount FROM recurring ;`);
            res.rows.forEach(row => {
                remainingMonthlyAmount += Number(row.amount)
            });
        });
        return remainingMonthlyAmount.toFixed(2);
    }

    export const GetDailyAmount = async () => {
        console.log(">> GetDailyAmount")

        let remainingMonthlyAmount = [];
        await db.transaction(async connection => {
            const res = await connection.execute(`SELECT date, SUM(amount) as amount FROM daily_transactions GROUP BY date ORDER BY date ;`);
            console.log(res)
            res.rows.forEach(row => {
                remainingMonthlyAmount.push({
                    date: new Date(row.date),
                    amount: Number(row.amount)
                });
            });
        });

        return remainingMonthlyAmount;
    }

    
    export const GetDailyTransactions = async () => {
        console.log(">> GetDailyTransactions")

        let dailyTransactions = [];
        await db.transaction(async connection => {

            const res = await connection.execute(`SELECT transaction_id, owner_id, date, amount, label, category FROM daily_transactions ORDER BY date DESC ;`);
            console.log(res)
            res.rows.forEach(row => {
                let trans: DailyTransaction = {
                    transaction_id: row.transaction_id,
                    owner_id: row.owner_id,
                    label: row.label,
                    amount: Number(row.amount),
                    category: row.category,
                    date: new Date(row.date)
                };
                dailyTransactions.push(trans);
            });
        });
        return dailyTransactions;
    }

    export const DeleteRecurringTransactions = async (transaction_id) => {
        console.log(">> DeleteRecurringTransactions")
        await db.transaction(async connection => {
            const res = await connection.execute(`DELETE FROM recurring WHERE transaction_id = ? ;`, [ transaction_id ]);
            console.log(res)
        });
    }

    

    




}