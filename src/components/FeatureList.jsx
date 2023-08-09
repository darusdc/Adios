import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SmallText } from './Text';
import { Icon } from '@rneui/themed';
import Colors from '../constants/Colors';

export const FeatureList = (props) => {
    return (
        <TouchableOpacity
            style={styles.mainContainer}
            {...props}
        >
            <View style={styles.leftContainer}>
                <Icon
                    {...props}
                    style={styles.icon}
                />
                <SmallText {...props} />
            </View>
            <Icon
                name='chevron-right'
                type='material-community'
            />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDER_COLOR,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
});