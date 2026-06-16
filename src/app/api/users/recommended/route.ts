import { apiOk } from "@/lib/api";
import { currentUser, profiles } from "@/lib/mock-data";

export async function GET() {
  return apiOk({
    users: profiles.filter((profile) => profile.id !== currentUser.profile.id)
  });
}
