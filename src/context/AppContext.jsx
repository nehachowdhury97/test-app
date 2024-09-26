import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    userInfo: {
        fullName: '',
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'USER_INFO': {
            return {
                ...state,
                userInfo: action.payload,
            };
        }
        default: {
            return { ...state };
        }
    }
};

const AppContext = createContext({
    ...initialState,
    setUserInfo: () => { },
});

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setUserInfo = (payload) => {
        dispatch({ type: 'USER_INFO', payload })
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                setUserInfo,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// export const useSelect = () => useContext(AppContext);


export default AppContext;