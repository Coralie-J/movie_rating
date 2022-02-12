import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Button, Text, TextInput, View } from "react-native";


const LoginScreen = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState(false);

    const [users, setUsers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        if (password.trim() != '' && login.trim() != '') {
            setValidate(true);
        } else {
            setValidate(false);
        }
    }
        , [login, password]);

    const addUser = () => {
        setUsers((current) => [...current, { id: current.length, login: login, password: password }]);
    };

    return (
        <View>
            <Text>Login : </Text>
            <TextInput value={login} onChangeText={setLogin} />
            <Text>Password : </Text>
            <TextInput value={password} onChangeText={setPassword} />
            <Button title="Add user" onPress={addUser} disabled={!validate} />
            <Button title="Voir la liste des films" onPress={() => navigation.navigate("Movie")} />
        </View>
    );
};

export  {LoginScreen};