import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, Text, TextInput, View, Image, Pressable, FlatList } from "react-native";

const SearchIMDBScreen = () => {

    const [recherche, setRecherche ] = useState("");
    const [movies, setMovies] = useState([]);
    const baseUrl = "https://imdb-api.com/en/API/SearchMovie/k_81ysoqkd/";
    let [message, setMessage] = useState("");

    const fetchMovies = async () => {
        let request =  await fetch(`${baseUrl}${recherche}`);
        let json = await request.json();
        let matchingMovies = json["results"];
        let error = json["errorMessage"];
        if (error.indexOf("Maximum usage") != -1){
            setMessage(error);
        } else if (matchingMovies == null){
            setMessage("Aucun film ne correspond à votre recherche");
        }
        setMovies(matchingMovies);
    };

    useEffect(() => {
        fetchMovies();
    }, [recherche]);


    return (
        <View>
            <View style={{ flexDirection: 'row', borderColor: 'grey', borderWidth: 1,
             borderRadius: 20, marginLeft: 5, marginTop: 10, marginBottom: 10, width: '97%' }}>
                <Ionicons name="search-outline" size={20} color="grey" style={{ textAlignVertical: 'center', marginRight: 5, marginLeft: 5 }} />
                <TextInput placeholder="Rechercher" value={recherche} onChangeText={setRecherche} />
            </View>
            <Text style={{textAlign: "center"}}>{message}</Text>
            <FlatList
                data={movies}
                renderItem={({ item }) => (               
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', height: 150 }}>
                        <Image source={{ uri : item.image}} style={{ width: 100, height: 200, resizeMode: 'contain' }} />
                        <View style={{width: '90%'}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
                            <Text style={{ fontSize: 14 }}> Résumé : {item.description}</Text>
                        </View>
                    </View>     
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
};

export {SearchIMDBScreen};