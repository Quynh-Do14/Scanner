import {LAYOUT_MARGIN} from '@/constants';
import {makeStyles} from '@/utils';

const signUpScreenStyles = makeStyles((theme) => ({
  container: {
    margin: LAYOUT_MARGIN,
  },
  subtitle: {
    marginBottom: theme.spacing(4),
  },
}));

export default signUpScreenStyles;
