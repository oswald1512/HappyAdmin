import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function MenuScreen({ navigation }) {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = () => {
    fetch("http://192.168.0.11/happyAdminAPI/getSolicitud.php")
      .then((response) => response.json())
      .then((data) => {
        setDishes(data);
        setFilteredDishes(data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  };

  const updateOrderStatus = (status) => {
    if (!selectedOrderId) {
      alert("Por favor selecciona una orden.");
      return;
    }

    fetch("http://192.168.0.11/happyAdminAPI/updateSolicitud.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idPush: selectedOrderId,
        estado: status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.Message);
        setSelectedOrderId(null);
        loadDishes(); // Recargar los datos después de la actualización
      })
      .catch((error) => {
        console.log("Error al actualizar el estado:", error);
      });
  };

  const renderDishItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedOrderId(item.idPush)}
      style={styles.productCard}
    >
      <Text style={styles.productName}>N° Push: {item.idPush}</Text>
      <Text style={styles.productDetail}>Producto: {item.detalleProducto}</Text>
      <Text style={styles.productDetail}>Nombre: {item.nombreCompleto}</Text>
      <Text style={styles.productDetail}>Dirección: {item.direccion}</Text>
      <Text style={styles.productDetail}>Teléfono: {item.telefono}</Text>    
      <Text style={styles.productStatus}>Estado: {item.estado}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administración</Text>
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.idPush.toString()}
        numColumns={2}
        style={styles.menuFlatList}
        renderItem={renderDishItem}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => updateOrderStatus("Aceptada")}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>Aceptada</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161F26",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#BFA77A",
    marginTop: 20, // Margen superior
    textAlign: "center",
  },
  menuFlatList: {
    flexGrow: 1,
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productDetail: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  productStatus: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: "#BFA77A",
    height: 50,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#161F26",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
