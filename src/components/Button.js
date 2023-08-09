import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { SmallText } from './Text';
import Colors from '../constants/Colors';
import { Icon } from '@rneui/base';

export const CustomButton = (props) => {
    const { buttonCustomStyle, isShowIcon } = props;
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, buttonCustomStyle]}
            {...props}
        >
            {
                isShowIcon ?
                <Icon
                    color={Colors.WHITE}
                    style={{ marginRight: 8 }}
                    {...props}
                /> : null
            }
            <SmallText textCustomStyle={styles.buttonText} {...props} />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Colors.PRIMARY,
        marginVertical: 8,
        padding: 8,
        borderRadius: 30,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.WHITE,
    },
});