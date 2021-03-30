export default function ({ store, route, redirect }) {
  // If the user is not authenticated
  if (! store.state.auth.user) {
    return redirect('/users/sign_in', { r: route.path })
  }
}
