import React from 'react';
import SearchChar from './SearchChar';
import axios from "axios";
import cheerio from "cheerio";
import iconv from "iconv-lite";

try {
    axios.get(`http://df.nexon.com/df/home`).then(response => {
        const $ = cheerio.load(response.data);
        console.log(response);
        if (response.status === 200) {
            const noticeList = $(
                "#container > div.content > div.df_news > ul.news_tabcon > li.show > dl"
            );
            console.log(noticeList);
            var noticeExample = noticeList[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].data;
            console.log(iconv.decode(noticeExample, 'CP949').toString());
        }
    })
} catch (e) {
    console.log(e);
}

const Home = () => {
    return (
        <div>
            <SearchChar />

        </div>
    );
};

export default Home;