import {
  RefreshControl,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Appointment } from "../../../interfaces/appointment.interfaces";
import { AppointmentCard } from "../../ui/cards/appointment/AppointmentCard";
import theme from "../../../theme/theme";
import { getMyAppointments } from "../../../store/features/appointments/appointmentActions";
import { AxiosError } from "axios";

interface Props {
  appointments: Appointment[];
}

export const handleRefreshTabs = async (setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  try {
    setIsLoading(true);
    await getMyAppointments();
    setIsLoading(false);
  } catch (err) {
    const error = err as AxiosError<BaseErrorResponse>;
    if (error.response && error.response.data.error) {
      ToastAndroid.show(error.response?.data.message, ToastAndroid.LONG);
    }
  }
};

const AppointmentList: FC<Props> = ({ appointments }) => {
  const [isLoading, setisLoading] = useState(false);
  
  return (
    <ScrollView
      style={[styles.containter]}
      refreshControl={
        <RefreshControl
          colors={[theme.colors.primary, theme.colors.grey]}
          refreshing={isLoading}
          onRefresh={() => handleRefreshTabs(setisLoading)}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {appointments.map((appointment, index) => (
        <AppointmentCard
          appointment={appointment}
          index={index}
          showAllObservations
          key={appointment.uid}
        />
      ))}
    </ScrollView>
  );
};

export default AppointmentList;

const styles = StyleSheet.create({
  containter: {
    marginBottom: 60,
  },
});
