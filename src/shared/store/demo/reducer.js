import { TOGGLE } from './action';

const initialState = {
    toggle: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE:
            return {
                ...state,
                toggle: !state.toggle,
            };
        default:
            return state;
    }
};
