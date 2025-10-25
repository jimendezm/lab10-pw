// src/graphql/queries.js
export const GET_PRODUCTS = `
  query GetProducts($page: Int, $limit: Int) {
    productos(page: $page, limit: $limit) {
      id
      name
      sku
      price
      stock
      category
    }
  }
`;

export const GET_PRODUCT_DETAIL = `
  query GetProduct($id: ID!) {
    producto(id: $id) {
      id
      name
      sku
      price
      stock
      category
    }
  }
`;