import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';
import colors from '../../styles/colors';

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

function Cart({ navigation, products }) {
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
                    <ProductPrice>{product.price}</ProductPrice>
                  </ProductDetails>
                  <ProductDelete onPress={() => {}}>
                    <Icon name="delete-forever" color="#7159c1" size={24} />
                  </ProductDelete>
                </ProductInfo>
                <ProductControls>
                  <ProductControlButton onPress={() => {}}>
                    <Icon
                      name="remove-circle-outline"
                      color={colors.primary}
                      size={20}
                    />
                  </ProductControlButton>
                  <ProductAmount value={String(product.amount)} />
                  <ProductControlButton onPress={() => {}}>
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
            <TotalAmount>R$ 0,00</TotalAmount>
            <Order>
              <OrderText>Finalizar pedido</OrderText>
            </Order>
          </TotalContainer>
        </>
      ) : (
        <EmptyContainer>
          <Icon name="add-shopping-cart" color="#fff" size={60} />
          <EmptyText>Carrinho vazio</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  products: state.cart.map((product) => ({
    ...product,
    subtotal: product.price * product.amount,
    priceFormatted: product.price,
  })),
  total: state.cart.reduce(
    (total, product) => total + product.price * product.amount,
    0
  ),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
