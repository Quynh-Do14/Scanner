import {changeLoading, useAppDispatch} from '@/redux';

const useLoading = () => {
  const dispatch = useAppDispatch();

  const _changeLoadingStatus = (isLoading: boolean) => {
    dispatch(changeLoading(isLoading));
  };

  const showLoading = () => {
    _changeLoadingStatus(true);
  };

  const hideLoading = () => {
    _changeLoadingStatus(false);
  };

  return {showLoading, hideLoading};
};

export default useLoading;
