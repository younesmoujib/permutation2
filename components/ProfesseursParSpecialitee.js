import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { PieChart } from 'react-native-chart-kit';

const ProfesseursParSpecialitee = () => {
  const [professeurs, setProfesseurs] = useState([]);

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => setProfesseurs(data))
      .catch(error => console.error(error));
  }, []);

  const countProfesseursParSpecialite = () => {
    const counts = {};
    professeurs.forEach(professeur => {
      const { specialite } = professeur;
      if (counts[specialite]) {
        counts[specialite]++;
      } else {
        counts[specialite] = 1;
      }
    });
    return counts;
  };

  const specialitesSorted = Object.entries(countProfesseursParSpecialite())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([specialite, count]) => ({ specialite, count }));

  const defaultColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#800080', '#008000', '#800000', '#808000', '#008080', '#000080', '#ff6347', '#00ced1', '#ff8c00'];
  const chartColors = defaultColors.slice(0, specialitesSorted.length);

  const dataSpecialites = specialitesSorted.map(({ specialite, count }, index) => ({
    name: specialite,
    population: count,
    color: chartColors[index % chartColors.length],
  }));

  return (
  
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Card>
          <Card.Title style={{ textAlign: 'center' }}>Nombre de professeurs par spécialité :</Card.Title>
          <Card.Divider />
          <View style={{ alignItems: 'center' }}>
            <PieChart
              data={dataSpecialites}
              width={Dimensions.get('window').width}
              height={300}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft={70}
              absolute
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
              {specialitesSorted.map(({ specialite, count }, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 5 }}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: chartColors[index % chartColors.length], marginRight: 5 }} />
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 5 }}>{specialite}</Text>
                    <Text style={{ marginLeft: 5 }}>{count}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Card>
      </View>
  
  );
};

export default ProfesseursParSpecialitee;