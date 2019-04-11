const homeRouter = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/',
        redirect: 'message',
      },
      {
        path: '/home/message',
        name: 'message',
        component: () => import('@/views/message/Message.vue'),
      },
      {
        path: '/home/addressBooks',
        name: 'homeAddressBooks',
        component: () => import('@/views/addressBooks/AddressBooks.vue'),
      },
      {
        path: '/home/shoppingMall',
        name: 'shoppingMall',
        component: () => import('@/views/shoppingMall/ShoppingMall.vue'),
      },
    ],
  },
]
export default homeRouter
