import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export const { format: formatPrice } = new Intl.NumberFormat('pr-BR', {
  style: 'currency',
  currency: 'BRL',
});
