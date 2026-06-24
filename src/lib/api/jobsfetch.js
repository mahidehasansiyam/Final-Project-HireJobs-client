import { serverFetch } from "../core/server";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllJobs = async () => {
  return serverFetch("/api/jobs")
}

export const getJobById = async (jobid) => {
  return serverFetch(`/api/jobs/${jobid}`);
};

export const getCompanyJobs = async (companyId,status="active") => { 
  const res = await fetch(`${serverUrl}/api/jobs?companyId=${companyId}&status=${status}`);
  return res.json();
}