import {LAYOUT_MARGIN} from '@/constants';
import {makeStyles} from '@/utils';

const editProfileScreenStyles = makeStyles((theme) => ({
  container: {
    margin: LAYOUT_MARGIN,
  },

  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullname: {
    marginTop: theme.spacing(4),
  },

  iconCamera: {
    position: 'absolute',
    color: theme.colors['light'],
  },
}));

export default editProfileScreenStyles;
