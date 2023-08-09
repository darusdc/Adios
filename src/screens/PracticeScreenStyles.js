import { StyleSheet  } from 'react-native'
const styles = StyleSheet.create({
    textBold:{
      color: '#E8988F',
      fontWeight: 'bold',
      textAlign: 'center'
    }, 
    textBase: {
      color: 'black',
      fontWeight: 'normal',
      textAlign: 'center'
    },
    mainComponent: {
      flex:1
    },
    component1:{
      flex: 1,
      backgroundColor: "#FFE4B5",
      justifyContent: "center",
      alignItems:'center'
    },
    component2: {
      flex: 1,
      backgroundColor: "#E5E6FA",
      justifyContent: "flex-end",
      alignItems:"flex-end"
    },
    textFrame: {
      textAlign: "center",
      backgroundColor: "white",
      alignItems: "center",
      padding: 5,
      width: "30%"
    }
  })

  export default styles;