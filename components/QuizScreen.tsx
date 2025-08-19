import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from 'react';
import questions from "../questions.json"
import { useTheme } from '../ThemeContext';


export default function QuizScreen() {
    const { colors } = useTheme();
    const currentQuestion = questions[0];

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            {/*pergunta*/}
            <View style={[styles.questionContainer, {backgroundColor: colors.button}]}>
                <Text style={[styles.questionText, {color: colors.text}]}>{currentQuestion.question}
                    
                </Text>
            </View>

            {/*container alternativas*/}
            <View style={styles.optionsContainer}>
                {/*usamos touchOpacity para dar o feedback*/}
                {currentQuestion.options.map((option) =>(
                    <TouchableOpacity key={option} style={[styles.option, {backgroundColor: colors.button, borderColor: colors.text}]}>
                        <Text style={[styles.optionText, {color: colors.text}]}>{option}</Text>
                    </TouchableOpacity>
                ))}
                

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:16,
    },
    questionContainer: {
        flex:1,
        borderRadius: 12,
        padding: 16,
        justifyContent: 'center',
        marginBottom: 20,

    },
    questionText: {
        fontSize:20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    optionsContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    option: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
    },
    optionText:{
        fontSize:18,
    },
    
});