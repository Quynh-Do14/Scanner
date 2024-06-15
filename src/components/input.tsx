import {useTheme} from '@/hooks';
import {fonts} from '@/styles';
import {makeStyles} from '@/utils';
import React, {useState} from 'react';
import {
  Falsy,
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {Icon, IconNames} from './icon';
import Text from './text';

export interface InputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  type?: 'text' | 'password';
  icon?: IconNames;
  label?: string;
  errorMessage?: string | Falsy;
  required?: boolean;
}

const Input: React.FC<InputProps> = React.forwardRef(
  (props, ref: React.Ref<TextInput>) => {
    const {
      style,
      type = 'text',
      icon,
      label,
      errorMessage,
      required,
      ...rest
    } = props;
    const styles = useStyles();
    const {colors} = useTheme();

    const [passwordVisibility, setPasswordVisibility] = useState(true);

    const handlePasswordVisibility = () => {
      setPasswordVisibility(!passwordVisibility);
    };

    const iconColor = colors['placeholder-icon'];

    return (
      <View style={styles.wrapper}>
        {label && (
          <Text style={styles.label} numberOfLines={1}>
            {label} {required && <Text style={styles.required}>*</Text>}
          </Text>
        )}
        <View style={style}>
          <View style={[styles.container]}>
            {icon && (
              <Icon name={icon} color={iconColor} style={styles.iconLeft} />
            )}
            <TextInput
              cursorColor={colors['cursor']}
              placeholderTextColor={colors['placeholder-text']}
              autoCapitalize={'none'}
              autoComplete={'off'}
              underlineColorAndroid="transparent"
              {...rest}
              ref={ref}
              style={styles.input}
              selectionColor={`${colors['selection']}50`}
              secureTextEntry={type == 'password' && passwordVisibility}
            />
            {type == 'password' && (
              <Pressable onPress={handlePasswordVisibility}>
                {passwordVisibility ? (
                  <Icon name={'eye'} color={iconColor} />
                ) : (
                  <Icon name={'eye-off'} color={iconColor} />
                )}
              </Pressable>
            )}
          </View>
        </View>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
    );
  },
);

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: theme.spacing(3),
  },
  container: {
    paddingHorizontal: theme.spacing(3),
    borderRadius: theme.radii.large,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors['input-background'],
    height: 45,
  },
  input: {
    height: 45,
    fontFamily: fonts.medium,
    color: theme.colors['primary-text'],
    flex: 1,
  },
  iconLeft: {
    marginRight: theme.spacing(1),
  },
  label: {
    marginBottom: theme.spacing(1),
    color: theme.colors['secondary-text'],
  },
  required: {
    color: theme.colors['error'],
  },
  error: {
    color: theme.colors['error'],
    marginTop: theme.spacing(1),
  },
}));

export default Input;
