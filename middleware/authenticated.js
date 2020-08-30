export default function ({ app, redirect }) {
  if (!app.$cookies.get('authenticated')) {
    return redirect('/login/')
  }
}
