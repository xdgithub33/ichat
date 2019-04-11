const accountRouter = [
  { path: '/', redirect: { name: 'Login' } },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/account/Login.vue'),
  },
]
export default accountRouter
