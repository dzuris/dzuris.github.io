#####################################################################
# Project: Mobilflex web
# File Makefile
# Date: 23.9.2023
# Last modify: 23.9.2023
# Author: Adam Dzurilla <adamdzurilla19@gmail.com>
#
# Description: Build script
#####################################################################

ARCHIVE_NAME = mobilflex_web

.PHONY: pack clean

pack: clean
	zip -r $(ARCHIVE_NAME).zip . -x "*.git*" Makefile README.md

clean:
	rm -rf $(ARCHIVE_NAME).zip