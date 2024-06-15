import {LAYOUT_MARGIN} from '@/constants';
import {makeStyles} from '@/utils';

const profileScreenStyles = makeStyles((theme) => ({
  container: {
    margin: LAYOUT_MARGIN,
  },

  card: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
  },

  fullname: {
    marginTop: theme.spacing(4),
  },
}));

export default profileScreenStyles;
