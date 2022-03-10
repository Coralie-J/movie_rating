import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, Text, TextInput, View, Image, Pressable, FlatList } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    let [movies, setMovie] = useState([
        {
            id: 0,
            titre: 'The Suicide Squad',
            image: require('../assets/The_Suicide_Squad.jpg'),
            resume: `
        Face à une menace aussi énigmatique qu'invincible, l'agent secret Amanda Waller réunit une armada de crapules de la pire espèce. 
        Armés jusqu'aux dents par le gouvernement, ces Super-Méchants s'embarquent alors pour une mission-suicide. Jusqu'au moment où ils 
        comprennent qu'ils ont été sacrifiés.`,
            notes: 3.5,
            lienIMDB: 'https://www.imdb.com/title/tt1386697/'
        },
        {
            id: 1,
            titre: 'Les Aventures de Rabi Jacob',
            image: require('../assets/les-aventures-de-rabbi-jacob.jpg'),
            resume: `Victor Pivert, homme d’affaires irascible et foncièrement xénophobe, se rend à Paris 
          pour le mariage de sa fille. Victime d’un accident de la route sans gravité, il entre dans une usine de 
          chewing-gum pour trouver du secours. Là, il croise le chemin de dangereux terroristes qui s’apprêtent à 
          éliminer un leader révolutionnaire nommé Slimane. Celui-ci parvient à s’échapper aux côtés de Victor Pivert. 
          Les deux hommes gagnent l’aéroport d’Orly, bientôt suivis par leurs ravisseurs. Pour leur échapper, ils n’auront d’autre 
          choix que de se déguiser en rabbins. Pivert est alors pris pour Rabbi Jacob, sommité new-yorkaise attendue
          en grande pompe par la communauté juive de la rue des Rosiers`,
            notes: 4.9,
            lienIMDB: 'https://www.imdb.com/title/tt0069747/'
        },
        {
            id: 2,
            titre: 'Magnum P.I',
            image: require('../assets/Magnum_P.I._Season_3_Poster.jpg'),
            resume: `A son retour d\'Afghanistan, Thomas Magnum,officier décoré de l\'unité d\'élite des SEAL de la Marine
          américaine,s\'installe à Hawaï. Tout en assurant la sécurité du domaine du richissime Robin Master, Magnum, 
          hébergé sur la propriété dans la maison des invités, officie en tant que détective privé.`,
            notes: 4.9,
            lienIMDB: 'https://www.imdb.com/title/tt7942796/?ref_=nm_flmg_act_4'
        },
        {
            id: 3,
            titre: 'Taxi 3',
            image: require('../assets/taxi_3.jpeg'),
            resume: `Marseille, à l\'approche de Noël. Daniel ne cesse de rajouter des gadgets à son taxi.
        Au point de faire passer son bolide avant sa compagne, Lilly, qui décide de retourner vivre chez ses parents.
        Petra, elle, reproche à Emilien d\'avoir la tête ailleurs. Celui-ci enrage en effet de ne pas avoir encore arrêté
        le gang des pères Noël, qui multiplie les braquages depuis huit mois.`,
            notes: 4.4,
            lienIMDB: 'https://www.imdb.com/title/tt0295721/'
        }
    ]);

    const [movieMatchSearch, setMovieMatchSearch ] = useState(movies);
    const [recherche, setRecherche] = useState("");
    const [isCheckedNom, setCheckedNom] = useState(false);
    const [isCheckedNote, setCheckedNote] = useState(false);

    const triFilmsNom = (key) => {
        let titres = movieMatchSearch.map((f) => f[key]);
        titres.sort();
        let sorted_movies = [];
        let indice;
        for (let i=0; i < titres.length; i++){
            indice = movieMatchSearch.findIndex((movie) => movie[key] == titres[i] && sorted_movies.indexOf(movie) == -1);
            if (indice !== undefined)
                sorted_movies.push(movieMatchSearch[indice]);
        }
        setMovieMatchSearch(sorted_movies);
    }

    const addMovie = (titre, resume, note, lienIMDB) => {
        setMovie((current) => [...current, { id: current.length, titre: titre, resume: resume, notes: note, lienIMDB: lienIMDB }])
    };

    useFocusEffect(() => {
        if ((!route.params.titre) && (!route.params.resume) && (!route.params.note) && (!route.params.lienIMDB)) return;
        addMovie(route.params.titre, route.params.resume, route.params.note, route.params.lienIMDB);
        route.params.titre = null;
        route.params.resume = null;
        route.params.note = null;
        route.params.lienIMDB = null;
    });

    useEffect(() =>{
        if (recherche.trim() == ""){
            setMovieMatchSearch(movies);
            isCheckedNom ? triFilmsNom("titre") : setMovieMatchSearch(movies);
            // isCheckedNote ? triFilmsNom("notes") : setMovieMatchSearch(movies);
        } else {
            setMovieMatchSearch(movies.filter(movie => movie.titre.indexOf(recherche.toLowerCase()) != -1 || movie.titre.indexOf(recherche.toUpperCase()) != -1));
            isCheckedNom ? triFilmsNom("titre") : setMovieMatchSearch(movies.filter(movie => movie.titre.indexOf(recherche.toLowerCase()) != -1 || movie.titre.indexOf(recherche.toUpperCase()) != -1 ));
            // isCheckedNote ? triFilmsNom("notes") : setMovieMatchSearch(movies.filter(movie => movie.titre.indexOf(recherche.toLowerCase()) != -1 || movie.titre.indexOf(recherche.toUpperCase()) != -1));
        }
    }, [recherche, movies, isCheckedNom, isCheckedNote]);


    return (
        <View>
            <View style={{flexDirection:'row', borderColor: 'grey', borderWidth: 1, borderRadius: 20, marginLeft: 5, marginTop: 10, marginBottom: 10, width: '97%' }}>
                <Ionicons name="search-outline" size={20} color="grey" style={{ textAlignVertical:'center', marginRight: 5, marginLeft: 5 }} />
                <TextInput placeholder="Rechercher" value={recherche} onChangeText={setRecherche} />
            </View>
            <View style={{flexDirection: 'row', width: '80%', flexWrap: 'nowrap'}}>
                <Text>Trier par : </Text>
                <BouncyCheckbox isChecked={isCheckedNom} onPress={() => setCheckedNom(!isCheckedNom)} />
                <Text>Nom</Text>
                <BouncyCheckbox isChecked={isCheckedNote} onPress={() => setCheckedNote(!isCheckedNote)} />
                <Text>Note</Text>
            </View>
            <FlatList style={{marginBottom: 50}}
                data={movieMatchSearch}
                renderItem={({ item }) => (
                    <Pressable onPress={() => navigation.navigate("Détails", { movie: item })}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', height:205 }}>
                            <Image source={item.image ? item.image : require('../assets/unknown_affiche.jpg')} style={{ width: 100, height: 200, resizeMode: 'contain' }} />
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.titre}</Text>
                        </View>
                    </Pressable>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export {HomeScreen};