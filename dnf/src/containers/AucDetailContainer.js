import React from "react";
import AucDetail from "../components/AucDetail";
import { addItem } from "../modules/recentSearch";
import { useDispatch } from "react-redux";

const AucDetailContainer = ({ match, history }) => {
	const dispatch = useDispatch();
	return (
		<AucDetail match={match} history={history} add={(id, name) => dispatch(addItem(id, name))} />
	);
};

export default React.memo(AucDetailContainer);
