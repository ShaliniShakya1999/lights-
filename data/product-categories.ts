import { catalogImages } from '~/data/catalog-images'

export const productCategories = [
  {
    title: 'Lamps',
    image: catalogImages[2] || '/catalog/p3.jpg',
    to: '/lighting/lamps',
    count: 86,
    subtitle: 'Table & floor lamps',
  },
  {
    title: 'General Light Interior',
    image: '/homepages/c3.jpg',
    to: '/lighting/general-light-interior',
    count: 142,
    subtitle: 'Everyday interiors',
  },
  {
    title: 'Chandeliers',
    image: '/homepages/d4.jpg',
    to: '/lighting/chandeliers',
    count: 125,
    subtitle: 'Statement pieces',
  },
  {
    title: 'COB Panel Track Lights',
    image: catalogImages[10] || '/catalog/p11.jpg',
    to: '/lighting/cob-panel-track-lights',
    count: 98,
    subtitle: 'Commercial & home',
  },
] as const
