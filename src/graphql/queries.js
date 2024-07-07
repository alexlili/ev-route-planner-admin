/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserCarList = /* GraphQL */ `
  query GetUserCarList($id: ID!) {
    getUserCarList(id: $id) {
      id
      portType
      brand
      name
      range
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserCarLists = /* GraphQL */ `
  query ListUserCarLists(
    $filter: ModelUserCarListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCarLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        portType
        brand
        name
        range
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getClickChargerList = /* GraphQL */ `
  query GetClickChargerList($id: ID!) {
    getClickChargerList(id: $id) {
      id
      uuid
      addressInfo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listClickChargerLists = /* GraphQL */ `
  query ListClickChargerLists(
    $filter: ModelClickChargerListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClickChargerLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        uuid
        addressInfo
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSearchLoactionList = /* GraphQL */ `
  query GetSearchLoactionList($id: ID!) {
    getSearchLoactionList(id: $id) {
      id
      addressInfo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSearchLoactionLists = /* GraphQL */ `
  query ListSearchLoactionLists(
    $filter: ModelSearchLoactionListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSearchLoactionLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        addressInfo
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFavouriteChargerList = /* GraphQL */ `
  query GetFavouriteChargerList($id: ID!) {
    getFavouriteChargerList(id: $id) {
      id
      addressInfo
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFavouriteChargerLists = /* GraphQL */ `
  query ListFavouriteChargerLists(
    $filter: ModelFavouriteChargerListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavouriteChargerLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        addressInfo
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
