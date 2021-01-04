#!/bin/bash
# A small script to get the Wi-Fi IP address and write it to a JSON file, on macOS
get_ip_address=$(ipconfig getifaddr en0)

while getopts ":o:" opt; do
  case $opt in
    o)
      echo "{\"ip_address\": \"$get_ip_address\"}" > $OPTARG/ip.json
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

if ((OPTIND == 1))
then
    echo "Please specify the output with the -o destination_folder, for example -o ~/Documents/"
fi