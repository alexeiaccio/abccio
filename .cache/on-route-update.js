module.exports = location => {
  if (!maybeRedirect(location.pathname)) {
    // Check if we already ran onPreRouteUpdate API
    // in navigateTo function
    if (
      lastNavigateToLocationString !==
      `${location.pathname}${location.search}${location.hash}`
    ) {
      apiRunner(`onPreRouteUpdate`, { location })
    }
    // Make sure React has had a chance to flush to DOM first.
    setTimeout(() => {
      console.log(`globalHistory after setTimeout`, { location })
      apiRunner(`onRouteUpdate`, { location })
    }, 0)
  }
}
