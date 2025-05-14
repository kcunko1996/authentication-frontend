"use server";

import { api } from "@/utils/api";

export async function getUsers() {
  const { data, error } = await api.get<{
    mesg: string;
  }>("/users");

  return { data, error };
}
