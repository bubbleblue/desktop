import * as chai from 'chai'
const expect = chai.expect

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as TestUtils from 'react-addons-test-utils'

import App from '../src/ui/app'
import { Dispatcher, AppStore, GitHubUserStore, CloningRepositoriesStore } from '../src/lib/dispatcher'
import InMemoryDispatcher from './in-memory-dispatcher'
import TestGitHubUserDatabase from './test-github-user-database'

describe('App', () => {
  let appStore: AppStore | null = null
  let gitHubUserStore: GitHubUserStore | null = null
  let dispatcher: Dispatcher | null = null

  beforeEach(async () => {
    appStore = new AppStore()

    const db = new TestGitHubUserDatabase()
    await db.reset()

    gitHubUserStore = new GitHubUserStore(db)
    dispatcher = new InMemoryDispatcher(appStore, gitHubUserStore, new CloningRepositoriesStore())
  })

  it('renders', () => {
    const app = TestUtils.renderIntoDocument(
      <App dispatcher={dispatcher!} appStore={appStore!} gitHubUserStore={gitHubUserStore!} cloningRepositoriesStore={new CloningRepositoriesStore()}/>
    ) as React.Component<any, any>
    const node = ReactDOM.findDOMNode(app)
    expect(node).not.to.equal(null)
  })
})
