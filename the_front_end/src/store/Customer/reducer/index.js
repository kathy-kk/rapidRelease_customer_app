import { combineReducers } from 'redux';
import createList, * as fromList from './createList';
import byId, * as fromById from './byId';
import app, * as fromApp from './app';

const customerApp = combineReducers({
    idList: createList(),
    byId,
    app
});
export default customerApp;
export const getCustomerById = (id,state) => fromById.getCustomerById(id, state.byId);
export const getIdList = state => fromList.getIdList(state.idList);
export const getSelectedCustomer = state => fromApp.getSelectedCustomer(state.app);
export const getEdit = state => fromApp.getEdit(state.app);
export const getEditMode = state => state.app.edit;
export const getValidationError = state => fromApp.getValidationError(state.app);
