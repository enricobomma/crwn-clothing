import React , {Component} from 'react';
import CollectionPage from '../collection/collection.component';
import CollectionOverview from '../../component/collection-overview/collection-overview.component';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {  firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner  from '../../component/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner =  WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
    constructor(){
        super()

        this.state = {
            loading: true
        };
    }
    unsubscibeFromsnapshot = null;

    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        this.unsubscibeFromsnapshot = collectionRef.onSnapshot(async snapshot => {
        const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionMap);
        this.setState({loading: false});
        });
    }


    render(){
        const {match} = this.props;
        const {loading} = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`}  render = {props => <CollectionOverviewWithSpinner {...props} isLoading={loading}/>}/>
                <Route path={`${match.path}/:collectionId`} render = {props => <CollectionPageWithSpinner {...props} isLoading={loading}/>}/>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);