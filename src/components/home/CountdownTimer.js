
import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"

const CountdownTimer = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(endDate) - new Date()

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
                const minutes = Math.floor((difference / 1000 / 60) % 60)
                const seconds = Math.floor((difference / 1000) % 60)

                setTimeLeft({ days, hours, minutes, seconds })
            } else {
                // Sale has ended
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        // Calculate immediately
        calculateTimeLeft()

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000)

        // Clear interval on component unmount
        return () => clearInterval(timer)
    }, [endDate])

    // Format number to always have 2 digits
    const formatNumber = (num) => {
        return num < 10 ? `0${num}` : num
    }

    return (
        <View style={styles.container}>
            <View style={styles.timerContainer}>
                <View style={styles.timerItem}>
                    <Text style={styles.timerNumber}>{formatNumber(timeLeft.days)}</Text>
                    <Text style={styles.timerLabel}>Ngày</Text>
                </View>
                <Text style={styles.timerSeparator}>:</Text>
                <View style={styles.timerItem}>
                    <Text style={styles.timerNumber}>{formatNumber(timeLeft.hours)}</Text>
                    <Text style={styles.timerLabel}>Giờ</Text>
                </View>
                <Text style={styles.timerSeparator}>:</Text>
                <View style={styles.timerItem}>
                    <Text style={styles.timerNumber}>{formatNumber(timeLeft.minutes)}</Text>
                    <Text style={styles.timerLabel}>Phút</Text>
                </View>
                <Text style={styles.timerSeparator}>:</Text>
                <View style={styles.timerItem}>
                    <Text style={styles.timerNumber}>{formatNumber(timeLeft.seconds)}</Text>
                    <Text style={styles.timerLabel}>Giây</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    timerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
    },
    timerItem: {
        alignItems: "center",
    },
    timerNumber: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    },
    timerLabel: {
        color: "black",
        fontSize: 12,
    },
    timerSeparator: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 5,
    },
})

export default CountdownTimer

