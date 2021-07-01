export default function ({ store, route, redirect }) {
  // If the user is authenticated
  if (store.state.auth.user) {
    return redirect('/')
  }
}
