import { Alert } from 'react-native';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import NavigationService from '../../../services/navigation';

import api from '../../../services/api';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
  const productExists = yield select((state) =>
    state.cart.find((product) => product.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Alert.alert('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: response.data.price,
    };

    yield put(addToCartSuccess(data));

    // NavigationService.navigate('Cart');
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
