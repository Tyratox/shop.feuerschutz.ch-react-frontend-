/**
 * The product search reducer
 * @param {Object} state The redux state
 * @param {Object} action The dispatched action
 * @returns {Object} The new state
 */
const accountReducer = (
  state = { isFetching: 0, lastFetched: 0, error: null, account: {} },
  action
) => {
  switch (action.type) {
    case "LOGIN_USER":
    case "UPDATE_ACCOUNT":
    case "UPDATE_USER_ADDRESS":
    case "FETCH_USER_ACCOUNT":
      return {
        isFetching: state.isFetching + (action.isFetching ? 1 : -1),
        lastFetched: !action.isFetching && !action.error ? Date.now() : state,
        error:
          action.error || action.error === null ? action.error : state.error,
        account:
          !action.isFetching && action.account ? action.account : state.account
      };
    default:
      return state;
  }
};

export default accountReducer;

/**
 * Gets the user account
 * @param {Object} state The redux state
 * @returns {Object} The user account
 */
export const getAccount = state => state.account;
/**
 * Gets the last time the account was fetched
 * @param {Object} state The redux state
 * @returns {number} The unix timestamp
 */
export const getAccountLastFetched = state => state.lastFetched;

/**
 * Gets the reseller discount for a product
 * @param {Object} state The redux state
 * @param {number} productId The product id
 * @returns {number|boolean} The discount in percent
 */
export const getResellerDiscountByProductId = (state, productId) =>
  (state.account &&
    state.account.discount &&
    state.account.discount[productId]) ||
  false;

/**
 * Gets the reseller discount for the current user
 * @param {Object} state The redux state
 * @returns {number|boolean} The discount
 */
export const getResellerDiscount = state => state.account.discount || false;
