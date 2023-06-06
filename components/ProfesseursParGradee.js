import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { PieChart } from 'react-native-chart-kit';

const ProfesseursParGradee = () => {
  const [professeurs, setProfesseurs] = useState([]);

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => setProfesseurs(data))
      .catch(error => console.error(error));
  }, []);

  const countProfesseursParGrade = () => {
    const counts = {};
    professeurs.forEach(professeur => {
      const { grade } = professeur;
      if (counts[grade]) {
        counts[grade]++;
      } else {
        counts[grade] = 1;
      }
    });
    return counts;
  };

  const professeursParGrade = Object.entries(countProfesseursParGrade())
    .sort((a, b) => b[1] - a[1])
    .map(([grade, count]) => ({ grade, count }));

  const defaultColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#800080', '#008000', '#800000', '#808000', '#008080', '#000080', '#ff6347', '#00ced1', '#ff8c00'];
  const chartColors = defaultColors.slice(0, professeursParGrade.length);

  const dataprofesseursParGrade = professeursParGrade.map(({ grade, count }, index) => ({
    name: grade,
    population: count,
    color: chartColors[index % chartColors.length],
   
  }));

  return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Card>
          <Card.Title style={{ textAlign: 'center' }}>Nombre de profs par grade :</Card.Title>
          <Card.Divider />
          <View style={{ alignItems: 'center' }}>
            <PieChart
              data={dataprofesseursParGrade}
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
              {professeursParGrade.map(({ grade, count }, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 5 }}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: chartColors[index % chartColors.length], marginRight: 5 }} />
                  <Text style={{ marginLeft: 5 }}>{grade}</Text>
                  <Text style={{ marginLeft: 5 }}>{count}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
      </View>
    
  );
};

export default ProfesseursParGradee;