import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          title: 'Tênis de Caminhada Leve Confortável',
          price: 179.9,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
          amount: 0,
          subtotal: 0,
        },
        {
          id: 2,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
          price: 139.9,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
          amount: 0,
          subtotal: 0,
        },
        {
          id: 3,
          title: 'Tênis Adidas Duramo Lite 2.0',
          price: 219.9,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
          amount: 0,
          subtotal: 0,
        },
      ],
    };
  }

  render() {
    const { products } = this.state;

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
              <TotalText>TOTAL</TotalText>
              <TotalAmount>R$ 0,00</TotalAmount>
              <Order>
                <OrderText>Finalizar pedido</OrderText>
              </Order>
            </TotalContainer>
          </>
        ) : (
          <Container>
            <EmptyContainer>
              <Icon name="add-shopping-cart" color="#fff" size={60} />
              <EmptyText>Carrinho vazio</EmptyText>
            </EmptyContainer>
          </Container>
        )}
      </Container>
    );
  }
}

export default Cart;
