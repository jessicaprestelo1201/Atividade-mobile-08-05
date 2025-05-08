import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]); // [{ name, phone }]
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function addOrEditContact() {
    if (!newName.trim() || !newPhone.trim()) return;

    const updated = [...contacts];
    const contact = { name: newName.trim(), phone: newPhone.trim() };

    if (editIndex === null) {
      updated.push(contact);
    } else {
      updated[editIndex] = contact;
      setEditIndex(null);
    }

    setContacts(updated);
    setNewName("");
    setNewPhone("");
    setModalVisible(false);
  }

  function confirmDelete(index) {
    Alert.alert("Excluir contato?", `Remover "${contacts[index].name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          const updated = [...contacts];
          updated.splice(index, 1);
          setContacts(updated);
        },
      },
    ]);
  }

  function openEditModal(index) {
    setNewName(contacts[index].name);
    setNewPhone(contacts[index].phone);
    setEditIndex(index);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setNewName("");
          setNewPhone("");
          setEditIndex(null);
          setModalVisible(true);
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>＋ Novo Contato</Text>
      </Pressable>

      <FlatList
        data={contacts}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => (
          <View style={styles.contactItemContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactItem}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <View style={styles.contactButtons}>
              <Pressable
                onPress={() => openEditModal(index)}
                style={[styles.contactButton, styles.editButton]}
              >
                <Text style={styles.buttonText}>✏️</Text>
              </Pressable>
              <Pressable
                onPress={() => confirmDelete(index)}
                style={[styles.contactButton, styles.deleteButton]}
              >
                <Text style={styles.buttonText}>🗑️</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum contato ainda!</Text>
        }
      />

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 8 }}>
              {editIndex === null ? "Novo Contato" : "Editar Contato"}
            </Text>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="Nome do contato"
              style={styles.input}
            />
            <TextInput
              value={newPhone}
              onChangeText={setNewPhone}
              placeholder="Telefone (ex: (11) 99999-8888)"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <Pressable onPress={addOrEditContact} style={{ marginBottom: 8 }}>
              <Text style={{ color: "#f48fb1", textAlign: "center" }}>
                {editIndex === null ? "Adicionar" : "Salvar alterações"}
              </Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ color: "#999", textAlign: "center" }}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff0f5",
  },
  addButton: {
    marginBottom: 16,
    alignSelf: "center",
    backgroundColor: "#f48fb1",
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  contactItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#ffe4e1",
    borderRadius: 6,
  },
  contactItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#880e4f",
  },
  contactPhone: {
    fontSize: 14,
    color: "#ad1457",
  },
  contactButtons: {
    flexDirection: "row",
    marginLeft: 8,
  },
  contactButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 4,
  },
  editButton: {
    backgroundColor: "#ce93d8",
  },
  deleteButton: {
    backgroundColor: "#f06292",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    color: "#ba68c8",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fffafc",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f8bbd0",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: "#fff0f5",
  },
});
