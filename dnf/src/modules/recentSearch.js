const ADD = "recentSearch/ADD";

export const addItem = () => ({ type: ADD });

const initialState = { list: 0 };

function recentSearch(state = initialState, action) {
	switch (action.type) {
		case ADD:
			return { list: state.list + 1 };
		default:
			return state;
	}
}

export default recentSearch;
