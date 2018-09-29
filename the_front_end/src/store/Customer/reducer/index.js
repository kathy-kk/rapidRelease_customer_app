import { combineReducers } from 'redux';
import createList, * as fromList from './createList';
import byId, * as fromById from './byId';

const customerApp = combineReducers({
    idList: createList(),
    byId
});
export default customerApp;
export const getCustomerById = (id,state) => fromById.getCustomerById(id, state.byId);
export const getIdList = state => fromList.getIdList(state.idList);
