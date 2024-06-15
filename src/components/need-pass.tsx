import {View, Text, Alert} from 'react-native';
import React from 'react';
import {Button, Input} from '@/components';
import {Modal} from 'react-native-paper';
import {makeStyles} from '@/utils';
import i18next from 'i18next';

import * as Yup from 'yup';
import {MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH} from '@/constants';
import {useFormik} from 'formik';

interface AddPasswordProps {
  visible: boolean;
  value?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  currentPass?: string;
}

const NeedPass: React.FC<AddPasswordProps> = (props) => {
  const {visible, value, onConfirm, onCancel, currentPass} = props;
  const styles = useStyles();

  const initialValues = {
    password: value,
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(
      MIN_PASSWORD_LENGTH,
      i18next.t('invalidPassword', {
        characters: MIN_PASSWORD_LENGTH,
      }),
    ),
  });

  const {
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    setFieldError,
  } = useFormik({
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      if (values.password == currentPass) {
        onConfirm?.();
      } else {
        setFieldError('password', 'Incorrect password');
      }
    },
  });

  return (
    <Modal visible={visible} onDismiss={onCancel}>
      <View style={styles.container}>
        <Text style={styles.secureTitle}>
          Use the saved password to open your document
        </Text>
        <Input
          autoFocus
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
        <Button title={i18next.t('submit')} block onPress={handleSubmit} />
      </View>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: theme.colors['surface'],
    borderRadius: 10,
    justifyContent: 'center',
    margin: 10,
    padding: 20,
  },
  secureTitle: {
    marginBottom: 10,
  },
}));

export default NeedPass;
