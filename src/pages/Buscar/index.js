import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import { Caption, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getBusca } from '../../apis/apiHome';

export default class Buscar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      data: [],
      page: 1,
      loading: false,
      text: '',
      ultimoTermo: ''
    };
  }

  loadRepositories = async () => {
    if (this.state.loading) return;
    this.setState({ loading: true });
    // Verificando a ultima consulta, caso seja diferente, reseta os valores do objeto
    if(this.state.ultimoTermo !== this.state.text) {
      this.state.data = [];
      this.state.page = 1;
    }
    this.setState({ ultimoTermo: this.state.text })
    const response = await getBusca(this.state.text, this.state.page);
    this.setState({
      data: [ ...this.state.data, ...response.data.data ],
      page: this.state.page + 1,
      loading: false,
    });      

  }

  verificarListaVazia = () => {    
    return (
      <Caption style={styles.emptyText}>
        Nenhuma informação encontrada ou faça a sua pesquisa
      </Caption>
    );    
  }

  /* FUNÇÃO SOMENTE PARA MOSTRAR UM CONTEÚDO COM INFORMAÇÃO INICIAL OU CASO NÃO
  ENCONTRE NENHUM ARTIGO */
  // eslint-disable-next-line no-shadow
  infoPreview() {
    // VERIFICANDO SE TEM TEXTO E SE TEM DADOS, CASO NÃO MOSTRA MENSAGEM INICIAL
    return (
      <Caption style={styles.emptyText}>
        Busque por conteúdos em
          <Text style={styles.textNegrito}> Educação Permanente </Text>
          e
          <Text style={styles.textNegrito}> Pesquisas Científicas. </Text>
      </Caption>
    );
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#468A04" size="large" />
      </View>
    );
  };


  runSearch(texto) {
    console.log({texto})
    this.setState({ text: texto})
  }

  createItem(item, navigation) {
    console.log(item);
    return (
      <View style={styles.backgroundColor}>
        <TouchableOpacity
          style={styles.backgroundColor}
          onPress={() => navigation.navigate('Descrição', { object: { id: item.ID } })}
        >
          <View style={styles.content}>
            {item.image ? (
              <Image
                resizeMode="contain"
                style={styles.contentImage}
                source={{ uri: `${item.image}` }}
              />
            ) : (
              <View
                style={styles.contentImage}
              />
            )}
            <Caption style={styles.contentSubtitle}>
              {item.post_title}
            </Caption>
          </View>
          <Divider style={styles.divider} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    navigation.setOptions({
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },

      headerTitle: () => (
        <TextInput
          autoFocus
          placeholder="Buscar"
          placeholderTextColor="#FFFFFF"
          value={this.state.text}
          style={styles.searchHeaderText}
          // eslint-disable-next-line no-shadow
          onChangeText={text =>this.setState({text: text})}
        />
      ),

      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 23
          }}
          mode="contained"
          onPress={() => this.loadRepositories()}
        >
          <Icon name="magnify" size={30} color="#ffffff" />
        </TouchableOpacity>
      ),

      headerLeft: () => (
        <TouchableOpacity
          style={styles.searchHeaderBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
    
    return (
      <View style={styles.emptyBackground}>
        {this.state.text.length === 0 ? (          
          this.infoPreview()
        ) : (
          <FlatList
          data={this.state.data}
          renderItem={({ item }) => this.createItem(item, navigation)}
          keyExtractor={item => item.id}
          onEndReached={this.loadRepositories}
          onEndReachedThreshold={0.2}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.verificarListaVazia}
        />
        )}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },

  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 30,
  },
  backgroundColor: {
    backgroundColor: '#fff'
  },
  searchHeaderBack: {
    marginHorizontal: 20
  },
  searchHeaderText: {
    backgroundColor: 'transparent',
    width: 200,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0.5,
    color: '#F2F2F2',
    opacity: 0.87
  },
  searchHeaderIcon: {
    marginHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13
  },
  contentSubtitle: {
    maxWidth: 200,
    height: 60,
    left: 16,
    right: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    textAlignVertical: 'center',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: '#00000099',
  },
  contentImage: {
    height: 80,
    width: 80,
    marginLeft: 32,
  },
  emptyBackground: {
    flex: 1,
  },
  emptyText: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'row',
    padding: 10,
    fontSize: 15,
    color: '#00000099',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  textNegrito: {
    fontWeight: 'bold'
  }
});
