"use server";

import { serverMutation } from "../core/server";

export const createJob = async (newJobData) => {
  return serverMutation('/api/jobs',newJobData);
}

// const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
// export async function createJob(newJobData) {
//   const res = await fetch(`${serverUrl}/api/jobs`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newJobData),
//   });
//   return res.json();
  
// }