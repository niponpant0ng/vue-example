import shopController from './shop.controller'

export default {
  controller: new shopController,
  routes: [
    {method: 'GET', url: '/api/shop', handler: 'search'}
  ]
}
