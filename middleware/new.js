export default function ({ app, redirect, req }) {
  // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  // if (!app.$cookies.get('old') && /mobile/i.test(userAgent)) {
  if (!app.$cookies.get('old')) {
    return redirect('/login/new')
  }
}
