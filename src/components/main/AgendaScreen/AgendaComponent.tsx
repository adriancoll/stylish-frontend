import { useTheme } from "@react-navigation/native";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  useColorScheme,
  ToastAndroid,
} from "react-native";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
  LocaleConfig,
} from "react-native-calendars";
import { useSelector } from "react-redux";
import { AppointmentStatusTypes } from "../../../interfaces/appointment.interfaces";
import { RootState } from "../../../store";
import { getMyAppointments } from "../../../store/features/appointments/appointmentActions";
import { AppointmentsState } from "../../../store/features/appointments/appointmentSlice";
import theme from "../../../theme/theme";
import { EvilIcons } from "@expo/vector-icons";

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Novembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ener.",
    "Feb.",
    "Marzo",
    "Abr",
    "Mar",
    "Jun",
    "Jul.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dic.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";

interface Props {}

const SEPARATOR = "|";

const AgendaComponent: FC<Props> = ({}) => {
  const [isLoading, setisLoading] = useState(false);
  const [parsedAppointments, setParsedAppointments] = useState<AgendaSchedule>(
    {}
  );

  const isDark = useColorScheme() === "dark";

  const { colors } = useTheme();

  const { appointments } = useSelector<RootState, AppointmentsState>(
    (state) => state.appointments
  );

  useEffect(() => {
    setParsedAppointments(appointmentTransformer());
  }, [appointments]);

  const appointmentTransformer = () => {
    const data: AgendaSchedule = {};

    Object.keys(appointments).forEach((key: string) => {
      const parseKey = key as AppointmentStatusTypes;
      const appointment = appointments[parseKey];

      appointment.forEach((appointmentItem) => {
        const day = moment(appointmentItem.date).format("YYYY-MM-DD");

        if (isEmpty(data[day])) {
          data[day] = [];
        }

        data[day].push({
          name: `${moment(appointmentItem.date).format("HH:MM")} - ${
            appointmentItem.service_type.name
          }|${appointmentItem.business.name}`,
          height: 50,
          day,
        });
      });
    });

    return data;
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? colors.primary : theme.colors["primary-light"];

    const data = reservation.name.split(SEPARATOR);

    return (
      <TouchableOpacity
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={[styles.itemTitle, { fontSize, color }]}>
          {data[0]}
        </Text>
        <Text style={[styles.itemSubtitle]}>{data[1]}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const renderEmptyData = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={[styles.emptyDateText, { color: colors.text }]}>
          ¡No tienes citas este día!
        </Text>
      </View>
    );
  };

  const onRefresh = async () => {
    try {
      setisLoading(true);
      await getMyAppointments();
      setisLoading(false);
      ToastAndroid.show("Citas actualizadas", ToastAndroid.SHORT);
    } catch (exception) {
      setisLoading(false);
      const error = exception as BaseErrorResponse;
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  return (
    <Agenda
      // The list of items that have to be displayed in agenda. If you want to render item as empty date
      // the value of date key has to be an empty array []. If there exists no value for date key it is
      // considered that the date in question is not yet loaded
      items={parsedAppointments}
      // arrows
      hideArrows={false}
      renderArrow={(direction) => {
        return (
          <EvilIcons
            name={`chevron-${direction}`}
            size={30}
            color={colors.text}
          />
        );
      }}
      // enable scroll
      scrollEnabled
      displayLoadingIndicator
      // Initially selected day
      selected={moment().format("YYYY-MM-DD")}
      showClosingKnob={true}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={50}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={50}
      // Specify how each item should be rendered in agenda
      renderItem={renderItem}
      // Specify how empty date content with no items should be rendered
      renderEmptyDate={renderEmptyDate}
      // Specify what should be rendered instead of ActivityIndicator
      renderEmptyData={renderEmptyData}
      // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
      disabledByDefault={true}
      // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
      onRefresh={onRefresh}
      // Set this true while waiting for new data from a refresh
      refreshing={isLoading}
      // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
      refreshControl={
        <RefreshControl
          colors={[theme.colors.primary, theme.colors.grey]}
          refreshing={isLoading}
          onRefresh={onRefresh}
        />
      }
      // Agenda theme
      theme={{
        agendaDayTextColor: colors.text,
        agendaDayNumColor: theme.colors.text_muted,
        agendaTodayColor: theme.colors["primary-light"],
        agendaKnobColor: theme.colors.primary,
        backgroundColor: isDark ? theme.colors.black : theme.colors.white,
        textDayFontFamily: theme.fonts.regular,
        textMonthFontFamily: theme.fonts.regular,
        todayButtonFontFamily: theme.fonts.regular,
        textDayHeaderFontFamily: theme.fonts.bold,
        calendarBackground: theme.colors.background_dark_light,
        monthTextColor: theme.colors.white,
        dotColor: theme.colors.primary,
        selectedDayBackgroundColor: theme.colors["primary-light"],
      }}
      // Agenda container style
      style={[styles.constianer]}
    />
  );
};

export default AgendaComponent;

const styles = StyleSheet.create({
  constianer: {
    backgroundColor: "red",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  emptyDateText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.subHeading,
    alignSelf: "center",
  },
  itemTitle: {
    fontFamily: theme.fonts.bold,
  },
  itemSubtitle: {
    fontFamily: theme.fonts.thin,
    color: theme.colors.text_muted,
  },
});
