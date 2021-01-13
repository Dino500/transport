import { DefaultTheme } from "@react-navigation/native";    
import colors from "../../components/colors/colors";



 export default {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
      background: colors.white
    },
  };