import { ProfilePage } from "@/modules/user/pages/profile"

export default function Profile({ params }: { params: { username: string } }) {
  return <ProfilePage username={params.username} />
}
