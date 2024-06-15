import {Button, Input, Screen, Text} from '@/components';
import {useLoading} from '@/hooks';
import {resetPasswordService} from '@/services';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import i18next from 'i18next';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import * as Yup from 'yup';
import resetPasswordStyles from './styles';

const ResetPasswordScreen: React.FC = () => {
  const styles = resetPasswordStyles();

  const navigation = useNavigation();
  const {showLoading, hideLoading} = useLoading();

  const {t} = useTranslation(['translation'], {
    keyPrefix: 'resetPasswordScreen',
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(i18next.t('invalidEmail'))
      .required(i18next.t('enterEmail')),
  });

  const initialValues = {
    email: '',
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
      resetPasswordService(
        values.email,
        () => {
          hideLoading();
          Alert.alert(t('checkEmail'));
        },
        (error) => {
          hideLoading();
          Alert.alert(error.message);
        },
      );
    },
  });

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <Screen>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title={t('title')} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.subtitle}>{t('subtitle')}</Text>
        <Input
          placeholder={i18next.t('email')}
          value={values.email}
          onChangeText={(text) => {
            setFieldValue('email', text);
            setFieldTouched('email', true, false);
          }}
          onBlur={handleBlur('email')}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          errorMessage={touched.email && errors.email && errors.email}
        />
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

export default ResetPasswordScreen;
