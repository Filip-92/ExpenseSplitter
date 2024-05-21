export interface Spending {
    [x: string]: any;
    id: number;
    amount: number;
    expenseId: number;
    categoryId: number;
    whoPaid: string;
    whoOwes: string;
}