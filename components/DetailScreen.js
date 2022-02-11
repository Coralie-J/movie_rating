import {useRoute} from "@react-navigation/native";
import {ScrollView, Text, View, Image } from "react-native";

const DetailScreen = () => {

    const route = useRoute();
    let movie = route.params.movie;

    if (movie != null) {
        let source = movie.image ? movie.image : require('./assets/unknown_affiche.jpg');

        return (
            <ScrollView>
                <View>
                    <View style={{ width: '100%', marginRight: 15 }} >
                        <Image source={source} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                    </View>
                    <View style={{ width: '100%', marginLeft: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, textAlign: 'center' }}>{movie.titre}</Text>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Résumé </Text>
                        <Text style={{ marginBottom: 20 }}>{movie.resume.replace('\n', ' ').replace(/\s+/g, ' ').trim()}</Text>
                        <Text style={{ marginBottom: 10, fontSize: 15 }}>Note : {movie.notes}/5</Text>
                        <Text>Lien IMDB : {movie.lienIMDB}</Text>
                    </View>

                </View>
            </ScrollView>
        );
    }

    return (
        <View>
            <Text> Aucun film selectionné</Text>
        </View>
    );

}