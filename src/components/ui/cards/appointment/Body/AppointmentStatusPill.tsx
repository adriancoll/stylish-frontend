import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import {
  AppointmentStatus,
  AppointmentStatusTypes,
} from "../../../../../interfaces/appointment.interfaces";
import { useTheme } from "@react-navigation/native";
import { Avatar } from "@react-native-material/core";
import theme from "../../../../../theme/theme";

export const AppointmentStatusPill: FC<{
  status: AppointmentStatus | AppointmentStatusTypes;
  textColor?: string;
}> = ({ status, textColor }) => {
  const { colors } = useTheme();
  const pillColors = {
    [AppointmentStatus.PENDING_CONFIRM]: {
      color: theme.colors.warning,
      label: "Pendiente",
    },
    [AppointmentStatus.CONFIRMED]: {
      color: theme.colors.success,
      label: "Confirmado",
    },
    [AppointmentStatus.CANCELED]: {
      color: theme.colors.error,
      label: "Cancelado",
    },
    [AppointmentStatus.COMPLETED]: {
      color: theme.colors.success,
      label: "Completado",
    },
    [AppointmentStatus.TIMEOUT]: {
      color: theme.colors.primary,
      label: "Vencido",
    },
  };

  return (
    <View style={[styles.statusPill]}>
      <Avatar size={8} color={pillColors[status].color || "red"} />
      <Text
        style={{
          color: textColor ? textColor : colors.text,
          fontSize: theme.fontSizes.body,
          fontFamily: theme.fonts.regular,
          textTransform: "capitalize",
          marginLeft: theme.spacing.sm,
        }}
      >
        {pillColors[status].label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusPill: {
    alignItems: "center",
    flexDirection: "row",
  },
});
