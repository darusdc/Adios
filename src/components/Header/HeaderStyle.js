import {StyleSheet} from 'react-native'
import Colors from '../../constants/Colors';
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.PRIMARY,
        height: 60,
        justifyContent: 'space-between',
    },
    leftContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
    },
    leftText: {
        marginLeft: 8,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    },
    iconContainer: {
        padding: 8,
    },
    logo: {
        width: 20,
        height: 20,
        marginLeft: 8,
    },
    badgeContainer: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        position: 'absolute',
        alignItems:'center',
        justifyContent: "center",
        borderRadius: 100,
        right: 3,
        top: 3,
        zIndex: 3
    },
});

export default styles