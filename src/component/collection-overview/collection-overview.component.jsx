import React from 'react'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import './collection-overview.styles.scss';
import CollectionPreview from '../collection-preview/collection-preview';
import {selectCollectionForPreview} from '../../redux/shop/shop.selectors';

const CollectionOverview = ({collections}) => {
    console.log("collection", collections);
    return (
        <div className='collection-overview'>
        {collections ? collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps}/>
            )):null}
        {/* {collections ? Object.keys(collections).map(({id, ...otherCollectionProps}) => (
            <CollectionPreview key={id} {...otherCollectionProps}/>
        )):null} */}
    </div>
    )
}
  



const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});


export default connect(mapStateToProps)(CollectionOverview);
