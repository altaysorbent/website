import { format } from 'date-fns';
import locale from 'date-fns/locale/ru';

const getPostDay = (postDate) =>
  format(new Date(postDate), 'eeee', {
    locale,
  });

const getPostDate = (postDate) =>
  format(new Date(postDate), 'd MMMM yyyy', {
    locale,
  });

export { getPostDay, getPostDate };
