import { View, Text ,ScrollView} from 'react-native'
import React from 'react'
import ProfesseursParGradee from './ProfesseursParGradee'
import ProfesseursParSpecialitee from './ProfesseursParSpecialitee'
import VillesDesireess from './VillesDesireess'

export default function Home() {
  return (
    <View>
      <ScrollView>
        <ProfesseursParSpecialitee/>
        <ProfesseursParGradee/>
        <VillesDesireess />
      </ScrollView>
    </View>
  )
}