import { FULL_ADDRESS_FRAGMENT, FULL_ORDER_FRAGMENT } from "./order";

export const CURRENT_USER_FRAGMENT = `
  identifier
  channels {
    id
    code
    permissions
  }
`;

export const ACTIVE_CUSTOMER_FRAGMENT = `
  id
  title
  firstName
  lastName
  phoneNumber
  emailAddress
  addresses {
    ${FULL_ADDRESS_FRAGMENT}
  }
  resellerDiscounts {
    facetValueIds
    discount
  }
`;

export const GET_CURRENT_USER = /* GraphQL */ `
  query {
    me {
      ${CURRENT_USER_FRAGMENT}
    }
    activeCustomer {
      ${ACTIVE_CUSTOMER_FRAGMENT}
    }
  }
`;

export const GET_CURRENT_CUSTOMER = /* GraphQL */ `
  query {
    activeCustomer {
      ${ACTIVE_CUSTOMER_FRAGMENT}
    }
  }
`;

export const GET_CURRENT_CUSTOMER_ORDERS = /* GraphQL */ `
  query activeCustomerOrders($skip: Int!, $take: Int!) {
    activeCustomer {
      orders(options: { skip: $skip, take: $take, sort: { updatedAt: DESC } }) {
        items {
          id
          code
          updatedAt
          total
          state
          lines {
            quantity
          }
        }
        totalItems
      }
    }
  }
`;

export const GET_CURRENT_CUSTOMER_ALL_ORDERS = /* GraphQL */ `
  query activeCustomerOrders {
    activeCustomer {
      orders(options: { sort: { updatedAt: DESC } }) {
        items {
          id
          code
          updatedAt
          total
        }
        totalItems
      }
    }
  }
`;

export const UPDATE_CUSTOMER = /* GraphQL */ `
  mutation UpdateCustomer($input: UpdateCustomerInput!){
    updateCustomer(input: $input){
      ${ACTIVE_CUSTOMER_FRAGMENT}
    }
  }
`;
export const UPDATE_CUSTOMER_PASSWORD = /* GraphQL */ `
  mutation UpdateCustomerPassword($password: String!, $newPassword: String!) {
    updateCustomerPassword(
      currentPassword: $password
      newPassword: $newPassword
    )
  }
`;
export const REQUEST_UPDATE_CUSTOMER_EMAIL = /* GraphQL */ `
  mutation RequestUpdateCustomerEmailAddress(
    $currentPassword: String!
    $email: String!
  ) {
    requestUpdateCustomerEmailAddress(
      password: $currentPassword
      newEmailAddress: $email
    )
  }
`;
export const UPDATE_CUSTOMER_EMAIL = /* GraphQL */ `
  mutation UpdateCustomerEmailAddress($token: String!) {
    updateCustomerEmailAddress(token: $token)
  }
`;

export const CREATE_CUSTOMER_ADDRESS = /* GraphQL */ `
  mutation CreateCustomerAddress($input: CreateAddressInput!) {
    createCustomerAddress(input: $input) {
      id
    }
  }
`;

export const UPDATE_CUSTOMER_ADDRESS = /* GraphQL */ `
  mutation UpdateCustomerAddress($input: UpdateAddressInput!) {
    updateCustomerAddress(input: $input) {
      id
    }
  }
`;

export const DELETE_CUSTOMER_ADDRESS = /* GraphQL */ `
  mutation DeleteCustomerAddress($id: ID!) {
    deleteCustomerAddress(id: $id)
  }
`;
export const LOGOUT = /* GraphQL */ `
  mutation logout {
    logout
  }
`;