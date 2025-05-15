import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, RadioButton, Button } from "react-native-paper";

export default function ContactForm({ initialData, onSave, onCancel }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [category, setCategory] = useState("pessoal");
  
    useEffect(() => {
      if (initialData) {
        setName(initialData.name);
        setPhone(initialData.phone);
        setCategory(initialData.category);
      } else {
        setName("");
        setPhone("");
        setCategory("pessoal");
      }
    }, [initialData]);
  
    function handleSubmit() {
      onSave({ name, phone, category });
    }
  
    return (
      <View>
        <TextInput
          label="Nome"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          label="Telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <RadioButton.Group onValueChange={setCategory} value={category}>
          <View>
            <RadioButton.Item label="Pessoal" value="pessoal" />
            <RadioButton.Item label="Trabalho" value="trabalho" />
            <RadioButton.Item label="Família" value="família" />
          </View>
        </RadioButton.Group>
        <View style={styles.buttons}>
          <Button onPress={onCancel} mode="text">
            Cancelar
          </Button>
          <Button onPress={handleSubmit} mode="contained" style={styles.saveButton}>
            {initialData ? "Salvar" : "Adicionar"}
          </Button>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    input: {
      marginBottom: 10,
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 10,
    },
    saveButton: {
      marginLeft: 10,
    },
  });
  