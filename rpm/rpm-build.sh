#!/bin/bash

MARVIN_HOME=../
RPM_HOME=/tmp/rpmbuild

# initialse RPM structure
rpmdev-setuptree

cd $MARVIN_HOME

# gather Marvin version and build number
MARVIN_FULL_VERSION=$(node -e 'console.log(require("./package").version);')
MARVIN_VERSION=$MARVIN_FULL_VERSION
MARVIN_BUILD_NUMBER=$(echo $MARVIN_FULL_VERSION | cut -d'-' -f2)

# prepare for building the RPM
cp -r dist/ $RPM_HOME/SOURCES/marvin-frontend-${MARVIN_VERSION}
cp -rv rpm/nginx/conf.d/* $RPM_HOME/SOURCES/marvin-frontend-${MARVIN_VERSION}
cp -rv rpm/nginx/inc/* $RPM_HOME/SOURCES/marvin-frontend-${MARVIN_VERSION}

cp rpm/marvin-frontend.spec $RPM_HOME/SPECS

cd $RPM_HOME/SOURCES
tar czf admin-web-app-${MARVIN_VERSION}.tar.gz admin-web-app-${MARVIN_VERSION}/

# build the RPM
echo -e 'T3amcI7y@BbB\n' | setsid rpmbuild --sign -ba $RPM_HOME/SPECS/awa.spec \
--define "_gpg_path /vagrant/gpg.books.teamcity.dev" \
--define "_gpgbin /usr/bin/gpg" \
--define "_signature gpg" \
--define "_gpg_name TeamCity (Dirty Development Signing Key) <tm-books-itops@blinkbox.com>" \
--define "version $MARVIN_VERSION" --define "release $MARVIN_BUILD_NUMBER"

# copy the resulting RPM into the admin web app rpm folder for CI to pick up
cp $RPM_HOME/RPMS/noarch/admin-web-app-${MARVIN_VERSION}-${MARVIN_BUILD_NUMBER}.noarch.rpm $MARVIN_HOME/rpm

# Show RPM overview
rpm -qip $MARVIN_HOME/rpm/admin-web-app-${MARVIN_VERSION}-${MARVIN_BUILD_NUMBER}.noarch.rpm
