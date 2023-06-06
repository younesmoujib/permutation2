import React, { useState } from 'react';
import { View, TextInput ,Alert,TouchableOpacity,Text } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const SignupForm = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [faculteActuelle, setFaculteActuelle] = useState('');
  const [villeFaculteActuelle, setVilleFaculteActuelle] = useState('');
  const [villeDesiree, setVilleDesiree] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const formData = {
      nom,
      prenom,
      tel,
      email,
      grade,
      specialite,
      faculteActuelle,
      villeFaculteActuelle,
      villeDesiree,
      password
    };

    axios.post('https://troubled-red-garb.cyclic.app/professeurs', formData)
      .then(response => {
        // Traitement de la réponse si nécessaire
        console.log(response.data);
        Alert.alert('Inscription réussie');
      })
      .catch(error => {
        // Gestion des erreurs
        console.error(error);
        Alert.alert('Erreur lors de l\'inscription');
      });
  };

  return (
    <ScrollView>
      <Card>
      <Card.Title style={{ textAlign: 'center' }}>Inscription</Card.Title>
      <Card.Divider />

      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.inputContainer}>
          <Icon name="person" type="material" />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={nom}
            onChangeText={text => setNom(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="person" type="material" />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={prenom}
            onChangeText={text => setPrenom(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="phone" type="material" />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            value={tel}
            onChangeText={text => setTel(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="mail" type="material" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" type="material" />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe "
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="badge" type="material" />
          <TextInput
            style={styles.input}
            placeholder="Grade"
            value={grade}
            onChangeText={text => setGrade(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="school" type="material" />
          <TextInput
            style={styles.input}
            placeholder="Etablissement (abréviation: FST, FS, EST, ENSA ...)"
            value={faculteActuelle}
            onChangeText={text => setFaculteActuelle(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="work" type="material" />
          <TextInput
            style={styles.input}
            placeholder="Spécialité"
            value={specialite}
            onChangeText={text => setSpecialite(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="location-on" type="material" />
          <TextInput
            style={styles.input}
            placeholder="Ville Actuelle"
            value={villeFaculteActuelle}
            onChangeText={text => setVilleFaculteActuelle(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="location-on" type="material" />
          <TextInput
            style={styles.input}
            placeholder=" Villes Désirées"
            value={villeDesiree}
            onChangeText={text => setVilleDesiree(text)}
          />
        </View>

        
      </View>

     
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
  
  <Text style={styles.buttonText}>Envoyer</Text>
</TouchableOpacity>
    </Card>
    </ScrollView>
  );
};

const styles = {
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
    

  },
  input: {
    flex: 1,
    marginLeft: 4,
  },
  button: {
    marginTop: 16,
  },button: {
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
  }
};

export default SignupForm;
