import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'tncpl9l7',
    dataset: 'production'
  },
  studioHost: 'orcahome',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'w98ur97lrq8pddfc4rky5a3i',
  }
})
