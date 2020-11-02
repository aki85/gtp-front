export const githubOAuth = async () => {
  window.OAuth.initialize(process.env.REACT_APP_OAUTH_API_KEY)
  const provider = await window.OAuth.popup('github')
  return await provider.me()
}