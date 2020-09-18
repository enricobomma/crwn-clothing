import React from 'react';
import CollectionItem from '../collection-item/collection-item.jsx'
import CollectionOverview from '../collection-overview/collection-overview.component';
import {Route} from 'react-router-dom';
import './collection-preview.scss';

const CollectionPreview = ({title, items, match}) => {
    console.log("title",title)
    console.log("items",items)
    return (
        <div className='collection-preview'>
        {/* <Route path={`${match.path}/${title}`} component={CollectionOverview}>
        <h1 className='title'>{title.toUpperCase()}</h1>
            </Route> */}
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {items
                .filter((item, idx) => idx < 4)
                .map((item) => (
                    <CollectionItem key={item.id} item={item}/>
                ))
            }
        </div>
    </div>
    )
    
}

export default CollectionPreview;