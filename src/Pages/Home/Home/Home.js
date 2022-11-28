import React from 'react';
import AdvertisedItems from '../AdvertisedItems/AdvertisedItems';
import Articles from '../Articles/Articles';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <Articles></Articles>
            <AdvertisedItems></AdvertisedItems>
        </div>
    );
};

export default Home;