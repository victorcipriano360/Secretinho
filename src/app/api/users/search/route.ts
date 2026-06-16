import { apiOk } from "@/lib/api";
import { searchProfiles } from "@/lib/mock-data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";

  return apiOk({
    users: searchProfiles(query)
  });
}
