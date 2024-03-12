import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native'
import { styles } from './styles'

import { Participant } from '../../components/Participant'
import { useState } from 'react'

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  const isEnoughNameLetters = participantName.length < 1

  function handleParticipantAdd(newParticipant: string) {
    if (participants.includes(newParticipant)) {
      return Alert.alert(
        'Participante já existe!',
        'Há um participante na lista com o mesmo nome'
      )
    }

    setParticipants((prevState) => [...prevState, newParticipant])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert(
      'Remover participante',
      `Tem certeza que deseja remover o participante ${name}?`,
      [
        {
          text: 'Sim',
          onPress: () =>
            setParticipants((prevState) =>
              prevState.filter((participant) => participant !== name)
            ),
        },
        {
          text: 'Não',
          style: 'cancel',
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Segunda, 11 de março de 2024</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity
          style={[styles.button, isEnoughNameLetters && styles.disabledButton]}
          onPress={() => handleParticipantAdd(participantName)}
          disabled={isEnoughNameLetters}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        )}
      />
    </View>
  )
}
