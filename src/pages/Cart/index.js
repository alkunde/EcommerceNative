import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import produce from 'immer';
import * as CartActions from '../../store/modules/cart/actions';
import colors from '../../styles/colors';
import { formatPrice } from '../../util/format';

import {
  Container,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductControls,
  ProductControlButton,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
} from './styles';

function Cart({ navigation }) {
  const products = useSelector((state) =>
    state.cart.map((product) => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const totalPrice = useSelector((state) =>
    formatPrice(
      state.cart.reduce(
        (total, product) => total + product.price * product.amount,
        0
      )
    )
  );

  const dispatch = useDispatch();

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  return (
    <Container>
      {products.length ? (
        <>
          <Products>
            {products.map((product) => (
              <Product key={product.id}>
                <ProductInfo>
                  <ProductImage source={{ uri: product.image }} />
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>{formatPrice(product.price)}</ProductPrice>
                  </ProductDetails>
                  <ProductDelete
                    onPress={() =>
                      dispatch(CartActions.removeFormCart(product.id))
                    }
                  >
                    <Icon
                      name="delete-outline"
                      color={colors.primary}
                      size={24}
                    />
                  </ProductDelete>
                </ProductInfo>
                <ProductControls>
                  <ProductControlButton onPress={() => decrement(product)}>
                    <Icon
                      name="remove-circle-outline"
                      color={colors.primary}
                      size={20}
                    />
                  </ProductControlButton>
                  <ProductAmount value={String(product.amount)} />
                  <ProductControlButton onPress={() => increment(product)}>
                    <Icon
                      name="add-circle-outline"
                      color={colors.primary}
                      size={20}
                    />
                  </ProductControlButton>
                  <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                </ProductControls>
              </Product>
            ))}
          </Products>
          <TotalContainer>
            <TotalText>Total</TotalText>
            <TotalAmount>{totalPrice}</TotalAmount>
            <Order>
              <OrderText>Finalizar pedido</OrderText>
            </Order>
          </TotalContainer>
        </>
      ) : (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" color={colors.gray} size={60} />
          <EmptyText>Carrinho vazio</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
}

export default Cart;
