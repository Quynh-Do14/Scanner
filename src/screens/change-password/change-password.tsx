import {Button, Input, Screen} from '@/components';
import {MIN_PASSWORD_LENGTH, SCREENS} from '@/constants';
import {useAppSelector} from '@/redux';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import i18next from 'i18next';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Appbar} from 'react-native-paper';
import * as Yup from 'yup';
import changePasswordScreenStyles from './styles';
import {useLoading} from '@/hooks';
import {changePasswordService} from '@/services';

const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const {t} = useTranslation(['translation'], {
    keyPrefix: 'changePasswordScreen',
  });

  const {showLoading, hideLoading} = useLoading();

  const styles = changePasswordScreenStyles();

  const user = useAppSelector((state) => state.auth.user);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(
        MIN_PASSWORD_LENGTH,
        i18next.t('invalidPassword', {
          characters: MIN_PASSWORD_LENGTH,
        }),
      )
      .required(t('enterPassword')),
    newPassword: Yup.string()
      .min(
        MIN_PASSWORD_LENGTH,
        i18next.t('invalidPassword', {
          characters: MIN_PASSWORD_LENGTH,
        }),
      )
      .required(t('enterPassword')),
  });

  const initialValues = {
    oldPassword: '',
    newPassword: '',
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onForgot = () => {
    navigation.navigate(SCREENS.RESET_PASS_WORD);
  };

  const {
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      showLoading();
      changePasswordService(
        user?.email,
        values.oldPassword,
        values.newPassword,
        () => {
          hideLoading();
          Alert.alert(t('changePasswordSuccess'));
        },
        (error) => {
          hideLoading();
          Alert.alert(error.message);
        },
      );
    },
  });
  return (
    <Screen>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Change Password" />
        <Appbar.Action icon={'lock-reset'} onPress={onForgot} />
      </Appbar.Header>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <Input
            type={'password'}
            label={t('oldPassword')}
            placeholder={t('oldPassword')}
            value={values.oldPassword}
            onChangeText={(text) => {
              setFieldValue('oldPassword', text);
              setFieldTouched('oldPassword', true, false);
            }}
            onBlur={handleBlur('oldPassword')}
            autoCapitalize={'none'}
            errorMessage={
              touched.oldPassword && errors.oldPassword
                ? errors.oldPassword
                : undefined
            }
          />
          <Input
            type={'password'}
            label={t('newPassword')}
            placeholder={t('newPassword')}
            value={values.newPassword}
            onChangeText={(text) => {
              setFieldValue('newPassword', text);
              setFieldTouched('newPassword', true, false);
            }}
            onBlur={handleBlur('newPassword')}
            autoCapitalize={'none'}
            errorMessage={
              touched.newPassword && errors.newPassword
                ? errors.newPassword
                : undefined
            }
          />
        </KeyboardAwareScrollView>
        <Button
          block
          title={i18next.t('submit')}
          uppercase
          onPress={handleSubmit}
        />
      </View>
    </Screen>
  );
};

export default ChangePasswordScreen;
