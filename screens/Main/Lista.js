import React, { Component } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { event } from "react-native-reanimated";
import AppCard from "../../components//AppCard";
import AppTextimput from "../../components/AppTextimput";

export class Lista extends Component {
  constructor() {
    super();
    this.state = {
      query: null,
      dataSource: [],
      dataBackup: [],
    };
  }

  componentDidMount() {
    var data = [
      {
        id: 1,
        tekst1: "Zagreb - Mostar",
        tekst3: "900KM",
        tekst2: "10.1.2021",
        slika: require("../../assets/9.jpg"),
      },
      {
        id: 2,
        tekst1: "Sarajevo - Beograd",
        tekst3: "700KM",
        tekst2: "20.1.2021",
        slika: require("../../assets/8.jpg"),
      },
      {
        id: 3,
        tekst1: "Beograd - Banja Luka",
        tekst3: "600KM",
        tekst2: "3.2.2021",
        slika: require("../../assets/7.jpg"),
      },
      {
        id: 4,
        tekst1: "Sarajevo - Mostar",
        tekst3: "400KM",
        tekst2: "5.3.2021",
        slika: require("../../assets/6.jpg"),
      },
      {
        id: 5,
        tekst1: "Sarajevo - Mostar",
        tekst3: "350KM",
        tekst2: "5.5.2021",
        slika: require("../../assets/5.jpg"),
      },
      {
        id: 6,
        tekst1: "Sarajevo - Mostar",
        tekst3: "450KM",
        tekst2: "10.5.2021",
        slika: require("../../assets/1.jpg"),
      },
      {
        id: 7,
        tekst1: "Sarajevo - Mostar",
        tekst3: "500KM",
        tekst2: "8.7.2021",
        slika: require("../../assets/splash.png"),
      },
    ];

    this.setState({
      dataSource: data,
      dataBackup: data,
    });
  }

  filterItem(tekstZatraziti) {
    this.setState({
      dataSource: this.state.dataBackup.filter((i) =>
        i.tekst1.toLowerCase().includes(tekstZatraziti.toLowerCase())
      ),
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.ime}>
        <AppTextimput
          icon="search"
          placeholder="pretraga"
          style={styles.app}
          onChangeText={(text) => this.filterItem(text)}
        ></AppTextimput>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <AppCard
              tekst1={item.tekst1}
              tekst2={item.tekst2}
              tekst3={item.tekst3}
              slika={item.slika}
              onPress={() => this.props.navigation.navigate("listing", item)}
            />
          )}
          showsVerticalScrollIndicator="false"
        ></FlatList>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  ime: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.84,

    elevation: 5,

    marginRight: 10,
    marginLeft: 10,
  },
  app: {
    flex: 1,
    height: "100%",
  },
});
export default Lista;
