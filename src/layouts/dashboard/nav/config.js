// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'post',
    path: '/dashboard/post',
    icon: icon('ic_post'),
  },
  {
    title: 'post submission',
    path: '/dashboard/post-verify',
    icon: icon('ic_post'),
  },
  {
    title: 'donation',
    path: '/dashboard/donation',
    icon: icon('ic_donation'),
  },
  {
    title: 'feedback',
    path: '/dashboard/feedback',
    icon: icon('ic_feedback'),
  },

  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
