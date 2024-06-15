import {Button, Input, Screen, Text} from '@/components';
import {MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH} from '@/constants';
import {useLoading} from '@/hooks';
import {createUserService} from '@/services';
import {useNavigation} from '@react-navigation/native';
import {getAuth} from 'firebase/auth';
import {useFormik} from 'formik';
import i18next from 'i18next';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import * as Yup from 'yup';
import signUpScreenStyles from './styles';

const auth = getAuth();

const SignUpScreen: React.FC = () => {
  const styles = signUpScreenStyles();

  const navigation = useNavigation();
  const {showLoading, hideLoading} = useLoading();

  const {t} = useTranslation(['translation'], {
    keyPrefix: 'signUpScreen',
  });

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required(i18next.t('enterFullname')),
    email: Yup.string()
      .email(i18next.t('invalidEmail'))
      .required(i18next.t('emailRequired')),
    password: Yup.string()
      .min(
        MIN_PASSWORD_LENGTH,
        i18next.t('invalidPassword', {
          characters: MIN_PASSWORD_LENGTH,
        }),
      )
      .required(i18next.t('passwordRequired')),
  });

  const initialValues = {
    fullname: '',
    email: '',
    password: '',
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
      createUserService(
        values.email,
        values.password,
        values.fullname,
        () => {
          hideLoading();
          Alert.alert(t('signUpSuccess'));
        },
        (error) => {
          Alert.alert(error.message);
          hideLoading();
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
        <Appbar.Content title={i18next.t('signUp')} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.subtitle}>{t('subtitle')}</Text>
        <Input
          required
          label={i18next.t('fullname')}
          errorMessage={touched.fullname && errors.fullname && errors.fullname}
          value={values.fullname}
          onChangeText={(text) => {
            setFieldValue('fullname', text);
            setFieldTouched('fullname', true, false);
          }}
          onBlur={handleBlur('fullname')}
          icon="profile"
          placeholder={i18next.t('fullname')}
          autoCapitalize="words"
        />
        <Input
          required
          label={i18next.t('email')}
          errorMessage={touched.email && errors.email && errors.email}
          value={values.email}
          onChangeText={(text) => {
            setFieldValue('email', text);
            setFieldTouched('email', true, false);
          }}
          onBlur={handleBlur('email')}
          icon="email"
          placeholder={i18next.t('email')}
          keyboardType={'email-address'}
        />
        <Input
          required
          label={i18next.t('password')}
          errorMessage={touched.password && errors.password && errors.password}
          value={values.password}
          onChangeText={(text) => {
            setFieldValue('password', text);
            setFieldTouched('password', true, false);
          }}
          onBlur={handleBlur('password')}
          icon="password"
          placeholder={i18next.t('password')}
          type="password"
          maxLength={MAX_PASSWORD_LENGTH}
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

export default SignUpScreen;
