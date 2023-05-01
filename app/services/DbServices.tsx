// import { Database } from '../database/database';
// import * as Crypto from 'expo-crypto';
// import { date } from './DateAsString';

// const db = new Database("captainFinance.db");

// export namespace database {

//     export interface Transaction {
//         transaction_id: number;
//         owner_id: string;
//         label: string;
//         amount: number;
//         category?: string;
//         date: Date | null;
//         endDate?: Date;
//         isReccuring: boolean;
//     };


//     // export interface RecurringTransaction {
//     //     transaction_id: number;
//     //     owner_id: string;
//     //     label: string;
//     //     amount: number;
//     //     category: string;
//     //     startDate: Date | null;
//     //     endDate: Date | null;
//     // };

//     // export interface DailyTransaction {
//     //     transaction_id: number;
//     //     owner_id: string;
//     //     label: string;
//     //     amount: number;
//     //     category: string;
//     //     date: Date;
//     // };

//     export const CloseDb = () => {
//         db.close();
//     }

//     export const CreateDatabase = async () => {
//         console.log("CreateDatabase");

//         await db.transaction(async connection => {

//             await connection.execute(
//                 `DROP TABLE IF EXISTS version;`
//             );
//             await connection.execute(
//                 `DROP TABLE IF EXISTS recurring;`
//             );
//             await connection.execute(
//                 `DROP TABLE IF EXISTS daily_transactions;`
//             );
//             await connection.execute(
//                 `CREATE TABLE IF NOT EXISTS version (
//                     version INTEGER PRIMARY KEY NOT NULL,
//                     date TEXT NOT NULL
//                 );`
//             );
//             await connection.execute(
//                 `CREATE TABLE IF NOT EXISTS recurring (
//                     transaction_id TEXT PRIMARY KEY NOT NULL,
//                     owner_id TEXT NOT NULL,
//                     label TEXT NOT NULL,
//                     amount REAL NOT NULL,
//                     category TEXT NOT NULL,
//                     startDate TEXT NULL,
//                     endDate TEXT NULL
//                   );`
//             );

//             await connection.execute(
//                 `CREATE TABLE IF NOT EXISTS daily_transactions (
//                     transaction_id TEXT PRIMARY KEY NOT NULL,
//                     owner_id TEXT NOT NULL,
//                     label TEXT NOT NULL,
//                     amount REAL NOT NULL,
//                     category TEXT NOT NULL,
//                     date TEXT NOT NULL
//                   );`
//             );

//             // insert version from file

//             let UUID = Crypto.randomUUID();
            
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Salaire Clement', '3100', 'SALARY', null, null) `);
//             // => 5 227,85
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Salaire Sybille', '1700', 'SALARY', null, null) `);
//             // => 1 759,39
//             // => 30,21
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'CAF Mi temps', '297', 'ALLOC', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'CAF Nounou', '188', 'ALLOC', null, null) `);




//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Croatie', '-295', 'Credit', "2023-01-01", "2023-06-30") `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Credit appart', '-1340', 'Credit', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Astria', '-93', 'Credit', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Moto', '-171', 'Credit', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'FranFinance Clim', '-97', 'Credit', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Assurance pret', '-37', 'Credit', null, null) `);

//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Famileo', '-6', 'Loisir', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Famileo', '-6', 'Loisir', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Famileo', '-6', 'Loisir', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Nounou', '-710', 'Enfants', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Cantine', '-120', 'Enfants', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Assurance auto Sybille', '-65', 'Vehicules', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Assurance auto Clément', '-198', 'Vehicules', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'ENGIE Home Service', '-14.53', 'Maison', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Syndic', '-131', 'Maison', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Eau', '-50', 'Maison', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'EDF', '-160', 'Maison', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Croix rouge', '-15', 'Autre', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Taxe habitation', '-62', 'Maison', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Disney+', '-9', 'Loisir', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Internet', '-45', 'Maison', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Telephone', '-9', 'Maison', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'Telephone', '-9', 'Maison', null, null) `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO recurring (transaction_id,owner_id,label,amount,category,startDate,endDate) VALUES( '${UUID}', '123', 'PEL', '-45', 'Epargne', null, null) `);


//             ///////////////////////////////////////


//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-03", 'Chez Max', '-46.80', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-03", 'Amazon', '-14.11', 'Amazon') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-03", 'Carrefour', '-93.09', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-03", 'Pharmacie', '-28.99', 'Santé') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-03", 'McDo', '-45.20', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-04", 'Super U', '-10.14', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-04", 'Amazon', '-16.99', 'Amazon') `);
            
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-05", 'Super U', '-7.40', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-05", 'Chevaliers', '-52', 'Loisir') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-05", 'Amazon', '-49.90', 'Amazon') `);

            
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-06", 'Cheque', '-8.00', 'Cheque') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-06", 'Casino', '-1.98', 'Nourriture') `);

//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Loutfi', '-9.07', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Boulangerie', '-18.20', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Casino', '-12.59', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Carfeour', '-9.59', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Interets debiteurs', '-0.03', 'Banque') `);

//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Kiabi', '-38.50', 'Habits') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Casino', '-10.86', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Blaimont', '-75.00', 'Santé') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Kiabi', '-7.00', 'Habits') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Carrefour', '-9.14', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Pharmacie', '-29.49', 'Santé') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Cinéma', '-15.99', 'Loisir') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Cinéma', '-13.70', 'Loisir') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Carrefour', '-116.74', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Snack People', '-28.00', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Casino', '-13.40', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Escota', '-16.80', 'Vehicules') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Escota', '-16.80', 'Vehicules') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Escota', '-8.80', 'Vehicules') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Escota', '-8.70', 'Vehicules') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-11", 'Amazon', '-3.28', 'Amazon') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-12", 'Super U', '-9.65', 'Nourriture') `);

            
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-13", 'Carrefour', '-9.45', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-13", 'Essence Voiture', '-40.00', 'Vehicules') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-13", 'Essence Voiture', '-84.31', 'Vehicules') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-13", 'Docteur', '-9.00', 'Santé') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-13", 'Essence moto', '-24.82', 'Vehicules') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-13", 'Remboursement Mutuelle', '13.60', 'Santé') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-14", 'Remboursement Mutuelle', '50.15', 'Santé') `);

//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-17", 'Okaidi', '-33.96', 'Habits') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-17", 'Kokubu', '-46.04', 'Loisir') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-17", 'LaPoste', '-7.84', 'LaPoste') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-17", 'Okaidi', '12', 'Habits') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-17", 'Carrefour', '-21.19', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-17", 'Kokubu', '-52.00', 'Loisir') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-17", 'Carrefour', '-20.64', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-17", 'Casino', '-23.07', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-17", 'Casino', '-26.03', 'Nourriture') `);


//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-18", 'CE', '137.80', 'CE') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-18", 'Casino', '-11.82', 'Nourriture') `);


//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-19", 'Pharmacie', '-8.40', 'Sante') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-20", 'Mutuelle', '9.00', 'Sante') `);

//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-21", 'Autoroute', '-16.80', 'Vehicules') `);

//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-24", 'Amazon', '-3.59', 'Amazon') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-24", 'Amazon', '-22.35', 'Amazon') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-24", 'Casino', '-45.91', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-24", 'Autoroute', '-16.80', 'Vehicules') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-24", 'Casino', '-5.98', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-24", 'Pharmacie', '-2.90', 'Sante') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-24", 'Autoroute', '-13.50', 'Vehicules') `);

            
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-25", 'Colle', '-6.90', 'Maison') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-25", 'Carrefour', '-77.20', 'Nourriture') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-25", 'Carrefour', '-8.58', 'Nourriture') `);

            
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-26", 'Autoroute', '-1.70', 'Vehicules') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-26", 'Habits', '-57.60', 'Enfants') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-26", 'Anniversaire Clemence', '-19.90', 'Enfants') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-26", 'Coiffeur', '-23.50', 'Loisir') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-26", 'Anniversaire Zelie', '-27.99', 'Enfants') `);
                        
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-27", 'Habits', '-11.24', 'Enfants') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-27", 'Habits Okaidi', '-18.97', 'Enfants') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-28", 'Leclerc', '-104.12', 'Nourriture') `);

//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-28", 'Cultura', '-66.86', 'Loisir') `);
//             UUID = Crypto.randomUUID();
//             await connection.execute(`INSERT INTO daily_transactions (transaction_id, owner_id, date, label, amount, category) VALUES( '${UUID}', '123', "2023-04-29", 'GIFI', '-15.27', 'Loisir') `);

//         });
//     }
    

//     export const HasVersionTable = async () => {
//         let returnVal = false;
//         await db.transaction(async connection => {
//             const res = await connection.execute(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='version';`);
//             returnVal = (res.rows.at(0)["count(*)"] > 0);
//         });
//         return returnVal;
//     }

//     export const HasRecurringTable = async () => {
//         let returnVal = false;
//         await db.transaction(async connection => {
//             const res = await connection.execute(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='recurring';`);
//             returnVal = (res.rows.at(0)["count(*)"] > 0);
//         });
//         return returnVal;
//     }

//     export const HasRecurringTransactions = async () => {
//         const res = await db.execute('select count(*) from recurring;');
//         return (res.rows.at(0)["count(*)"] > 0);
//     }

//     export const GetRecurringTransactions = async () => {
//         let resArray = [];
//         await db.transaction(async connection => {
//             const res = await connection.execute('select transaction_id, owner_id, label, amount, category, startDate, endDate from recurring;');
//             resArray = res.rows.map(result => {
//                 let recTrans: Transaction = {
//                     transaction_id: result.transaction_id,
//                     owner_id: result.owner_id,
//                     label: result.label,
//                     amount: Number(result.amount),
//                     category: result.category,
//                     date: result.startDate ? new Date(result.startDate) : null,
//                     endDate: result.endDate ? new Date(result.endDate) : undefined,
//                     isReccuring: true
//                 }
//                 return recTrans;
//             });
//         });
//         return resArray;
//     }

//     export const UpdateRecurringTransactions = async (transaction_id, label, amount) => {
//         if(transaction_id) {
//             await db.transaction(async connection => {
//                 await connection.execute(`UPDATE recurring SET label = ?, amount = ? WHERE transaction_id = ? ;`, 
//                     [label, amount, transaction_id]);
//             });
//         } else {
//             await db.transaction(async connection => {
//                 const UUID = Crypto.randomUUID();
//                 await connection.execute(`INSERT INTO recurring VALUES( '${UUID}', '123', ?, ?, 'OTHER', null, null) `, [ label, amount]);
//             });
//         }        
//     }

//     export const UpdateDailyTransaction = async (transaction_id, label, amount) => {
//         if(transaction_id) {
//             await db.transaction(async connection => {
//                 await connection.execute(`UPDATE daily_transactions SET label = ?, amount = ? WHERE transaction_id = ? ;`, 
//                     [label, amount, transaction_id]);
//             });
//         } else {
//             let today = new Date();
//             await db.transaction(async connection => {
//                 const UUID = Crypto.randomUUID();
//                 await connection.execute(`INSERT INTO daily_transactions VALUES( '${UUID}', '123', ?, ?, 'OTHER', ?) `, [ label, amount, date.AsDatabaseString(today)]);
//             });
//         }
//     }

//     export const GetRemainingMonthlyAmount = async () => {
//         let remainingMonthlyAmount = 0;
//         await db.transaction(async connection => {
//             const res = await connection.execute(`SELECT amount FROM recurring ;`);
//             res.rows.forEach(row => {
//                 remainingMonthlyAmount += Number(row.amount)
//             });
//         });
//         return remainingMonthlyAmount.toFixed(2);
//     }

//     export const GetMonthlyAmountSpent = async () => {
//         let monthlyAmountSpent = 0;
//         await db.transaction(async connection => {
//             const firstDay = date.GetFirstDayOfMonth();
//             const lastDay = date.GetLastDayOfMonth();
//             const res = await connection.execute(`SELECT amount FROM daily_transactions WHERE date <= ? and date >= ? ;`, [lastDay, firstDay]);
//             res.rows.forEach(row => {
//                 monthlyAmountSpent += Number(row.amount)
//             });
//         });
//         return monthlyAmountSpent.toFixed(2);
//     }

//     export const GetDailyAmount = async () => {
//         let remainingMonthlyAmount = [];
//         await db.transaction(async connection => {
//             const firstDay = date.GetFirstDayOfMonth();
//             const lastDay = date.GetLastDayOfMonth();
//             const res = await connection.execute(`SELECT date, SUM(amount) as amount FROM daily_transactions WHERE date <= ? and date >= ? GROUP BY date ORDER BY date ;`, [lastDay, firstDay]);
//             res.rows.forEach(row => {
//                 remainingMonthlyAmount.push({
//                     date: new Date(row.date),
//                     amount: Number(row.amount)
//                 });
//             });
//         });
//         return remainingMonthlyAmount;
//     }

//     export const GetDailyTransactions = async () => {
//         let dailyTransactions = [];
//         await db.transaction(async connection => {
//             const firstDay = date.GetFirstDayOfMonth();
//             const lastDay = date.GetLastDayOfMonth();
//             const res = await connection.execute(`SELECT transaction_id, owner_id, date, amount, label, category FROM daily_transactions WHERE date <= ? and date >= ? ORDER BY date DESC ;`, [lastDay, firstDay]);
//             res.rows.forEach(row => {
//                 let trans: Transaction = {
//                     transaction_id: row.transaction_id,
//                     owner_id: row.owner_id,
//                     label: row.label,
//                     amount: Number(row.amount),
//                     category: row.category,
//                     date: row.date ? new Date(row.date) : null,
//                     isReccuring: false
//                 };
//                 dailyTransactions.push(trans);
//             });
//         });
//         return dailyTransactions;
//     }

//     export const DeleteRecurringTransactions = async (transaction_id) => {
//         await db.transaction(async connection => {
//             const res = await connection.execute(`DELETE FROM recurring WHERE transaction_id = ? ;`, [ transaction_id ]);
//         });
//     }

//     export const DeleteDailyTransaction = async (transaction_id) => {
//         await db.transaction(async connection => {
//             const res = await connection.execute(`DELETE FROM daily_transactions WHERE transaction_id = ? ;`, [ transaction_id ]);
//         });
//     }


//     export const GetAmountPerCategory = async () => {
//         let amountPerCategory: never[] = [];
//         await db.transaction(async connection => {
//             const firstDay = date.GetFirstDayOfMonth();
//             const lastDay = date.GetLastDayOfMonth();
//             const res = await connection.execute(`SELECT SUM(amount) as amount_sum, category FROM daily_transactions WHERE date <= ? and date >= ? GROUP BY category ORDER BY amount_sum;`, [lastDay, firstDay]);
//             res.rows.forEach(row => {
//                 amountPerCategory.push({
//                     amount: Number(row.amount_sum),
//                     category: row.category
//                 });
                
//                 console.log(`${row.category} : ${Number(row.amount_sum).toFixed(2)}`);
//             });
//         });
//         console.log("AMOUNT PER CAT: " , amountPerCategory);
//         return amountPerCategory;
//     }

//     export const GetRecurringAmountPerCategory = async () => {
//         let amountPerCategory: never[] = [];
//         await db.transaction(async connection => {
//             const res = await connection.execute(`SELECT SUM(amount) as amount_sum, category FROM recurring GROUP BY category ORDER BY amount_sum;`);
//             res.rows.forEach(row => {
//                 amountPerCategory.push({
//                     amount: Number(row.amount),
//                     category: row.category
//                 });
                
//                 console.log(`${row.category} : ${Number(row.amount_sum).toFixed(2)}`);
//             });
//         });
//         console.log("AMOUNT PER CAT: " , amountPerCategory);
//         return amountPerCategory;
//     }


// }
