import React from 'react';
import SearchChar from './SearchChar';
import Helmet from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>홈</title>
            </Helmet>
            <SearchChar />

        </div>
    );
};

export default Home;