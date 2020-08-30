export default function ({ app, redirect }) {
  if (!app.$cookies.get('old')) {
    return redirect('/login/new/')
  }
}
