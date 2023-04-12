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
        endDate?: Date;
        isReccuring: boolean;
    };


    // export interface RecurringTransaction {
    //     transaction_id: number;
    //     owner_id: string;
    //     label: string;
    //     amount: number;
    //     category: string;
    //     startDate: Date | null;
    //     endDate: Date | null;
    // };

    // export interface DailyTransaction {
    //     transaction_id: number;
    //     owner_id: string;
    //     label: string;
    //     amount: number;
    //     category: string;
    //     date: Date;
    // };

    export const CloseDb = () => {
        db.close();
    }

    export const CreateDatabase = async () => {
        await db.transaction(async connection => {
            await connection.execute(
                `DROP TABLE IF EXISTS recurring;`
            );
            await connection.execute(
                `DROP TABLE IF EXISTS daily_transactions;`
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
            
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Salaire Clement', '3100', 'SALARY', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Salaire Sybille', '1700', 'SALARY', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'CAF Mi temps', '297', 'ALLOC', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'CAF Nounou', '188', 'ALLOC', null, null) `);


            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Croatie', '-295', 'Credit', "2023-01-01", "2023-06-01") `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Credit appart', '-1340', 'Credit', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Astria', '-93', 'Credit', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Moto', '-171', 'Credit', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Clim', '-97', 'Credit', null, null) `);

            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Famileo', '-6', 'Loisir', null, null) `); // 1
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Famileo', '-6', 'Loisir', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Famileo', '-6', 'Loisir', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Nounou', '-710', 'Enfants', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Assurance auto Sybille', '-65', 'Véhicules', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Assurance auto Clément', '-198', 'Véhicules', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'ENGIE Home Service', '-14.53', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Syndic', '-131', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Assurance pret', '-37', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Eau', '-50', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'EDF', '-160', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Croix rouge', '-15', 'Autre', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Taxe habitation', '-62', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Disney+', '-9', 'Loisir', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Internet', '-45', 'Maison', null, null) `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'PEL', '-45', 'Maison', null, null) `);

            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Epargne', '-400', 'Maison', null, null) `);


            /////////////////////////////////////////


            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-03", 'Chez Max', '-46.80', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-03", 'Amazon', '-14.11', 'Amazon') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-03", 'Carrefour', '-93.09', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-03", 'Pharmacie', '-28.99', 'Santé') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-03", 'McDo', '-45.20', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-04", 'Super U', '-10.14', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-04", 'Amazon', '-16.99', 'Amazon') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-04", 'Amazon', '-16.99', 'Amazon') `);
            
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-05", 'Super U', '-7.40', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-05", 'Chevaliers', '-52', 'Loisir') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-05", 'Amazon', '-49.90', 'Amazon') `);

            
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-06", 'Cheque', '-8.00', 'Cheque') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-06", 'Casino', '-1.98', 'Nourriture') `);

            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Loutfi', '-9.07', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Boulangerie', '-18.20', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Casino', '-12.59', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Carfeour', '-9.59', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Interets debiteurs', '-0.03', 'Banque') `);

            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Kiabi', '-38.50', 'Habits') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Casino', '-10.86', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Blaimont', '-75.00', 'Santé') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Kiabi', '-7.00', 'Habits') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Carrefour', '-9.14', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Pharmacie', '-29.49', 'Santé') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Cinéma', '-15.99', 'Loisir') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Cinéma', '-13.70', 'Loisir') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Carrefour', '-116.74', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Snack People', '-28.00', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Casino', '-13.40', 'Nourriture') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Escota', '-16.80', 'Vehicules') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Escota', '-16.80', 'Vehicules') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Escota', '-8.80', 'Vehicules') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Escota', '-8.70', 'Vehicules') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Amazon', '-3.28', 'Amazon') `);
            UUID = Crypto.randomUUID();
            await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Super U', '-9.65', 'Nourriture') `);
        });
    }
    
    export const HasRecurringTable = async () => {
        let returnVal = false;
        await db.transaction(async connection => {
            const res = await connection.execute(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='recurring';`);
            returnVal = (res.rows.at(0)["count(*)"] > 0);
        });
        return returnVal;
    }

    export const HasRecurringTransactions = async () => {
        const res = await db.execute('select count(*) from recurring;');
        return (res.rows.at(0)["count(*)"] > 0);
    }

    export const GetRecurringTransactions = async () => {
        let resArray = [];
        await db.transaction(async connection => {
            const res = await connection.execute('select transaction_id, owner_id, label, amount, category, startDate, endDate from recurring;');
            resArray = res.rows.map(result => {
                let recTrans: Transaction = {
                    transaction_id: result.transaction_id,
                    owner_id: result.owner_id,
                    label: result.label,
                    amount: Number(result.amount),
                    category: result.category,
                    date: result.startDate ? new Date(result.startDate) : null,
                    endDate: result.endDate ? new Date(result.endDate) : undefined,
                    isReccuring: true
                }
                return recTrans;
            });
        });
        return resArray;
    }

    export const UpdateRecurringTransactions = async (transaction_id, label, amount) => {
        if(transaction_id) {
            await db.transaction(async connection => {
                await connection.execute(`UPDATE recurring SET label = ?, amount = ? WHERE transaction_id = ? ;`, 
                    [label, amount, category, transaction_id]);
            });
        } else {
            await db.transaction(async connection => {
                const UUID = Crypto.randomUUID();
                await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', ?, ?, 'OTHER', null, null) `, [ label, amount]);
            });
        }        
    }

    
    export const GetRemainingMonthlyAmount = async () => {
        let remainingMonthlyAmount = 0;
        await db.transaction(async connection => {
            const res = await connection.execute(`SELECT amount FROM recurring ;`);
            res.rows.forEach(row => {
                remainingMonthlyAmount += Number(row.amount)
            });
        });
        return remainingMonthlyAmount.toFixed(2);
    }

    export const GetMonthlyAmountSpent = async () => {
        let monthlyAmountSpent = 0;
        await db.transaction(async connection => {
            const res = await connection.execute(`SELECT amount FROM daily_transactions ;`);
            res.rows.forEach(row => {
                monthlyAmountSpent += Number(row.amount)
            });
        });
        return monthlyAmountSpent.toFixed(2);
    }

    export const GetDailyAmount = async () => {
        let remainingMonthlyAmount = [];
        await db.transaction(async connection => {
            const res = await connection.execute(`SELECT date, SUM(amount) as amount FROM daily_transactions GROUP BY date ORDER BY date ;`);
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
        let dailyTransactions = [];
        await db.transaction(async connection => {

            const res = await connection.execute(`SELECT transaction_id, owner_id, date, amount, label, category FROM daily_transactions ORDER BY date DESC ;`);
            res.rows.forEach(row => {
                let trans: Transaction = {
                    transaction_id: row.transaction_id,
                    owner_id: row.owner_id,
                    label: row.label,
                    amount: Number(row.amount),
                    category: row.category,
                    date: row.date ? new Date(row.date) : null,
                    isReccuring: false
                };
                dailyTransactions.push(trans);
            });
        });
        return dailyTransactions;
    }

    export const DeleteRecurringTransactions = async (transaction_id) => {
        await db.transaction(async connection => {
            const res = await connection.execute(`DELETE FROM recurring WHERE transaction_id = ? ;`, [ transaction_id ]);
        });
    }

    

    




}