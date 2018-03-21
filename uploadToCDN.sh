#!/bin/bash

#
# $1 : version number
if [[ $# -eq 0 ]] ; then
    echo "This script is for pushing resurces up to S3 to be served from AWS CDN."
    echo ""

    echo "SYNOPSIS:"
    echo "       uploadToCDN.sh version"
    echo ""

    exit 0
fi

# Dist file in the core of the CDN version
aws s3 sync dist/ s3://geoplatform-cdn/gp.mapcore/$1/
#aws s3 sync src/ s3://geoplatform-cdn/gp.mapcore/$1/src
