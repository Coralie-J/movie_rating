import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from './components/Login.js';
import { TabScreen } from './components/Onglets.js';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Movie" component={TabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;