import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity,Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Card, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const ProfesseurScreen = ({ route }) => {
  const professor = route.params?.professor;
  const [modifiedProfessor, setModifiedProfessor] = useState(null);
  const navigation = useNavigation();
  const setAuthenticated=route.params?.setAuthenticated;

  const handleInputChange = (key, value) => {
    setModifiedProfessor({ ...modifiedProfessor, [key]: value });
  };

  const handleUpdate = async () => {
    if (validateFields()) {
      try {
        const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: modifiedProfessor?.nom || professor?.nom,
            prenom: modifiedProfessor?.prenom || professor?.prenom,
            tel: modifiedProfessor?.tel || professor?.tel,
            email: professor?.email,
            grade: modifiedProfessor?.grade || professor?.grade,
            specialite: modifiedProfessor?.specialite || professor?.specialite,
            faculteActuelle: modifiedProfessor?.faculteActuelle || professor?.faculteActuelle,
            villeFaculteActuelle:
              modifiedProfessor?.villeFaculteActuelle || professor?.villeFaculteActuelle,
            villeDesiree: modifiedProfessor?.villeDesiree || professor?.villeDesiree,
          }),
        });

        if (response.ok) {
          Alert.alert('Modification réussie', 'Votre profil a été modifié avec succès.', [
            {
              text: 'OK',
            },
          ]);
        } else {
          const error = await response.json();
          console.error('Failed to update professor:', error.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la modification du profil.', [
          {
            text: 'OK',
          },
        ]);
      }
    }
  };
  const validateFields = () => {
    // Perform validation logic here
    return true; // Return true if fields are valid, otherwise false
  };


  const handleDeleteProfessor = async () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer ce professeur ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`https://troubled-red-garb.cyclic.app/professeurs/${professor.email}`);
              Alert.alert('Success', 'Professor deleted successfully');
              
              navigation.goBack();
            } catch (error) {
              const message = error.response?.data?.message || 'An error occurred';
              Alert.alert('Error', message);
            }
          },
        },
      ]
    );
  }

  return (
    
<ScrollView>
<Card>
    <View style={{ paddingHorizontal: 16 }}>
 

      <View style={styles.inputContainer}>
        <Icon name="person" type="material" size={20} color="#777" />
        <Text style={styles.input}> Nom</Text>
        </View>
        <TextInput 
         style={styles.input2}
          placeholder="Nouveau nom"
          value={modifiedProfessor?.nom || professor?.nom}
          onChangeText={(text) => handleInputChange('nom', text)}
        />
      
      <View style={styles.inputContainer}>
        <Icon name="person" type="material" size={20} color="#777" />
        <Text style={styles.input}>Prénom</Text>
        </View>
        <TextInput
        style={styles.input2}
          placeholder="Nouveau prénom"
          value={modifiedProfessor?.prenom || professor?.prenom}
          onChangeText={(text) => handleInputChange('prenom', text)}
        />
      
      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#777" />
        <Text style={styles.input}>téléphone</Text>
        </View>
        <TextInput
        style={styles.input2}
          placeholder="Nouveau téléphone"
          value={modifiedProfessor?.tel || professor?.tel}
          onChangeText={(text) => handleInputChange('tel', text)}
        />
     
      <View style={styles.inputContainer}>
        <Icon name="mail" type="material" size={20} color="#777" />
        <Text style={styles.input}>Email</Text>
        </View>
        <TextInput
        style={styles.input2}
          placeholder="Nouveau email"
          value={professor?.email}
          editable={false}
        />
     
      <View style={styles.inputContainer}>
        <Icon name="badge" type="material" size={20} color="#777" />
        <Text style={styles.input}>Grade</Text>
        </View>
        <TextInput
        style={styles.input2}
          placeholder="Nouveau grade"
          value={modifiedProfessor?.grade || professor?.grade}
          onChangeText={(text) => handleInputChange('grade', text)}
        />
      
      <View style={styles.inputContainer}>
        <Icon name="school" type="material" size={20} color="#777" />
        <Text style={styles.input}>Etablissement (abréviation: FST, FS, EST, ENSA ...)</Text>
        </View>
        <TextInput
        style={styles.input2}
          placeholder="Nouvel établissement"
          value={modifiedProfessor?.faculteActuelle || professor?.faculteActuelle}
          onChangeText={(text) => handleInputChange('faculteActuelle', text)}
        />
     
      <View style={styles.inputContainer}>
        <Icon name="work" type="material" size={20} color="#777" />
        <Text style={styles.input}>Spécialité</Text>
        </View>
        <TextInput
        style={styles.input2}
          placeholder="Nouvelle spécialité"
          value={modifiedProfessor?.specialite || professor?.specialite}
          onChangeText={(text) => handleInputChange('specialite', text)}
        />
      
      <View style={styles.inputContainer}>
        <Icon name="location-on" size={20} color="#777" />
        <Text style={styles.input}>ville actuelle</Text>
        </View>
        <TextInput
        style={styles.input2}
          placeholder="Nouvelle ville actuelle"
          value={modifiedProfessor?.villeFaculteActuelle || professor?.villeFaculteActuelle}
          onChangeText={(text) => handleInputChange('villeFaculteActuelle', text)}
        />
     
      <View style={styles.inputContainer}>
        <Icon name="location-on" size={20} color="#777" />
        <Text style={styles.input}>Villes Désirées</Text>
        </View>
        <TextInput
        style={styles.input2}
          placeholder="Nouvelle ville actuelle souhaitée"
          value={modifiedProfessor?.villeDesiree || professor?.villeDesiree}
          onChangeText={(text) => handleInputChange('villeDesiree', text)}
        />
     

         <View style={styles.buttonContainer}>
         <TouchableOpacity style={styles.button} onPress={handleUpdate}>
  
  <Text style={styles.buttonText}>Modifier</Text>
</TouchableOpacity>
      
<TouchableOpacity style={styles.button} onPress={handleDeleteProfessor}>
  
  <Text style={styles.buttonText}>Supprimer</Text>
</TouchableOpacity>
         </View>
    </View>
</Card>
</ScrollView>

  );
};
const styles = {
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        marginLeft: 9,}
        ,
    input2:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
        marginLeft:9,},
        button: {
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 25,
            width: 130,
            height: 35,
            backgroundColor: 'black',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        
          },
          buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
          },
          buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',}
        }
  
export default ProfesseurScreen;
