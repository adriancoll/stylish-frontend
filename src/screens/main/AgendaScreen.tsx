import { StyleSheet, Text, View } from "react-native";
import React from "react";
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
