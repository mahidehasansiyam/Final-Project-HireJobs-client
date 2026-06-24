import 'server-only';

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const PLANE_PRICE_ID = {
  'seeker-pro': 'price_1TkLtXFeqwq8vJ1yTT0v2ucy',
  'seeker-premium': 'price_1TkNPgFeqwq8vJ1y849m1Shc',
  'recruiter-growth': 'price_1TkNQQFeqwq8vJ1ym9H1TP4H',
  'recruiter-enterprise': 'price_1TkNQvFeqwq8vJ1yFGpknrrP',
};