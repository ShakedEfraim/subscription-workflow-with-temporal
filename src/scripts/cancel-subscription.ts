const customer: Customer = {
    firstName: "Grant",
    lastName: "Fleming",
    email: "email-1@customer.com",
    subscription: {
        trialPeriod: 2000,
        billingPeriod: 2000,
        maxBillingPeriods: 12,
        initialBillingPeriodCharge: 100,
    },
    id: "ABC123",
};

import { Connection, Client } from "@temporalio/client";
import { subscriptionWorkflow, cancelSubscription } from "../workflows";
import { TASK_QUEUE_NAME, Customer } from "../shared";

async function run() {
    const connection = await Connection.connect({ address: "localhost:7233" });
    const client = new Client({
        connection,
    });
    const subscriptionWorkflowExecution = await client.workflow.start(
        subscriptionWorkflow,
        {
            args: [customer],
            taskQueue: TASK_QUEUE_NAME,
            workflowId: `subscription-${customer.id}`,
        }
    );
    console.log(await subscriptionWorkflowExecution.result());
    const handle = await client.workflow.getHandle(`subscription-${customer.id}`);
    await handle.signal(cancelSubscription);
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});