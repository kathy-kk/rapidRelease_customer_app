import { TOGGLE_EDIT, SHOW_CUSTOMER_DETAIL } from '../actionTypes';

const initialState = {
    add: false,
    modify: false
};

const edit = (state = initialState, action) => {
    switch(action.type){
    case SHOW_CUSTOMER_DETAIL:
        return initialState;
    case TOGGLE_EDIT:
        if(action.mode =='add'){
            return  {
                add: true,
                modify: false
            };
        }
        if(action.mode =='modify'){
            return {
                add: false,
                modify: true
            };
        }
        if(action.mode == 'reset'){
            return {
                add:false,
                modify:false
            };
        }
        else return state;
    default: return state;  
    }
};
export default edit;
export const getEdit = state => state.add||state.modify;

