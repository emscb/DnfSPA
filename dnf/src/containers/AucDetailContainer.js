import React from "react";
import AucDetail from "../components/AucDetail";
import { addItem } from "../modules/recentSearch";
import { connect } from "react-redux";

const AucDetailContainer = ({ match, history, addItem }) => {
	return <AucDetail match={match} history={history} add={addItem} />;
};

export default connect(state => ({}), { addItem })(AucDetailContainer);
