import { logout } from '../actions'

export async function POST() {
  await logout()
}
