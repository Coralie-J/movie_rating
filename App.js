import { NavigationContainer, useFocusEffect, useNavigation, useRoute,} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { Button, ScrollView, Text, TextInput, View, Image, TouchableOpacity, requireNativeComponent } from "react-native";


const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();


  let [movies, setMovie] = useState([
    {
      id: 0,
      titre: 'The Suicide Squad',
      image: require('./assets/The_Suicide_Squad.jpg'),
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
      image: require('./assets/les-aventures-de-rabbi-jacob.jpg'),
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
      image: require('./assets/Magnum_P.I._Season_3_Poster.jpg'),
      resume: `A son retour d\'Afghanistan, Thomas Magnum,officier décoré de l\'unité d\'élite des SEAL de la Marine
          américaine,s\'installe à Hawaï. Tout en assurant la sécurité du domaine du richissime Robin Master, Magnum, 
          hébergé sur la propriété dans la maison des invités, officie en tant que détective privé.`,
      notes: 4.9,
      lienIMDB: 'https://www.imdb.com/title/tt7942796/?ref_=nm_flmg_act_4'
    },
    {
      id: 3,
      titre: 'Taxi 3',
      image: require('./assets/taxi_3.jpeg'),
      resume: `Marseille, à l\'approche de Noël. Daniel ne cesse de rajouter des gadgets à son taxi.
        Au point de faire passer son bolide avant sa compagne, Lilly, qui décide de retourner vivre chez ses parents.
        Petra, elle, reproche à Emilien d\'avoir la tête ailleurs. Celui-ci enrage en effet de ne pas avoir encore arrêté
        le gang des pères Noël, qui multiplie les braquages depuis huit mois.`,
      notes: 4.9,
      lienIMDB: 'https://www.imdb.com/title/tt0295721/'
    }
  ]);

  const addMovie = (titre, resume, note, lienIMDB) => {
    setMovie((current) => [...current, {id: current.length, titre: titre, resume: resume, notes: note, lienIMDB: lienIMDB }])
  };

  useFocusEffect(() => {
    if ((!route.params.titre) && (!route.params.resume) && (!route.params.note) && (!route.params.lienIMDB)) return;
    addMovie(route.params.titre, route.params.resume, route.params.note, route.params.lienIMDB);
    route.params.titre = null;
    route.params.resume = null; 
    route.params.note = null;
    route.params.lienIMDB = null;
  });

  const listing = () => {
    return movies.map((movie) => {
      let source = movie.image != null ? movie.image : require('./assets/unknown_affiche.jpg');
      return (
        <View key={movie.id} style={{ margin: 10, display:'flex', flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: '10%', marginRight: 15 }} onPress={() => navigation.navigate("Détails", { movie: movie })}>
            <Image source={source} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
          </TouchableOpacity>
          <View style={{width: '89%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{movie.titre}</Text>
            <Text style={{ fontWeight: 'bold', marginBottom: 10}}>Résumé </Text>
            <Text style={{ marginBottom: 20 }}>{movie.resume.replace('\n', ' ').replace(/\s+/g, ' ').trim()}</Text>
            <Text style={{ marginBottom: 10, fontSize: 15 }}>Note : {movie.notes}/5</Text>
          </View>
        </View>
      );
    });
  };

  return (
    <View>
      <ScrollView>
        {listing()}
      </ScrollView>
      <Button title="Add film" onPress={() => navigation.navigate("Add")} />
    </View>
  );
};

const AddMovieScreen = () => {

  const [titre, setTitre] = useState("");
  const [resume, setResume] = useState("");
  const [note, setNote] = useState("");
  const [lien, setLien] = useState("");
  const [validate, setValidate ] = useState(false);
  
  const navigation = useNavigation();

  useEffect(() => {
    if (titre.trim() && +note && note < 6 && resume.trim() && lien.indexOf('imdb') != -1 && lien.startsWith("http")){
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
      <Button title="Valider" disabled={!validate} onPress={() => navigation.navigate("Détails", { titre: titre , resume: resume, note: note, lienIMDB: lien })} />
    </View>
  );
};

const DetailScreen = () => {
  
  const route = useRoute();
  const navigation = useNavigation();

  // let movie = route.params.movie;
  
  //if (movie == null)
  let movie = { titre: route.params.titre, resume: route.params.resume, note: route.params.note, lienIMDB: route.params.lienIMDB };
  let source = movie.image ? movie.image : require('./assets/unknown_affiche.jpg');
  
  return (
    <View>
      <View style={{ width: '10%', marginRight: 15 }} >
        <Image source={source} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
      </View>
      <View style={{ width: '89%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{movie.titre}</Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Résumé </Text>
        <Text style={{ marginBottom: 20 }}>{movie.resume.replace('\n', ' ').replace(/\s+/g, ' ').trim()}</Text>
        <Text style={{ marginBottom: 10, fontSize: 15 }}>Note : {movie.notes}/5</Text>
        <Text>Lien IMDB : {movie.lienIMDB}</Text>
      </View>

      <Button title="Retour à la liste des films" onPress={() => navigation.navigate("Home", movie)} />

    </View>
  )
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{
            titre: null, 
            resume: null, 
            note: null, 
            lienIMDB: null
          }}
        />
        <Stack.Screen name="Add" component={AddMovieScreen} />
        <Stack.Screen name="Détails" component={DetailScreen} initialParams={{
          movie: null, 
          titre: null,
          resume: null,
          note: null,
          lienIMDB: null}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;