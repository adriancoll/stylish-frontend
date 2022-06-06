import { useNavigation, useTheme } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable'
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
  Dimensions,
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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserState } from "../../../store/features/user/userSlice";
import AnimatedLottieView from "lottie-react-native";
import TouchableScale from "react-native-touchable-scale";
import { DELAY } from "../../../constants/animations";

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

const { width, height } = Dimensions.get("window");

interface Props {}

const SEPARATOR = "|";

type AgendaScreenProp = NativeStackNavigationProp<RootStackParamList, "Agenda">;

const AgendaComponent: FC<Props> = ({}) => {
  const today = moment().format("YYYY-MM-DD");

  const navigator = useNavigation<AgendaScreenProp>();

  const [isLoading, setisLoading] = useState(false);
  const [parsedAppointments, setParsedAppointments] = useState<AgendaSchedule>(
    {}
  );

  const isDark = useColorScheme() === "dark";

  const { colors } = useTheme();

  const { appointments } = useSelector<RootState, AppointmentsState>(
    (state) => state.appointments
  );

  const { isBusiness } = useSelector<RootState, UserState>(
    (state) => state.user
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

        console.log(appointmentItem.business );

        data[day].push({
          name: `${moment(appointmentItem.date).format("HH:MM")} - ${
            appointmentItem.service_type.name
          }|${
            isBusiness
              ? appointmentItem.user.name
              : appointmentItem.business.name
          }|${JSON.stringify(appointmentItem.business)}`,
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

    const [title, subtitle, business] = reservation.name.split(SEPARATOR);

    const handleClick = () => {
      if (isBusiness) return;

      navigator.navigate("BusinessDetails", {
        business: JSON.parse(business),
      });
    };

    return (
      <TouchableScale
        style={[styles.item, { height: reservation.height }]}
        onPress={handleClick}
      >
        <Text style={[styles.itemTitle, { fontSize, color }]}>{title}</Text>
        <Text style={[styles.itemSubtitle]}>{subtitle}</Text>
      </TouchableScale>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>¡La fecha está vacía!</Text>
      </View>
    );
  };

  const renderEmptyData = () => {
    return (
      <Animatable.View useNativeDriver animation={'fadeInUp'} delay={DELAY} style={styles.emptyDate}>
        <AnimatedLottieView
          source={require("../../../../assets/lotties/empty-appointments-2.json")}
          autoPlay
          loop
          speed={0.5}
          style={{
            height: width,
            alignSelf: "flex-start",
          }}
          resizeMode="cover"
        />
        <Text style={[styles.emptyDateText, { color: colors.text }]}>
          ¡No tienes citas este día!
        </Text>
      </Animatable.View>
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

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
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
      //handle row change
      rowHasChanged={rowHasChanged}
      // Initially selected day
      selected={today}
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
    fontSize: theme.fontSizes.heading,
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
