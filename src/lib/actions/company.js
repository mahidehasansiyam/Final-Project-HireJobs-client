'use server';

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";


export const createCompany = async (newCompanyData) => {
  return serverMutation("/api/companies",newCompanyData)
}

export const updateCompany = async (companyId, updatedCompanyData) => {
  const result = await serverMutation(`/api/companies/${companyId}`, updatedCompanyData, "PATCH");
  revalidatePath('/dashboard/admin/companies');
  return result;
}

// const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
// export async function createCompany(newCompanyData) {
//   const res = await fetch(`${serverUrl}/api/companies`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newCompanyData),
//   });
//   return res.json();
// }


