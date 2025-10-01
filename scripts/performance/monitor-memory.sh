#!/bin/bash

###############################################################################
# Memory Monitoring Script for Android Devices
# Monitors memory usage during motion detection testing
###############################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PACKAGE_NAME="com.rngeolocation4ccapp"
SAMPLE_INTERVAL=10  # seconds
OUTPUT_DIR="./performance-logs"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="${OUTPUT_DIR}/memory_${TIMESTAMP}.log"

# Create output directory
mkdir -p "$OUTPUT_DIR"

###############################################################################
# Functions
###############################################################################

print_header() {
    echo -e "${BLUE}=================================${NC}"
    echo -e "${BLUE}Memory Monitoring Tool${NC}"
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

check_app_running() {
    PID=$(adb shell pidof $PACKAGE_NAME)
    if [ -z "$PID" ]; then
        echo -e "${RED}Error: App is not running${NC}"
        echo "Please start the app first"
        exit 1
    fi
    echo "$PID"
}

get_memory_stats() {
    local PID=$1
    local MEMINFO=$(adb shell dumpsys meminfo $PID | grep -A 20 "App Summary")

    # Extract memory values (in KB)
    local JAVA_HEAP=$(echo "$MEMINFO" | grep "Java Heap:" | awk '{print $3}')
    local NATIVE_HEAP=$(echo "$MEMINFO" | grep "Native Heap:" | awk '{print $3}')
    local CODE=$(echo "$MEMINFO" | grep "Code:" | awk '{print $2}')
    local STACK=$(echo "$MEMINFO" | grep "Stack:" | awk '{print $2}')
    local GRAPHICS=$(echo "$MEMINFO" | grep "Graphics:" | awk '{print $2}')
    local PRIVATE_OTHER=$(echo "$MEMINFO" | grep "Private Other:" | awk '{print $3}')
    local SYSTEM=$(echo "$MEMINFO" | grep "System:" | awk '{print $2}')

    # Get total PSS
    local TOTAL_PSS=$(adb shell dumpsys meminfo $PID | grep "TOTAL PSS:" | awk '{print $3}')

    echo "$JAVA_HEAP,$NATIVE_HEAP,$CODE,$STACK,$GRAPHICS,$PRIVATE_OTHER,$SYSTEM,$TOTAL_PSS"
}

log_memory_stats() {
    local PID=$1
    local TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

    # Get memory stats
    local STATS=$(get_memory_stats $PID)

    if [ -z "$STATS" ]; then
        echo -e "${RED}Failed to get memory stats${NC}"
        return 1
    fi

    IFS=',' read -r JAVA_HEAP NATIVE_HEAP CODE STACK GRAPHICS PRIVATE_OTHER SYSTEM TOTAL_PSS <<< "$STATS"

    # Convert KB to MB
    JAVA_HEAP_MB=$(echo "scale=2; $JAVA_HEAP / 1024" | bc 2>/dev/null || echo "0")
    NATIVE_HEAP_MB=$(echo "scale=2; $NATIVE_HEAP / 1024" | bc 2>/dev/null || echo "0")
    TOTAL_PSS_MB=$(echo "scale=2; $TOTAL_PSS / 1024" | bc 2>/dev/null || echo "0")

    # Log to file
    echo "$TIMESTAMP,$JAVA_HEAP,$NATIVE_HEAP,$CODE,$STACK,$GRAPHICS,$PRIVATE_OTHER,$SYSTEM,$TOTAL_PSS" >> "$LOG_FILE"

    # Display to console
    echo -e "${BLUE}[$TIMESTAMP]${NC}"
    echo -e "  Java Heap:    ${GREEN}${JAVA_HEAP_MB} MB${NC}"
    echo -e "  Native Heap:  ${NATIVE_HEAP_MB} MB"
    echo -e "  Total PSS:    ${YELLOW}${TOTAL_PSS_MB} MB${NC}"
    echo ""

    return 0
}

calculate_memory_stats() {
    if [ ! -f "$LOG_FILE" ]; then
        echo "No log file found"
        return
    fi

    # Skip header line and get PSS column (last column)
    PSS_VALUES=$(tail -n +2 "$LOG_FILE" | cut -d',' -f8)

    if [ -z "$PSS_VALUES" ]; then
        echo "No data yet"
        return
    fi

    # Calculate min, max, average
    MIN_PSS=$(echo "$PSS_VALUES" | sort -n | head -1)
    MAX_PSS=$(echo "$PSS_VALUES" | sort -n | tail -1)
    AVG_PSS=$(echo "$PSS_VALUES" | awk '{sum+=$1; count++} END {if(count>0) print sum/count; else print 0}')

    # Convert to MB
    MIN_MB=$(echo "scale=2; $MIN_PSS / 1024" | bc)
    MAX_MB=$(echo "scale=2; $MAX_PSS / 1024" | bc)
    AVG_MB=$(echo "scale=2; $AVG_PSS / 1024" | bc)

    # Calculate memory growth
    FIRST_PSS=$(echo "$PSS_VALUES" | head -1)
    LAST_PSS=$(echo "$PSS_VALUES" | tail -1)
    GROWTH=$(echo "scale=2; ($LAST_PSS - $FIRST_PSS) / 1024" | bc)

    echo -e "${YELLOW}Memory Statistics:${NC}"
    echo -e "  Minimum:  ${MIN_MB} MB"
    echo -e "  Maximum:  ${MAX_MB} MB"
    echo -e "  Average:  ${AVG_MB} MB"
    echo -e "  Growth:   ${GROWTH} MB"

    if (( $(echo "$GROWTH > 10" | bc -l) )); then
        echo -e "  ${RED}⚠ Warning: Significant memory growth detected (possible leak)${NC}"
    else
        echo -e "  ${GREEN}✓ Memory usage stable${NC}"
    fi

    echo ""
}

###############################################################################
# Main Script
###############################################################################

print_header

# Parse command line arguments
DURATION=0

while [[ $# -gt 0 ]]; do
    case $1 in
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
            echo "  --duration MINUTES   Monitor for specified duration (0 = infinite)"
            echo "  --interval SECONDS   Sample interval (default: 10)"
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
PID=$(check_app_running)

echo -e "${GREEN}App PID: $PID${NC}"
echo ""

# Initialize log file
echo "Timestamp,Java Heap(KB),Native Heap(KB),Code(KB),Stack(KB),Graphics(KB),Private Other(KB),System(KB),Total PSS(KB)" > "$LOG_FILE"

echo -e "${GREEN}Starting memory monitoring...${NC}"
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
trap 'echo ""; echo "Monitoring stopped"; calculate_memory_stats; exit 0' INT

# Monitoring loop
SAMPLE_COUNT=0
while true; do
    # Check if app is still running
    CURRENT_PID=$(adb shell pidof $PACKAGE_NAME)
    if [ -z "$CURRENT_PID" ]; then
        echo -e "${RED}App stopped running${NC}"
        echo ""
        calculate_memory_stats
        exit 1
    fi

    if ! log_memory_stats $PID; then
        sleep 1
        continue
    fi

    # Show statistics every 20 samples
    SAMPLE_COUNT=$((SAMPLE_COUNT + 1))
    if [ $((SAMPLE_COUNT % 20)) -eq 0 ]; then
        calculate_memory_stats
    fi

    # Check if duration limit reached
    if [ $DURATION -gt 0 ]; then
        CURRENT_TIME=$(date +%s)
        if [ $CURRENT_TIME -ge $END_TIME ]; then
            echo -e "${GREEN}Duration limit reached${NC}"
            echo ""
            calculate_memory_stats
            exit 0
        fi
    fi

    sleep $SAMPLE_INTERVAL
done
