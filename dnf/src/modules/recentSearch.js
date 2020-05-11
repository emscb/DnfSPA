const ADD = "recentSearch/ADD";

export const addItem = (id, name) => ({ type: ADD, id, name });

const initialState = [];

function recentSearch(state = initialState, action) {
	switch (action.type) {
		case ADD:
			return state
				.filter(item => item.id !== action.id)
				.concat([{ id: action.id, name: action.name }]);
		default:
			return state;
	}
}

export default recentSearch;
