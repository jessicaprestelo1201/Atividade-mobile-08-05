import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Button,
  Dialog,
  TextInput,
  Portal,
  Provider as PaperProvider,
  List,
  Avatar,
  FAB,
} from "react-native-paper";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null); // null, index ou "new"
  const [deleteId, setDeleteId] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("pessoal");

  useEffect(() => {
    if (editId !== null && editId !== "new") {
      const c = contacts[editId];
      setName(c.name);
      setPhone(c.phone);
      setCategory(c.category);
    } else if (editId === "new") {
      setName("");
      setPhone("");
      setCategory("pessoal");
    }
  }, [editId]);

  function saveContact() {
    if (!name.trim() || !phone.trim()) return;

    if (editId === "new") {
      setContacts([...contacts, { name, phone, category }]);
    } else {
      const updated = [...contacts];
      updated[editId] = { name, phone, category };
      setContacts(updated);
    }
    setEditId(null);
  }

  function handleDelete(id) {
    const updated = [...contacts];
    updated.splice(id, 1);
    setContacts(updated);
    setDeleteId(null);
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <FlatList
          data={contacts}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item, index }) => (
            <List.Item
              title={item.name}
              description={`${item.phone} • ${item.category}`}
              left={() => (
                <Avatar.Text
                  label={item.name.charAt(0).toUpperCase()}
                  size={40}
                  style={{ marginTop: 8, backgroundColor: "#6200ea" }}
                />
              )}
              right={() => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => setEditId(index)}
                    style={{ marginRight: 16 }}
                  >
                    <AntDesign name="edit" size={20} color="#6200ea" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setDeleteId(index)}>
                    <Entypo name="trash" size={20} color="#e53935" />
                  </TouchableOpacity>
                </View>
              )}
              style={styles.listItem}
            />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 40, color: "gray" }}>
              Nenhum contato adicionado.
            </Text>
          }
        />

        <FAB
          style={styles.fab}
          icon="plus"
          label="Novo Contato"
          onPress={() => setEditId("new")}
        />

        <Portal>
          <Dialog visible={editId !== null} onDismiss={() => setEditId(null)}>
            <Dialog.Title>{editId === "new" ? "Novo Contato" : "Editar Contato"}</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Nome"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: 10 }}
              />
              <TextInput
                label="Telefone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={{ marginBottom: 10 }}
              />
              <Text style={{ marginBottom: 5 }}>Categoria</Text>
              <TouchableOpacity onPress={() => setCategory("Pessoal")}>
                <Text style={{ color: category === "Pessoal" ? "green" : "black" }}>
                  Pessoal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCategory("trabalho")}>
                <Text style={{ color: category === "trabalho" ? "green" : "black" }}>
                  Trabalho
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCategory("família")}>
                <Text style={{ color: category === "família" ? "green" : "black" }}>
                  Família
                </Text>
              </TouchableOpacity>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setEditId(null)}>Cancelar</Button>
              <Button onPress={saveContact}>
                {editId === "new" ? "Adicionar" : "Salvar"}
              </Button>
            </Dialog.Actions>
          </Dialog>

          <Dialog visible={deleteId !== null} onDismiss={() => setDeleteId(null)}>
            <Dialog.Title>Confirmar exclusão</Dialog.Title>
            <Dialog.Content>
              <Text>Tem certeza que deseja excluir este contato?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDeleteId(null)}>Cancelar</Button>
              <Button textColor="#FF3B30" onPress={() => handleDelete(deleteId)}>
                Excluir
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  listItem: {
    backgroundColor: "#f9f9f9",
    marginVertical: 4,
    borderRadius: 8,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#6200ea",
  },
});
