###########################################################################
# Project:	INIZIO Project
# File:		Makefile
# Date:		December 2, 2024
# Author:	Adam Dzurilla <adamdzurilla19@gmail.com>
#
# Description:	Build script
###########################################################################

FILES := index.html style.css
ZIP_FILENAME := inizio_project.zip

pack: $(FILES)
	zip $(ZIP_FILENAME) $^

clean:
	rm $(ZIP_FILENAME)