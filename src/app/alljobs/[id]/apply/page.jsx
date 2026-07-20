import { getJobById } from '@/lib/api/jobsfetch';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import ApplyJob from './ApplyJob';
import { getApplicationsByApplicantId } from '@/lib/api/application';
import Link from 'next/link';
import { TriangleExclamationFill, ThunderboltFill } from '@gravity-ui/icons';
import { getPlansById } from '@/lib/api/plans';

const Apply = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  
  // Check if user is logged in
  if (!user) {
    redirect(`/auth/login?redirect=/alljobs/${id}/apply`);
  }

  // Unauthorized State (Not a Seeker)
  if (user.role !== 'seeker') {
    return (
      <main className="min-h-screen bg-[#090a0b] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#121315] border border-white/[0.06] rounded-2xl p-8 text-center shadow-xl flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <TriangleExclamationFill width={24} height={24} />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Access Denied</h2>
          <p className="text-sm text-[#71717a] leading-relaxed">
            You are not authorized to apply for jobs. Please log in with a job
            seeker account to proceed.
          </p>
          <Link
            href="/auth/login"
            className="mt-2 w-full py-2.5 bg-white text-black font-semibold rounded-xl text-sm hover:bg-white/90 transition-all text-center"
          >
            Switch Account
          </Link>
        </div>
      </main>
    );
  }

  // Get Applicant Applications
  const applications = await getApplicationsByApplicantId(user.id);   
  
  // get user plan details
  const plan = await getPlansById(user.plan || "seeker-free");

  const job = await getJobById(id);
  const maxApps = plan?.maxApplicationsPerMonth ?? 3;
  const remainingApplications = maxApps - applications.length;

  return (
    <main className="min-h-screen bg-[#090a0b] text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* ================= USAGE LIMIT METRIC PANEL ================= */}
        <div className="w-full bg-[#121315] border border-white/[0.06] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold bg-[#2563eb]/10 text-[#3b82f6] px-2.5 py-0.5 rounded-full border border-[#2563eb]/20 uppercase tracking-wider">
                {plan?.name || 'Free'}
              </span>
              <span className="text-xs text-[#52525b]">Monthly Usage</span>
            </div>
            <h2 className="text-sm text-[#a1a1aa] mt-1">
              You have used{' '}
              <span className="text-white font-bold">
                {applications.length}
              </span>{' '}
              out of{' '}
              <span className="text-white font-bold">
                {maxApps}
              </span>{' '}
              monthly applications.
            </h2>
          </div>

          {/* Visual Mini Progress Circle Indicator */}
          <div className="text-xs text-[#71717a] shrink-0 font-medium">
            {remainingApplications > 0 ? (
              <span>{remainingApplications} applications left</span>
            ) : (
              <span className="text-[#f43f5e]">Limit reached</span>
            )}
          </div>
        </div>

        {/* ================= RENDER CONDITIONAL VIEWS ================= */}
        {applications.length >= maxApps ? (
          /* MAX APPLICATIONS EXCEEDED BLOCK */
          <div className="w-full bg-[#121315] border border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-xl text-center flex flex-col items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#2563eb]/10 border border-[#2563eb]/20 flex items-center justify-center text-[#3b82f6]">
              <ThunderboltFill width={22} height={22} />
            </div>
            <div className="flex flex-col gap-2 max-w-md">
              <h3 className="text-xl font-bold tracking-tight">
                Upgrade Required
              </h3>
              <p className="text-sm text-[#71717a] leading-relaxed">
                You have reached the maximum number of applications for this
                month. Update your plan to continue applying for jobs and unlock
                premium features.
              </p>
            </div>
            <Link
              href="/planes"
              className="mt-2 px-6 py-2.5 bg-[#2563eb] text-white text-xs font-semibold rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-900/20"
            >
              Upgrade Plan
            </Link>
          </div>
        ) : (
          /* ALLOWED TO APPLY CONTAINER */
          <ApplyJob applicant={user} job={job} />
        )}
      </div>
    </main>
  );
};

export default Apply;
