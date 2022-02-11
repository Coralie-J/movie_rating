import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Button, Text, TextInput, View } from "react-native";


const AddMovieScreen = () => {

    const [titre, setTitre] = useState("");
    const [resume, setResume] = useState("");
    const [note, setNote] = useState("");
    const [lien, setLien] = useState("");
    const [validate, setValidate] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        if (titre.trim() && +note && note < 6 && resume.trim() && lien.indexOf('imdb') != -1 && lien.startsWith("http")) {
            setValidate(true);
        } else {
            setValidate(false);
        }
    }, [note, titre, resume, lien]);

    return (
        <View>
            <Text> Nom du film </Text>
            <TextInput value={titre} placeholder="add element..." onChangeText={setTitre} />
            <Text> Résumé personnel / Commentaires </Text>
            <TextInput value={resume} placeholder="add element..." onChangeText={setResume} />
            <Text> Note sur 5</Text>
            <TextInput value={note} placeholder="add element..." onChangeText={setNote} />
            <Text> Lien IMDB </Text>
            <TextInput value={lien} placeholder="add element..." onChangeText={setLien} />
            <Button title="Valider" disabled={!validate} onPress={() => navigation.navigate("Home", { titre: titre, resume: resume, note: note, lienIMDB: lien })} />
        </View>
    );
};

export default AddMovieScreen;