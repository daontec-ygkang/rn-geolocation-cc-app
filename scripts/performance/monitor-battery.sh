#!/bin/bash

###############################################################################
# Battery Monitoring Script for Android Devices
# Monitors battery consumption during motion detection testing
###############################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PACKAGE_NAME="com.rngeolocation4ccapp"
SAMPLE_INTERVAL=60  # seconds
OUTPUT_DIR="./performance-logs"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="${OUTPUT_DIR}/battery_${TIMESTAMP}.log"

# Create output directory
mkdir -p "$OUTPUT_DIR"

###############################################################################
# Functions
###############################################################################

print_header() {
    echo -e "${BLUE}=================================${NC}"
    echo -e "${BLUE}Battery Monitoring Tool${NC}"
    echo -e "${BLUE}=================================${NC}"
    echo ""
}

check_device() {
    echo -e "${YELLOW}Checking for connected devices...${NC}"
    DEVICE_COUNT=$(adb devices | grep -v "List" | grep "device" | wc -l)

    if [ "$DEVICE_COUNT" -eq 0 ]; then
        echo -e "${RED}Error: No Android device connected${NC}"
        echo "Please connect an Android device and enable USB debugging"
        exit 1
    fi

    echo -e "${GREEN}✓ Device connected${NC}"
    echo ""
}

get_battery_level() {
    adb shell dumpsys battery | grep level | awk '{print $2}'
}

get_battery_status() {
    STATUS=$(adb shell dumpsys battery | grep status | awk '{print $2}')
    case $STATUS in
        1) echo "Unknown" ;;
        2) echo "Charging" ;;
        3) echo "Discharging" ;;
        4) echo "Not charging" ;;
        5) echo "Full" ;;
        *) echo "Unknown" ;;
    esac
}

get_battery_temperature() {
    TEMP=$(adb shell dumpsys battery | grep temperature | awk '{print $2}')
    # Temperature is in tenths of a degree Celsius
    echo "scale=1; $TEMP / 10" | bc
}

get_battery_voltage() {
    VOLTAGE=$(adb shell dumpsys battery | grep voltage | awk '{print $2}')
    # Voltage is in millivolts
    echo "scale=3; $VOLTAGE / 1000" | bc
}

check_app_running() {
    adb shell pidof $PACKAGE_NAME > /dev/null
    return $?
}

log_battery_stats() {
    LEVEL=$(get_battery_level)
    STATUS=$(get_battery_status)
    TEMP=$(get_battery_temperature)
    VOLTAGE=$(get_battery_voltage)
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

    # Check if app is running
    if check_app_running; then
        APP_STATUS="Running"
    else
        APP_STATUS="Not Running"
    fi

    # Log to file
    echo "$TIMESTAMP,$LEVEL,$STATUS,$TEMP,$VOLTAGE,$APP_STATUS" >> "$LOG_FILE"

    # Display to console
    echo -e "${BLUE}[$TIMESTAMP]${NC}"
    echo -e "  Battery Level: ${GREEN}${LEVEL}%${NC}"
    echo -e "  Status: $STATUS"
    echo -e "  Temperature: ${TEMP}°C"
    echo -e "  Voltage: ${VOLTAGE}V"
    echo -e "  App Status: $APP_STATUS"
    echo ""
}

calculate_drain_rate() {
    # Calculate battery drain rate from log file
    if [ ! -f "$LOG_FILE" ]; then
        echo "No log file found"
        return
    fi

    FIRST_LINE=$(head -n 2 "$LOG_FILE" | tail -n 1)
    LAST_LINE=$(tail -n 1 "$LOG_FILE")

    if [ "$FIRST_LINE" == "$LAST_LINE" ]; then
        echo "Not enough data yet"
        return
    fi

    FIRST_LEVEL=$(echo "$FIRST_LINE" | cut -d',' -f2)
    LAST_LEVEL=$(echo "$LAST_LINE" | cut -d',' -f2)

    FIRST_TIME=$(echo "$FIRST_LINE" | cut -d',' -f1)
    LAST_TIME=$(echo "$LAST_LINE" | cut -d',' -f1)

    FIRST_EPOCH=$(date -j -f "%Y-%m-%d %H:%M:%S" "$FIRST_TIME" +%s 2>/dev/null || date -d "$FIRST_TIME" +%s)
    LAST_EPOCH=$(date -j -f "%Y-%m-%d %H:%M:%S" "$LAST_TIME" +%s 2>/dev/null || date -d "$LAST_TIME" +%s)

    TIME_DIFF=$((LAST_EPOCH - FIRST_EPOCH))
    LEVEL_DIFF=$((FIRST_LEVEL - LAST_LEVEL))

    if [ $TIME_DIFF -gt 0 ]; then
        # Battery drain per hour
        HOURS=$(echo "scale=2; $TIME_DIFF / 3600" | bc)
        DRAIN_PER_HOUR=$(echo "scale=2; $LEVEL_DIFF / $HOURS" | bc)

        echo -e "${YELLOW}Battery Drain Rate:${NC}"
        echo -e "  Time elapsed: ${HOURS} hours"
        echo -e "  Battery drain: ${LEVEL_DIFF}%"
        echo -e "  Drain rate: ${GREEN}${DRAIN_PER_HOUR}% per hour${NC}"
        echo ""
    fi
}

reset_battery_stats() {
    echo -e "${YELLOW}Resetting battery stats...${NC}"
    adb shell dumpsys batterystats --reset
    echo -e "${GREEN}✓ Battery stats reset${NC}"
    echo ""
}

show_app_battery_usage() {
    echo -e "${YELLOW}App Battery Usage:${NC}"
    adb shell dumpsys batterystats --charged $PACKAGE_NAME | head -50
    echo ""
}

###############################################################################
# Main Script
###############################################################################

print_header

# Parse command line arguments
MODE="monitor"
DURATION=0

while [[ $# -gt 0 ]]; do
    case $1 in
        --reset)
            MODE="reset"
            shift
            ;;
        --stats)
            MODE="stats"
            shift
            ;;
        --duration)
            DURATION="$2"
            shift 2
            ;;
        --interval)
            SAMPLE_INTERVAL="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --reset              Reset battery statistics"
            echo "  --stats              Show app battery usage statistics"
            echo "  --duration MINUTES   Monitor for specified duration (0 = infinite)"
            echo "  --interval SECONDS   Sample interval (default: 60)"
            echo "  --help               Show this help message"
            echo ""
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

check_device

case $MODE in
    reset)
        reset_battery_stats
        exit 0
        ;;
    stats)
        show_app_battery_usage
        exit 0
        ;;
    monitor)
        # Continue to monitoring
        ;;
esac

# Initialize log file
echo "Timestamp,Level(%),Status,Temperature(°C),Voltage(V),App Status" > "$LOG_FILE"

echo -e "${GREEN}Starting battery monitoring...${NC}"
echo -e "Log file: ${BLUE}$LOG_FILE${NC}"
echo -e "Sample interval: ${SAMPLE_INTERVAL} seconds"
if [ $DURATION -gt 0 ]; then
    echo -e "Duration: ${DURATION} minutes"
fi
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
echo ""

# Calculate end time if duration is specified
if [ $DURATION -gt 0 ]; then
    END_TIME=$(($(date +%s) + DURATION * 60))
fi

# Trap Ctrl+C to show summary before exit
trap 'echo ""; echo "Monitoring stopped"; calculate_drain_rate; exit 0' INT

# Monitoring loop
SAMPLE_COUNT=0
while true; do
    log_battery_stats

    # Show drain rate every 10 samples
    SAMPLE_COUNT=$((SAMPLE_COUNT + 1))
    if [ $((SAMPLE_COUNT % 10)) -eq 0 ]; then
        calculate_drain_rate
    fi

    # Check if duration limit reached
    if [ $DURATION -gt 0 ]; then
        CURRENT_TIME=$(date +%s)
        if [ $CURRENT_TIME -ge $END_TIME ]; then
            echo -e "${GREEN}Duration limit reached${NC}"
            echo ""
            calculate_drain_rate
            exit 0
        fi
    fi

    sleep $SAMPLE_INTERVAL
done
