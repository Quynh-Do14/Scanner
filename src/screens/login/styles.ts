import {LAYOUT_MARGIN, STATUS_BAR_HEIGHT} from '@/constants';
import {makeStyles} from '@/utils';
import {StyleSheet} from 'react-native';

const loginStyles = makeStyles(theme => ({
  container: {
    margin: LAYOUT_MARGIN * 1.5,
  },

  header: {
    marginTop: theme.spacing(5) + STATUS_BAR_HEIGHT,
    marginBottom: theme.spacing(5),
  },

  title: {
    fontSize: theme.fontSizes['headline-small'],
    textAlign: 'center',
    color: theme.colors['primary'],
  },

  subtitle: {
    fontSize: theme.fontSizes['body-medium'],
    textAlign: 'center',
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing(5),
    color: theme.colors['secondary-text'],
  },

  dividerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(5),
  },

  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors['divider'],
    flex: 1,
  },

  orWith: {
    marginHorizontal: theme.spacing(2),
    color: theme.colors['secondary-text'],
  },

  socialWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing(5),
    margin: theme.spacing(5),
  },

  viewSignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  noAccount: {
    color: theme.colors['secondary-text'],
  },
  signUp: {
    color: theme.colors['primary'],
  },
}));

export default loginStyles;
