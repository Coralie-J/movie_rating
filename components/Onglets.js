import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { HomeScreen } from './Home';
import { AddMovieScreen } from './Add';
import { DetailScreen } from './DetailScreen';
import { SearchIMDBScreen } from './Search_IMDB';

const TabScreen = () => {
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;

                    if (route.name == "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name == "Add") {
                        iconName = focused ? "add" : "add-outline";
                    } else if (route.name == "Détails") {
                        iconName = focused ? "information-circle" : "information-circle-outline";
                    } else if (route.name == "IMDB") {
                        iconName = focused ? "search-circle" : "search-circle-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "grey",
                headerShown: false
            })}
        >
            <Tabs.Screen name="Home" component={HomeScreen} initialParams={{
                titre: null,
                resume: null,
                note: null,
                lienIMDB: null
            }} />
            <Tabs.Screen name="Add" component={AddMovieScreen} />
            <Tabs.Screen name="Détails" component={DetailScreen} initialParams={{ movie: null }} />
            <Tabs.Screen name="IMDB" component={SearchIMDBScreen} />
        </Tabs.Navigator>
    );
};

export {TabScreen};