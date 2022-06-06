import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BusinessCrudForm from "../../components/main/BusinessStoreFormScreen/BusinessCrudForm";
import { useBaseContainer } from "../../hooks/useBaseContainer";
import AgendaComponent from "../../components/main/AgendaScreen/AgendaComponent";

const AgendaScreen = () => {
  const { baseContainer } = useBaseContainer(false);

  return (
    <View style={[baseContainer, { paddingTop: 0 }]}>
      <AgendaComponent />
    </View>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({});
