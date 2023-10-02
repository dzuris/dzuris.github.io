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
SERVER_USERNAME = xdzuri00
SERVER_NAME = merlin.fit.vutbr.cz
SERVER_PATH = /homes/eva/xd/xdzuri00/WWW

.PHONY: pack clean

pack: clean
	zip -r $(ARCHIVE_NAME).zip . -x "*.git*" Makefile README.md

clean:
	rm -rf $(ARCHIVE_NAME).zip

send_to_server: pack
	scp ./$(ARCHIVE_NAME).zip $(SERVER_USERNAME)@$(SERVER_USERNAME):$(SERVER_PATH)