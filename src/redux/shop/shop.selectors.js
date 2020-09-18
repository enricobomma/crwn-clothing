import { createSelector} from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
)


export const selectCollectionForPreview = createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = memoize((collectionUrlParam) => { 
    console.log("collectionUrlParam",collectionUrlParam);
    return (createSelector(
                [selectShopCollections],
                collections => collections[collectionUrlParam])
            )
        
})


