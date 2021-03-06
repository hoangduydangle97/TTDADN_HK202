import {
  faDoorClosed,
  faMicrochip,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';

const prefixDevice = 'devices';
const prefixRoom = 'rooms';
const prefixExample = 'examples';

export const Routes = {
  // pages
  Presentation: { path: '/' },
  Signin: { path: '/login' },
  Signup: { path: '/signup' },
  Devices: {
    icon: faMicrochip,
    prefix: `/${prefixDevice}`,
    list: `/${prefixDevice}/list`,
    create: `/${prefixDevice}/create`,
    edit: `/${prefixDevice}/edit/:id`,
    history: `/${prefixDevice}/:id/history`,
  },
  Rooms: {
    icon: faDoorClosed,
    prefix: `/${prefixRoom}`,
    list: `/${prefixRoom}`,
    create: `/${prefixRoom}/create`,
    edit: `/${prefixRoom}/edit/:id`,
    devices: `/${prefixRoom}/:id/devices`,
  },
  Rules: {
    icon: faTasks,
    list: '/rules',
    create: '/rules/create',
    edit: '/rules/edit/:id',
  },
  Dashboard: { path: '/dashboard' },

  Settings: { path: '/settings' },
  Examples: {
    prefix: `/${prefixExample}`,
    ForgotPassword: `/${prefixExample}/forgot-password`,
    ResetPassword: '`/${prefixExample}/reset-password`',
    Lock: `/${prefixExample}/lock`,
    NotFound: `/${prefixExample}/404`,
    ServerError: `/${prefixExample}/500`,
  },
};
