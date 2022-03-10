import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Button, Text, TextInput, View } from "react-native";


const LoginScreen = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState(false);
    const [isConnected, setConnected] = useState(false);

    const user = {
        login: "toto",
        password: "toto" 
    };

 
    const navigation = useNavigation();

    useEffect(() => {
        if (password.trim() != '' && login.trim() != '') {
            setValidate(true);
        } else {
            setValidate(false);
        }
    }, [login, password]);

    const checkConnexion = () => {
        if (! isConnected){
            if (login == user.login && password == user.password) {
                setConnected(true);
            }
        } else {
            setConnected(false);
        }
    }

    return (
        <View>
            <Text>Login : </Text>
            <TextInput value={login} onChangeText={setLogin} />
            <Text>Password : </Text>
            <TextInput value={password} onChangeText={setPassword} />
            <Button title={isConnected ? "Logout" : "Login"} onPress={checkConnexion} disabled={!validate} />
            <Text>{isConnected ? "Bienvenue toto" : ""}</Text>
            <Button title="Voir la liste des films" onPress={() => navigation.navigate("Movie")} />
            <Button title="Réglages" onPress={() => navigation.navigate("Settings")} />
        </View>
    );
};

export  {LoginScreen};