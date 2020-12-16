import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Project'
  },
  {
    name: 'Create Project',
    url: '/base/create-project',
    icon: 'icon-puzzle'
  },
  {
    name: 'View Project Details',
    url: '/base/view-projects',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'User'
  },

  {
    name: 'profile',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      }
    ]
  },
  {
    title: true,
    name: 'Notification'
  },
  {
    name: 'Notification',
    url: '/base/notification',
    icon: 'icon-bell'
  }
];
