import helloController from './hello.controller'

export default {
  controller: new helloController,
  routes: [
    {method: 'GET', url: '/api/ooo', handler: 'test'}
  ]
}
