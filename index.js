/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.log('Yay, the app was loaded!')

  app.on('status', async context => {
    const {branches, state, target_url, sha, description} = context.payload
    const {owner, repo} = context.repo()


    if (description.includes('Deploy preview ready')) {
      const branch = branches[0].name

      context.github.repos.createDeployment({
        owner,
        repo,
        ref: sha,
        payload: {target_url},
        description,
        environment: branch,
        required_contexts: []
      })
    }
  })

  app.on('deployment', async context => {
    const {id: deployment_id, sha, description, payload} = context.payload.deployment
    const {target_url} = payload
    const {owner, repo} = context.repo()

    context.github.repos.createDeploymentStatus({
      owner, repo,
      deployment_id,
      state: "success",
      target_url,
      environment_url: target_url,
      description
    })
  })

}
