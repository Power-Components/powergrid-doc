#!/bin/bash
                  #╔═════════════════════╗#
                  #║   LaraDumps Doc     ║#
                  #╚═════════════════════╝#

# ══════════════ STYLES ═════════

NC='\033[0m'
WHITE='\033[1;37m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
LABEL_ERROR="\n\033[048;5;9m ERROR ${NC} "

#Ascii Logo enconded in Base64
LOGO=$(echo -n "ICAgICAgICAgICAgXDAzM1sxOzMzbSBfX1wwMzNbMG0gICAgIFwwMzNbMDszMm1fX19fICAgICAgICAgICAgICAgICAgICAgICAgICBfX19fX18gICAgIF8gICAgIF9fXDAzM1swbQogICAgICAgICAgICBcMDMzWzE7MzNtLyAvXyxcMDMzWzBtICBcMDMzWzA7MzJtLyBfXyBcX19fXyBfICAgICAgX19fX18gIF9fX19fLyBfX19fL19fX18oXylfX18vIC9cMDMzWzBtCiAgICAgICAgICAgIFwwMzNbMTszM20vXyAsJ1wwMzNbMG0gXDAzM1swOzMybS8gL18vIC8gX18gXCB8IC98IC8gLyBfIFwvIF9fXy8gLyBfXy8gX19fLyAvIF9fICAvIFwwMzNbMG0KICAgICAgICAgICAgXDAzM1sxOzMzbS8nXDAzM1swbSAgIFwwMzNbMDszMm0vIF9fX18vIC9fLyAvIHwvIHwvIC8gIF9fLyAvICAvIC9fLyAvIC8gIC8gLyAvXy8gLyAgXDAzM1swbQogICAgICAgICAgICAgICAgXDAzM1swOzMybS9fLyAgICBcX19fXy98X18vfF9fL1xfX18vXy8gICBcX19fXy9fLyAgL18vXF9fLF8vICAgXDAzM1swbSAg" | base64 --decode)

# ══════════════ FUNCTIONS ═════════

checkNpm () {
  if ! npm --version >/dev/null 2>&1; then
    echo -e "${LABEL_ERROR}${GREEN}Npm${NC} is required! Visit: https://nodejs.org/en/"
    exit 1;
  fi
}

# ══════════════ SCRIPT ═════════

echo -e "${LOGO}\n"

echo -e "🙏 Thank you for contributing!\n"

checkNpm

npm install

npm run docs:dev
