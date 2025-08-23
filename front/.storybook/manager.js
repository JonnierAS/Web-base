import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'Mapa UI',
    brandImage: '/geosolution.png', // /public
  },
});
