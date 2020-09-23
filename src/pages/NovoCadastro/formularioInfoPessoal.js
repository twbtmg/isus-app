import React, {
  useContext,
  useCallback,
  useEffect
} from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  TextInput, DefaultTheme, Button
} from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown-v2';
import IconDropdown from 'react-native-vector-icons/MaterialIcons';
import TextInputMask from 'react-native-text-input-mask';
import FormContext from '../../context/FormContext';
import Regex from '../../utils/regex';
import { getMunicipiosCeara } from '../../apis/apiCadastro';
import { salvarDados } from '../../services/armazenamento';
import { Titulo, Scroll, TituloDoFormulario } from './styles';
import BarraDeStatus from '../../components/barraDeStatus';

export default function FormularioInfoPessoal() {
  const dropdown = React.createRef();
  const [botaoAtivo, alteraBotaoAtivo] = React.useState(false);
  const [nomeCidades, alteraNomeCidades] = React.useState(() => []);
  const [cidades, pegaCidades] = React.useState([]);

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#304FFE'
    }
  };

  const {
    register, setValue, trigger, errors
  } = useContext(
    FormContext
  );
  useEffect(() => {
    register('nomeCompleto', {
      required: true,
      validate: nomeCompleto => nomeValido(nomeCompleto)
        || 'O nome deve conter apenas letras.'
    });
    register('email', {
      required: true,
      validate: email => emailValido(email) || 'O email deve ser no formato exemplo@exemplo.com'
    });
    register('telefone', {
      required: true,
      minLength: {
        value: 11,
        message: 'O seu telefone deve ter pelo menos 11 números.'
      },
      maxLength: 14
    });
    register('cpf', {
      required: true,
      minLength: {
        value: 11,
        message: 'O seu CPF deve ter pelo menos 11 números.'
      },
      maxLength: 14
    });
    register('cidade', {
      required: true
    });
  }, [register]);

  const pegarId = (municipio) => {
    let teste = null;
    cidades.forEach((element) => {
      if (element.nome === municipio) {
        teste = element.id;
      }
    });
    return teste;
  };

  const emailValido = email => Regex.EMAIL.test(email.toLowerCase());
  const nomeValido = nomeCompleto => Regex.NOME.test(nomeCompleto.toLowerCase());
  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    await trigger();
    alteraBotaoAtivo(Object.entries(errors).length === 0);
  };

  useFocusEffect(
    useCallback(() => {
      async function pegarCidades() {
        const response = await getMunicipiosCeara();
        alteraNomeCidades(response.data.map(item => item.nome));
        pegaCidades(response.data.map(item => item));
      }
      pegarCidades();
    }, [])
  );

  useEffect(() => {
    async function guardarCidades() {
      await salvarDados('municipios', nomeCidades);
      await salvarDados('objeto', cidades);
    }
    guardarCidades();
  }, [nomeCidades]);

  return (
    <>
      <Scroll>
        <BarraDeStatus barStyle="dark-content" backgroundColor="#FFF" />
        <Titulo>Vamos realizar seu cadastro, precisamos apenas de algumas informações:</Titulo>
        <TituloDoFormulario>Informações Pessoais: </TituloDoFormulario>
        <TextInput
          label="Nome Completo"
          name="nomeCompleto"
          underlineColor="#BDBDBD"
          onChangeText={text => alteraValor('nomeCompleto', text)}
          style={estilos.campoDeTexto}
          mode="outlined"
          theme={theme}
        />
        {errors.nomeCompleto && (
          <Text style={{ color: '#000000' }}>
            {' '}
            {errors.nomeCompleto.message}
            {' '}
          </Text>
        )}
        <TextInput
          label="E-mail"
          name="email"
          keyboardType="email-address"
          style={estilos.campoDeTexto}
          onChangeText={text => alteraValor('email', text)}
          mode="outlined"
          theme={theme}
        />
        {errors.email && (
          <Text style={{ color: '#000000' }}>
            {' '}
            {errors.email.message}
            {' '}
          </Text>
        )}
        <TextInput
          label="Telefone"
          name="telefone"
          keyboardType="number-pad"
          style={estilos.campoDeTexto}
          onChangeText={text => text}
          mode="outlined"
          theme={theme}
          maxLength={15}
          render={props => (
            <TextInputMask
              {...props}
              onChangeText={(formatted, extracted) => {
                props.onChangeText(formatted);
                alteraValor('telefone', extracted);
              }}
              mask="([00]) [00000]-[0000]"
            />
          )}
        />
        {errors.telefone && (
          <Text style={{ color: '#000000' }}>
            {' '}
            {errors.telefone.message}
            {' '}
          </Text>
        )}
        <TextInput
          label="CPF"
          name="cpf"
          keyboardType="number-pad"
          style={estilos.campoDeTexto}
          onChangeText={text => text}
          mode="outlined"
          theme={theme}
          maxLength={14}
          render={props => (
            <TextInputMask
              {...props}
              onChangeText={(formatted, extracted) => {
                props.onChangeText(formatted);
                alteraValor('cpf', extracted);
              }}
              mask="[000].[000].[000]-[00]"
            />
          )}
        />
        {errors.cpf && (
          <Text style={{ color: '#000000' }}>
            {' '}
            {errors.cpf.message}
            {' '}
          </Text>
        )}
        <View style={{ marginTop: 14 }}>
          <Dropdown
            ref={dropdown}
            label="Município de Residência"
            data={nomeCidades}
            labelExtractor={cidade => cidade}
            valueExtractor={cidade => cidade}
            onChangeText={(cidade) => {
              alteraValor('cidade', { id: pegarId(cidade), nome: cidade });
            }}
          />
          <IconDropdown
            style={{
              position: 'absolute', right: 8, top: 30, fontSize: 25
            }}
            name="arrow-drop-down"
            onPress={() => dropdown.current.focus()}
          />
        </View>
        <Button
          disabled={!botaoAtivo}
          label="Próximo"
          style={botaoAtivo ? estilos.botaoHabilitado : estilos.botao}
          labelStyle={{ color: '#fff' }}
          mode="contained"
        >
          Próximo
        </Button>
      </Scroll>
    </>
  );
}

const estilos = StyleSheet.create({
  campoDeTexto: {
    paddingBottom: 16,
    backgroundColor: '#FFF'
  },
  botao: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#BDBDBD',
  },
  botaoHabilitado: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#304FFE'
  },
});