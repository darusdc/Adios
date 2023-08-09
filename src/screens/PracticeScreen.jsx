import { Button, Text, View } from 'react-native'
import React from 'react'
import styles from './PracticeScreenStyles'

const PracticeScreen = () => {
  // const onClickButton = () => {
  //   console.log('hello world');
  // }
  return (
    // <View>
    //   <Text>PracticeScreen</Text>
    //   <Button title='Click Me'
    //   onPress={() => onClickButton()} />
    // </View>
    <View style={styles.mainComponent}>
      <View style={styles.component1}>
        <View style={styles.textFrame}>
          <Text style={styles.textBase}>
          <Text style={styles.textBold}> The Eiffel Tower was built by Gustave</Text> Eiffel for the 1889 Exposition Universelle,
                which was to celebrate the 100th year
                anniversary of the French Revolution.
          </Text>
        </View>
      </View>
      <View style={styles.component2}>
        <View style={styles.textFrame}>
          <Text style={styles.textBase}>
          <Text style={styles.textBold}>The Learn Tower of Pisa </Text>
             is a medieval structure in
              <Text style={styles.textBold}> Pisa, Italy,</Text> 
              That is famous for the settling of its foundations.
            </Text>
        </View>
      </View>
    </View>
  )

}

export default PracticeScreen