export interface Payment {
    id: number;
    amount: number;
    status: string;
}

export class Payment {
    constructor(paymentData: Payment) {
        this.id = paymentData.id;
        this.amount = paymentData.amount;
        this.status = paymentData.status;
    }
}
