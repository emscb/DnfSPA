import React, { useState } from "react";
import "./styles/Search.scss";

const Search = ({ onSearch, type }) => {
	const [value, setValue] = useState("");

	const onChange = e => {
		setValue(e.target.value);
	};

	// 검색창 초기화 후 검색 (API 호출)
	const onSubmit = e => {
		if (value === "") {
			e.preventDefault();
		} else {
			onSearch(value);
			setValue("");
			e.preventDefault();
		}
	};

	return (
		<div>
			<form className="Search" onSubmit={onSubmit}>
				<input
					className="input"
					placeholder={`${type} 이름을 입력하세요`}
					value={value}
					onChange={onChange}
				></input>
				<button className="button" type="submit">
					검색
				</button>
			</form>
		</div>
	);
};

export default Search;
