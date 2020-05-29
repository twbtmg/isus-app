import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  RadioButton, TextInput, Button, Snackbar
} from 'react-native-paper';
import { postFeedback } from '../../apis/apiHome';

export default function FeedbackScreen() {
  const [checked, setState] = React.useState(true);
  const [feedback, setFeedback] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [statusSnackbar, setStatusSnackbar] = React.useState(false);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'iSUS',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 10 }}>
        <Text
          style={{
            letterSpacing: 0.25,
            fontSize: 14,
            lineHeight: 20,
            color: '#828282'
          }}
        >
          Reporte erros, inconsistências e melhorias que encontrar para nos ajudar a resolver
          problemas e melhorar o app rapidamendamente.
        </Text>

        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <View style={{ flexDirection: 'row', marginRight: 20 }}>
            <RadioButton
              value="first"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setState(!checked)}
            />
            <Text style={{ alignSelf: 'center' }}>Sugestões</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <RadioButton
              value="first"
              status={checked ? 'unchecked' : 'checked'}
              onPress={() => setState(!checked)}
            />
            <Text style={{ alignSelf: 'center' }}>Problemas</Text>
          </View>
        </View>

        <TextInput
          numberOfLines={5}
          mode="outlined"
          multiline
          label="Motivo"
          onChangeText={text => setFeedback(text)}
        />

        <Text
          style={{
            letterSpacing: 0.25,
            fontSize: 12,
            lineHeight: 20,
            color: '#828282',
            marginVertical: 10
          }}
        >
          Lembre de espificar a seção do app que você refere
        </Text>

        <TextInput mode="outlined" label="Email" onChangeText={text => setEmail(text)} />
      </View>
      <Button
        disabled={!!(feedback === '' || email === '')}
        style={feedback === '' || email === '' ? styles.buttonDisabled : styles.button}
        labelStyle={{ color: '#fff' }}
        mode="contained"
        onPress={() => {
          postFeedback(checked, feedback, email);
          setStatusSnackbar(true);
        }}
      >
        Enviar
      </Button>

      <Snackbar
        style={{ backgroundColor: '#1e1e1e' }}
        visible={statusSnackbar}
        onDismiss={() => setStatusSnackbar(false)}
        action={{
          label: 'ok',
          onPress: () => setStatusSnackbar(false)
        }}
      >
        Enviado
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#FF9800'
  },
  buttonDisabled: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center'
  }
});