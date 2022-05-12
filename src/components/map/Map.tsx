import React, { FC, useEffect, useState } from "react";
import MapView, { MapViewProps, Marker, Polyline } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import {
  getBackgroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  LocationObjectCoords,
} from "expo-location";
import { isEmpty } from "lodash";
import { FullScreenLoader } from "../ui/FullScreenLoader";


interface Props extends MapViewProps {}

export const Maps: FC<Props> = ({ ...props }) => {
  const [location, setLocation] = useState<LocationObjectCoords>({} as LocationObjectCoords);

  
  useEffect(() => {
    (async () => {
      let { status } = await getBackgroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Error", "Debes permitir la localización para ver el mapa");
        return;
      }

      let { coords, timestamp: _timestamp } = await getCurrentPositionAsync({});
      setLocation(coords);
    })();
  }, []);

  if (isEmpty(location))
  {
      return <FullScreenLoader />
  } 

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        longitude: location?.longitude,
        latitude: location?.latitude,
        latitudeDelta: 0.9,
        longitudeDelta: 0.4,
      }}
      {...props}
    >
      {/* <Marker /> */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {},
});
