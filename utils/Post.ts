import { format } from 'date-fns';
import locale from 'date-fns/locale/ru';

const getPostDay = (postDate: string): string =>
  format(new Date(postDate), 'eeee', {
    locale,
  });

const getPostDate = (postDate: string): string =>
  format(new Date(postDate), 'd MMMM yyyy', {
    locale,
  });

export { getPostDay, getPostDate };
