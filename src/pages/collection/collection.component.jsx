import React from 'react'
import {connect} from 'react-redux';
import './collection.styles.scss';
import {selectCollection} from '../../redux/shop/shop.selectors'
//import CollectionOverview from '../../component/collection-overview/'
import CollectionItem from '../../component/collection-item/collection-item';
//import { Route } from 'react-router-dom';

const CollectionPage = ({match, collection}) => {
    const {title, items} = collection;
    return(
    <div className='collection-page'>
        {/* <Route path={`${match.path}/${title}`} component={CollectionOverview}>
            <h2 className='title'>{title}</h2>
            </Route> */}
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {items.map(item => <CollectionItem key={item.id} item={item}/>)
                
            }

        </div>
    </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {collection: selectCollection(ownProps.match.params.collectionId)(state)};
    
}

export default connect(mapStateToProps)(CollectionPage);