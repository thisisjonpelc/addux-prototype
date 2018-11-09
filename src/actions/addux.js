export const setAdduxes = (adduxes) => {

    return {
        type:"SET_ADDUXES",
        adduxes
    };
};

export const setActive = (id) => {
    return {
        type:"SET_ACTIVE",
        id
    }
};

export const editAddux = (activeAddux, updates) => {
    return {
        type: "EDIT_ADDUX",
        activeAddux,
        updates
    }
};

export const editComments = (adduxId, commentId, text) => {
    return {
        type: "EDIT_COMMENT",
        adduxId,
        commentId,
        text
    }
};

export const addAddux = (addux) => {
    return {
        type: "ADD_ADDUX",
        addux
    }
};

export const deleteAddux = (id) => {
    return {
        type: 'DELETE_ADDUX',
        id
    }
}