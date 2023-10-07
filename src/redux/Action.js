import { errorMessage, loadingStatus, successMessage } from './Slice';
import {store} from './Store'


export const clearErrors = () => {
    store.dispatch(errorMessage({ errors: '' }));
};
  
export const clearSuccesses = () => {
    store.dispatch(successMessage({ successess: '' }));
};
  
export const setLoadingStatus = (status) => {
    store.dispatch(loadingStatus({ loadingStatus: status }));
};
