import React, { useEffect, useState } from 'react';
import api from './services/api';
import { View, FlatList, Text, StyleSheet, StatusBar, SafeAreaView, Button, TouchableOpacity } from 'react-native';


/**
 * <VIEW> QUALQUER DIVISAO DE CODIGO TIPO DIV
 * NÃO POSSUEM VALOR SEMANTICO
 * TEXT: TUDO QUE POSSA SER COLOCA TEXTO, TIPO P, SPAN, H1 ETC POREM TODO CSS TEM Q SER FEITO NÃO EXISTE H1
 * Todos componentes possui por padrão display flex.
 * S
 */
export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        });
    }, []);
   async function handleAddProject() {
    const response = await api.post('projects',{
        title: `Novo Projeto ${Date.now()}`,
        owner: 'Athus Xavier'
    });

    setProjects([...projects, response.data]);
    }
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor='#7159c1'></StatusBar>
            {/* <View style={styles.container}>
        {
        projects.map(project =>( //precisa desses parenteses se nao nao funciona/]

        <Text key={project.id} style={styles.project}>{project.title}</Text>

            )
        )
        }
        
    </View> */}

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item }) => (
                        <Text key={item.id} style={styles.project}>{item.title}</Text>
                    )}
                >

                </FlatList>

                <TouchableOpacity
                    onPress={handleAddProject}
                    activeOpacity={0.6}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        // justifyContent:"center",
        // alignItems:"center"
    },
    project: {
        color: '#fff',
        fontSize: 30,
    },
    button: {
        margin: 20,
        height: 50,
        borderRadius: 4,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    bittonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});