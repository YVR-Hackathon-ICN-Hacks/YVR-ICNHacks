import { Dimensions, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useRef } from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function LandingThree() {
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <View style={styles.mapItem}>
                    <Text style={styles.textStyle}>
                        Map Place Holder
                    </Text>
                </View>
                <View style={styles.mapButton}>
                    <Text style={styles.mapButtonText}>
                        주차장 도착시
                    </Text>
                    <Text style={styles.mapButtonText}>
                        주차 길안내가 자동으로 시작합니다.
                    </Text>
                </View>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detailButton}>
                    <Text style={styles.detailButtonText}>
                        주차장 길안내
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
    },
    mapContainer: {
        flex: 0.7,
        backgroundColor: 'gray',
        justifyContent: 'center',
    },
    mapItem: {
        height: '70%', // mapContainer의 70% 크기를 차지하도록 설정
        backgroundColor: 'darkgray',
        borderWidth: 1,
        borderColor: 'white', // 흰색 보더 설정
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        marginBottom: 5
    },
    mapButton: {
        height: '20%',
        backgroundColor: "#567ae4",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 10,
    },
    textStyle: {
        fontSize: 20,
        padding: 15,
        color: 'black',
        textAlign: 'center'
    },
    mapButtonText: {
        fontSize: 20,
        padding: 5,
        color: 'white',
        textAlign: 'center'
    },
    detailContainer: {
        flex: 0.3,
        justifyContent: 'center',
        borderTopLeftRadius: 20, // 왼쪽 상단 모서리 라운드 처리
        borderTopRightRadius: 20, // 오른쪽 상단 모서리 라운드 처리
    },
});
