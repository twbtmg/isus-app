import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TagNotificacaoEstagio({ estagio, versaoManejo }) {
  const notificacao = (
    <View style={estilos.containerDaTag}>
      <Text style={estilos.textoDaTag}> NOVIDADE </Text>
    </View>
  );

  const estagioNaoVisto = () => versaoManejo && versaoManejo.visualizacoes[`estagio${estagio.id}`] !== undefined && !versaoManejo.visualizacoes[`estagio${estagio.id}`];

  const renderizarNotificacao = () => (estagioNaoVisto() ? notificacao : <></>);

  return renderizarNotificacao();
}

const estilos = StyleSheet.create({
  containerDaTag: {
    borderRadius: 40,
    backgroundColor: '#E36156',
    width: 88,
    padding: 1,
    textAlign: 'center'
  },
  textoDaTag: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    textAlign: 'center'
  }

});
