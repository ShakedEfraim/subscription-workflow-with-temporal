import {log} from "@temporalio/activity"
import {Customer} from "./shared"

export async function sendWelcomeEmail(customer: Customer){
    log.info(`Sending welcome email to ${customer.email}`);
}
export async function sendCancellationEmailDuringTrialPeriod(customer: Customer) {
    log.info(`Sending trial cancellation email to ${customer.email}`);
}
export async function chargeCustomerForBillingPeriod(customer: Customer, chargeAmount: number) {
    log.info(
        `Charging ${customer.email} amount ${chargeAmount} for their billing period`
    );
}
export async function sendSubscriptionFinishedEmail(customer: Customer) {
    log.info(`Sending subscription completed email to ${customer.email}`);
}
export async function sendSubscriptionOverEmail(customer: Customer) {
    log.info(`Sending subscription over email to ${customer.email}`);
}