export default function({ $passwordProtect, route, app, redirect }) {
  $passwordProtect.registerRedirectCallback(opts => {
    const localePath = app.localePath('password')

    if (route.path === localePath) {
      return
    }

    return redirect(localePath, { previousPath: route.fullPath })
  })
}
