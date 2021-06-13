import { faDoorClosed, faMicrochip } from '@fortawesome/free-solid-svg-icons';

export const Routes = {
  // pages
  Presentation: { path: '/' },
  Signin: { path: '/sign-in' },
  Signup: { path: '/sign-up' },
  Devices: {
    icon: faMicrochip,
    list: '/devices',
    create: '/devices/create',
    edit: '/devices/edit/:id',
  },
  Rooms: {
    icon: faDoorClosed,
    list: '/rooms',
    create: '/rooms/create',
    edit: '/rooms/edit/:id',
    devices: '/room/:id/devices',
  },
  Dashboard: { path: '/dashboard' },

  Settings: { path: '/settings' },
  ForgotPassword: { path: '/examples/forgot-password' },
  ResetPassword: { path: '/examples/reset-password' },
  Lock: { path: '/examples/lock' },
  NotFound: { path: '/examples/404' },
  ServerError: { path: '/examples/500' },
};
