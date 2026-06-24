import { redirect } from 'next/navigation';
import { Button } from '@heroui/react';
import { Check, Envelope, Hand, ArrowRight } from '@gravity-ui/icons';
import Link from 'next/link';
import { stripe } from '@/lib/stripe';
import { submitSubscription } from '@/lib/actions/subscriptions';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    // update user plan in database
    const subscriptionInfo = {
      email: customerEmail,
      planId: metadata.planId,
    }
    // call server action to update user plan
    const result = await submitSubscription(subscriptionInfo);
    console.log(result);
    
    return (
      <main className="min-h-screen bg-[#090a0b] text-white py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-xl bg-[#121315] border border-white/[0.06] rounded-2xl p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 w-72 h-72 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Animated Success Check Ring */}
          <div className="w-16 h-16 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] mb-6 shadow-lg shadow-[#10b981]/5 animate-fade-in">
            <Check width={28} height={28} />
          </div>

          {/* Heading Statements */}
          <header className="flex flex-col gap-2 mb-8">
            <span className="text-[10px] text-[#10b981] uppercase font-bold tracking-widest bg-[#10b981]/10 px-3 py-1 rounded-full border border-[#10b981]/20 w-fit mx-auto">
              Payment Successful
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mt-3">
              Thank you for your order!
            </h1>
            <p className="text-sm text-[#71717a] max-w-sm mx-auto leading-relaxed mt-1">
              We appreciate your business. Your premium workspace privileges and
              features have been securely activated.
            </p>
          </header>

          <hr className="w-full border-white/[0.06] mb-8" />

          {/* Detailed Transaction Info Cards */}
          <div className="w-full flex flex-col gap-3.5 mb-10">
            {/* Info Item 1: Email Receipt Destination */}
            <div className="bg-[#18191b] border border-white/[0.04] rounded-xl p-4 flex items-center gap-4 text-left shadow-inner">
              <div className="text-[#71717a] bg-[#090a0b] p-2 rounded-lg border border-white/[0.04]">
                <Envelope width={16} height={16} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-[#52525b] uppercase tracking-wider">
                  Confirmation Sent To
                </span>
                <span className="text-sm font-medium text-white/90 break-all">
                  {customerEmail}
                </span>
              </div>
            </div>

            {/* Info Item 2: Customer Support Channels */}
            <div className="bg-[#18191b] border border-white/[0.04] rounded-xl p-4 flex items-center gap-4 text-left shadow-inner">
              <div className="text-[#71717a] bg-[#090a0b] p-2 rounded-lg border border-white/[0.04]">
                <Hand width={16} height={16} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-[#52525b] uppercase tracking-wider">
                  Have Questions?
                </span>
                <span className="text-sm text-[#a1a1aa]">
                  Reach out instantly via{' '}
                  <a
                    href="mailto:example@gmail.com"
                    className="text-white font-medium hover:underline transition-all"
                  >
                    example@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* 🌟 FIX: Wrap the Button in standard Next.js Link instead of as={Link} */}
          <Link href="/alljobs" className="w-full">
            <Button className="w-full bg-white hover:bg-white/90 text-black font-semibold text-sm h-12 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5">
              Go to Jobs Page
              <ArrowRight width={16} height={16} />
            </Button>
          </Link>
        </div>
      </main>
    );
  }
}
