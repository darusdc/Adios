import Colors from '../../constants/Colors';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    tiny: {
        fontSize: 10,
        color: Colors.BLACK,
    },
    small: {
        fontSize: 14,
        color: Colors.BLACK,
        marginVertical: 8
    },
  
    // here is medium style
    medium: {
        fontSize: 16,
        color: Colors.BLACK,
        marginVertical: 8
    },
    // here is large style
    large: {
        fontSize: 20,
        color: Colors.BLACK,
        marginVertical: 8
    },
});

export default styles