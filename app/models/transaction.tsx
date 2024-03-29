
export interface Transaction {
    transaction_id: string;
    owner_id: string;
    label: string;
    amount: number;
    category: string;
    date?: Date;
    endDate?: Date;
    month?: number;
    fullYear?: number;
    isReccuring: boolean;
};
