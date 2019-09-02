const { Application } = require('probot')
// Requiring our app implementation
const myProbotApp = require('..')

const deploymenyPayload = require('./fixtures/deployments.json')

describe('My Probot app', () => {
  let app, github

  beforeEach(() => {
    app = new Application()
    // Initialize the app based on the code from index.js
    app.load(myProbotApp)
    // This is an easy way to mock out the GitHub API
    github = {
      repos: {
        createDeploymentStatus: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    }
    // Passes the mocked out GitHub API into out app instance
    app.auth = () => Promise.resolve(github)
  })

  test('creates a deployment when an PR is opened', async () => {
    // Simulates delivery of an issues.opened webhook
    await app.receive({
      name: 'deployment',
      payload: deploymenyPayload
    })

    // This test passes if the code in your index.js file calls `context.github.issues.createComment`
    expect(github.repos.createDeploymentStatus).toHaveBeenCalled()
  })
})

// For more information about testing with Jest see:
// https://facebook.github.io/jest/
