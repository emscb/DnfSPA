import React, { useState } from 'react';

const SearchCharResult = ({ match }) => {
    /* 제일 위에 "____ 서버에 대한 _____ 검색 결과입니다."
    서버는 콤보 박스로. 바꾸면 페이지 다시 그리게

    목록에는 캐릭터 이미지와 서버, 이름만 나오게
    */
   const {server, name} = match.params;
   const [charServer, setCharServer] = useState(server);
   const [charName, setCharName] = useState(name);
   

    return (
        <div>
            
        </div>
    );
};

export default SearchCharResult;