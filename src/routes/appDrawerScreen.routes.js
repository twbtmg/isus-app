import * as React from 'react';
import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Dimensions
} from 'react-native';
import AboutScreen from '../pages/About';
import Login from '../pages/Login';
import PerfilScreen from '../pages/Perfil/index';
import TermoDeUsoScreen from '../pages/Perfil/TermosDeUso/index';
import AppTab from './appBottomTab.routes';
import ConteudoDoDrawer from './conteudoDoDrawer';
import FaleConoscoScreen from '../pages/FaleConoscoScreen';
import SusNoCearaScreen from '../pages/SusNoCeara';
import { ALERTA_FALTA_EPI, RELATAR_SUGESTAO } from '../pages/FaleConoscoScreen/tiposDeOcorrencia';

const Drawer = createDrawerNavigator();
export default function appDrawerScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="SERVICE"
      drawerPosition="left"
      drawerStyle={{
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width / 1.5
      }}
      drawerContent={props => (
        <ConteudoDoDrawer {...props} routeName={props.state.routeNames[props.state.index]} />
      )}
    >
     <Drawer.Screen name="HOME" component={AppTab} />
      <Drawer.Screen name="LOGIN" component={LoginStackScreen} />
      <Drawer.Screen name="PERFIL" component={PerfilStackScreen} />
      <Drawer.Screen name="TERMOS_DE_USO" component={TermosDeUsoStackScreen} />
      <Drawer.Screen name="FEEDBACK" component={FeedbackStackScreen} />
      <Drawer.Screen name="ALERTA_EPI" component={AlertaEpiStackScreen} />
      <Drawer.Screen name="SUS_NO_CEARA" component={SusNoCearaStackScreen} />
      <Drawer.Screen name="SOBRE" component={AboutStackScreen} />
    </Drawer.Navigator>
  );
}

const AboutStack = createStackNavigator();
function AboutStackScreen() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen name="SOBRE" component={AboutScreen} options={{ headerShown: true }} />
    </AboutStack.Navigator>
  );
}

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="ID SAÚDE" component={Login} initialParams={{ possuiIDSaude: false }} options={{ headerShown: true }} />
      <LoginStack.Screen name="LOGIN" component={Login} initialParams={{ possuiIDSaude: true }} options={{ headerShown: true }} />
    </LoginStack.Navigator>
  );
}

const PerfilStack = createStackNavigator();
function PerfilStackScreen() {
  return (
    <PerfilStack.Navigator>
      <PerfilStack.Screen name="PERFIL" component={PerfilScreen} options={{ headerShown: true }} />
    </PerfilStack.Navigator>
  );
}

const TermosDeUsoStack = createStackNavigator();
function TermosDeUsoStackScreen() {
  return (
    <TermosDeUsoStack.Navigator>
      <TermosDeUsoStack.Screen name="TERMOS_DE_USO" component={TermoDeUsoScreen} options={{ headerShown: true }} />
    </TermosDeUsoStack.Navigator>
  );
}

const FeedbackStack = createStackNavigator();
function FeedbackStackScreen() {
  return (
    <FeedbackStack.Navigator>
      <FeedbackStack.Screen
        name="FEEDBACK"
        component={FaleConoscoScreen}
        options={{ headerShown: true }}
        initialParams={{ ocorrencia: RELATAR_SUGESTAO }}
      />
    </FeedbackStack.Navigator>
  );
}

const AlertaEpiStack = createStackNavigator();
function AlertaEpiStackScreen() {
  return (
    <AlertaEpiStack.Navigator>
      <AlertaEpiStack.Screen
        name="ALERTA_EPI"
        component={FaleConoscoScreen}
        options={{ headerShown: true }}
        initialParams={{ ocorrencia: ALERTA_FALTA_EPI }}
      />
    </AlertaEpiStack.Navigator>
  );
}

const SusNoCearaStack = createStackNavigator();
function SusNoCearaStackScreen() {
  return (
    <SusNoCearaStack.Navigator>
      <SusNoCearaStack.Screen
        name="SUS_NO_CEARA"
        component={SusNoCearaScreen}
        options={{ headerShown: true }}
      />
    </SusNoCearaStack.Navigator>
  );
}
