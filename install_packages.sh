#!/usr/bin/env bash

## Install Packages
which modman > /dev/null

if [[ $? -ne 0 ]]; then
    SRC="https://raw.githubusercontent.com/colinmollenhour/modman/master/modman"
    DEST="/usr/local/bin/modman"
    curl -s -L ${SRC} -o ${DEST}
    chmod +x ${DEST}
    echo "Modman installed in /usr/local/bin/modman"
fi

cd ./magento

# Init modman if needed
if [[ ! -d ./.modman ]]; then
    modman init
    echo "Modman folder was not found, initialized"
fi

# Install Modgit if needed
if [[ ! -f /usr/local/bin/modgit ]]; then
    curl https://raw.githubusercontent.com/jreinke/modgit/master/modgit > modgit
    chmod +x modgit
    mv modgit /usr/local/bin
    echo "Modgit installed in /usr/local/bin/modgit"
fi

if [[ ! -d ./.modgit ]]; then
    modgit init
    echo "Modgit folder was not found, initialized"
fi

modman clone MagentoBetter404 https://github.com/astorm/MagentoBetter404
modgit clone magento-admin-theme https://github.com/jreinke/magento-admin-theme.git
modman clone AoeApi2 https://github.com/AOEpeople/Aoe_Api2
modman clone AoeCartApi https://github.com/AOEpeople/Aoe_CartApi
modman clone InchooSocialConnect https://github.com/Marko-M/Inchoo_SocialConnect
