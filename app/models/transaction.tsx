
export interface Transaction {
    transaction_id: number;
    owner_id: string;
    label: string;
    amount: number;
    category?: string;
    date?: Date;
    endDate?: Date;
    isReccuring: boolean;
};
