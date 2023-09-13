import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { LargeText } from './Text';
import { CustomButton } from './Button';
import Colors from '../constants/Colors';

export const ModalizeFilterList = (props) => {
    const { title, onClickReset, list, onClickApplyFilter, modalizeRef } = props;
    return (
        <Modalize adjustToContentHeight ref={modalizeRef}>
            <View style={styles.modalizeTopContainer}>
                <LargeText
                    textToShow={title}
                    textCustomStyle={{ marginVertical: 0 }}
                />
                <CustomButton
                    textToShow='Reset'
                    buttonCustomStyle={styles.resetButton}
                    textCustomStyle={{ color: Colors.PRIMARY }}
                    onPress={onClickReset}
                />
            </View>
            {list}
            <View style={styles.modalizeBottomContainer}>
                <CustomButton
                    textToShow='Apply Filter'
                    onPress={onClickApplyFilter}
                    textCustomStyle={styles.applyFilterText}
                />
            </View>
        </Modalize>
    )
};

const styles = StyleSheet.create({
    modalizeTopContainer: {
        margin: 16,
        marginBottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalizeBottomContainer: {
        margin: 16,
        marginTop: 0,
    },
    resetButton: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.WHITE,
        padding: 0,
        width: '25%',
        marginVertical: 0,
    },
    applyFilterText: {
        color: Colors.WHITE,
        textAlign: 'center',
    },
});