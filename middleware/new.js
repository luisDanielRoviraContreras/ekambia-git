export default function ({ app, redirect, req }) {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  if (!app.$cookies.get('old') && /mobile/i.test(userAgent)) {
    return redirect('/login/new/')
  }
}
