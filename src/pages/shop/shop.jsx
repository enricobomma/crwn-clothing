import React from 'react';
import CollectionPage from '../collection/collection.component';
import CollectionOverview from '../../component/collection-overview/collection-overview.component';
import {Route} from 'react-router-dom';

const ShopPage = ({match}) => {
    console.log("match", match);
    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionOverview}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
        </div>
    )
};

export default ShopPage;