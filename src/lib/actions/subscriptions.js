"use server";

import { serverMutation } from "../core/server";

export const submitSubscription = async (subscriptionData) => {
  return serverMutation("/api/subscriptions",subscriptionData)
}