export interface Expense {
    [x: string]: any;
    id: number;
    name: string;
    amount: number;
    categoryId: number;
    whoPaid: string;
}