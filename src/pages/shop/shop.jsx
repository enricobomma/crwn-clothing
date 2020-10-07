import React , {Component} from 'react';
import collectionOverViewContainer from '../../component/collection-overview/collection.overview.container';
import collectionContainer from '../collection/collection.container';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';


class ShopPage extends Component {

    componentDidMount(){
        const {fetchCollectionsStart} = this.props;
        fetchCollectionsStart();
    }


    render(){
        const {match} = this.props;
       
        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                component={collectionOverViewContainer}/>
                <Route
                    path={`${match.path}/:collectionId`}
                    component={collectionContainer}
                    />
            </div>
        )
    }
};

// const mapStateToProps = createStructuredSelector({
//     isCollectionsLoaded: selectIsCollectionsLoaded
// });
    

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(
   null,
     mapDispatchToProps
)(ShopPage);